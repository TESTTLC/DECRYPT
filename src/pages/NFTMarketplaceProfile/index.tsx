import React, { useCallback, useEffect, useState } from 'react';
import image1 from 'src/assets/images/nft_image_1.png';
import image2 from 'src/assets/images/nft_image_2.png';
import image3 from 'src/assets/images/nft_image_3.png';
import image4 from 'src/assets/images/nft_image_4.png';
import image5 from 'src/assets/images/nft_image_5.png';
import image6 from 'src/assets/images/nft_image_6.png';
import image7 from 'src/assets/images/nft_image_7.png';
import image8 from 'src/assets/images/nft_image_8.png';
import { useSelector } from 'react-redux';
import { Collection, StoreState } from 'src/utils/storeTypes';
import { ChainsIds, ProfileCategories, SaleResult } from 'src/utils/types';
import { Web3Provider } from '@ethersproject/providers';
import { useNavigate } from 'react-router-dom';
import { routes } from 'src/utils/routes';
import { changeChain } from 'src/utils/functions/MetaMask';
import { ethers } from 'ethers';
import { useMarketplaceSDK } from 'src/hooks/useMarketplaceSDK';
import { TailSpin } from 'react-loader-spinner';
import { getSalesActivity } from 'src/api/events';
import { ellipsizeAddress } from 'src/utils/functions/utils';

import { NFTMetadataOwner } from '../../../thirdweb-dev/sdk';
import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

import ProfileNFTItem from './components/ProfileNFTItem';
import ProfileHeader from './components/ProfileHeader';
import ProfileNFTCollection from './components/ProfileNFTCollection';

interface OwnedTokenResponse {
  type: string;
  contractAddress: string;
  name: string;
}
interface CustomNFT extends NFTMetadataOwner {
  contractAddress: string;
  collectionName: string;
}

const categories = [
  ProfileCategories.COLLECTIONS,
  ProfileCategories.COLLECTED,
  //   ProfileCategories.CREATE,
  ProfileCategories.ACTIVITY,
  ProfileCategories.LIKED,
  //   ProfileCategories.OFFERS,
];

const NFTMarketplaceProfile: React.FC = () => {
  const navigate = useNavigate();
  const { sdk, marketplace } = useMarketplaceSDK();
  // const { data } = useGetCollectionsByUserIdQuery(userId, {
  //   skip: selectedCategory === ProfileCategories.COLLECTIONS ? false : true,
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [collectedItems, setCollectedItems] = useState<CustomNFT[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const [currentChainId, setCurrentChainId] = useState(
    //@ts-ignore
    window.ethereum?.networkVersion
      ? //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum?.networkVersion, 10))
      : undefined,
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    ProfileCategories.COLLECTIONS,
  );
  const [recentSales, setRecentSales] = useState<SaleResult[]>([]);
  const [recentBuys, setRecentBuys] = useState<SaleResult[]>([]);

  const getCollectedItems = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('getCollectedItems');
      const nfts: CustomNFT[] = [];
      const ownedTokensURL = `${process.env.REACT_APP_TLX_RPC_API}?module=account&action=tokenlist&address=${walletAddress}`;
      const response = await fetch(ownedTokensURL);
      const parsedResponse = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { result }: { result: never[] } = parsedResponse;
      const ownedTokens: OwnedTokenResponse[] = result.filter(
        (token: OwnedTokenResponse) => token.type === 'ERC-721',
      );

      for (const token of ownedTokens) {
        const collection = sdk?.getNFTCollection(token.contractAddress);
        if (collection) {
          const ownedNftsFromCollection = await collection.getOwned();
          ownedNftsFromCollection.forEach((nft) => {
            nfts.push({
              ...nft,
              contractAddress: token.contractAddress,
              collectionName: token.name,
            });
          });
        }
      }

      setCollectedItems(nfts);
      setIsLoading(false);
    } catch (error) {
      console.log('Error: ', error);
      setIsLoading(false);
    }
  }, [sdk, walletAddress]);

  const getAllCollections = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('getAllCollections');
      if (walletAddress && sdk) {
        const contracts = await sdk.getContractList(walletAddress ?? '');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nftCollections: any = [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await contracts?.map(async (contract: any) => {
          if (contract.contractType === 'nft-collection') {
            const nftCollectionContract = contract;
            nftCollections.push(nftCollectionContract);
          }
        });
        const localCollections: Collection[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const c of nftCollections) {
          const item = await c.metadata();

          localCollections.push({
            ...item,
            imageUri: item.image,
            contractAddress: c.address,
          });
        }

        setCollections(localCollections);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error: ', error);
      setIsLoading(false);
    }
  }, [sdk, walletAddress]);

  const chainChange = async () => {
    await changeChain(ChainsIds.TLC);
  };

  const getActivity = useCallback(async () => {
    if (walletAddress) {
      const result = await getSalesActivity(walletAddress);
      setRecentSales(result.recentSales);
      setRecentBuys(result.recentBuys);

      console.log('result', result);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (
      selectedCategory === ProfileCategories.COLLECTIONS
      //  &&
      // currentChainId === ChainsIds.TLC
    ) {
      getAllCollections();
    }
    if (selectedCategory === ProfileCategories.ACTIVITY) {
      getActivity();
    }
  }, [getActivity, getAllCollections, selectedCategory]);

  useEffect(() => {
    if (currentChainId !== ChainsIds.TLC) {
      chainChange();
    }
    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChainId, window.ethereum?.networkVersion]);

  useEffect(() => {
    if (selectedCategory === ProfileCategories.COLLECTED) {
      getCollectedItems();
    }
  }, [currentChainId, getCollectedItems, selectedCategory]);

  //@ts-ignore
  window.ethereum?.on('chainChanged', () => {
    window.location.reload();
  });

  return (
    <div className="w-full flex flex-col">
      <MarketplaceHeader />
      <div className="grid grid-cols-10 gap-x-2 gap-y-4">
        <div className="col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10">
          <ProfileHeader
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
          {isLoading && selectedCategory !== ProfileCategories.ACTIVITY && (
            <div className="w-full flex justify-center items-center text-center mt-20">
              <TailSpin color="#fff" height={40} width={40} />
            </div>
          )}
          <div className="grid grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 w-full gap-y-4 gap-x-4">
            {!walletAddress && (
              <p className="self-center col-span-full text-center mt-8 text-lg">
                Connect wallet to have access to your profile{' '}
                <b>{selectedCategory}</b> section
              </p>
            )}
            {/* @ts-ignore */}
            {window.ethereum?.networkVersion !== '5177' && (
              <p className="self-center col-span-full text-center mt-8 text-lg">
                Please switch your wallet to TLChain Mainnet to have access to
                your profile <b>{selectedCategory}</b> section
              </p>
            )}

            {!isLoading && (
              <>
                {selectedCategory === ProfileCategories.COLLECTIONS &&
                  collections.map((item, index) => (
                    <ProfileNFTCollection
                      key={`${item.contractAddress}-${index}`}
                      id={item.id?.toString() ?? ''}
                      imageSource={item.image || ''}
                      name={item.name}
                      description={item.description || ''}
                      onClick={() => {
                        navigate(
                          `${routes.nftMarketplaceViewCollection.url}/${item.contractAddress}`,
                          {
                            state: { item },
                          },
                        );
                      }}
                    />
                  ))}

                {selectedCategory === ProfileCategories.COLLECTED &&
                  collectedItems.map((item, index) => (
                    <ProfileNFTItem
                      key={`${item.metadata.id}-${index}`}
                      id={item.metadata.id.toString()}
                      imageSource={item.metadata.image || ''}
                      collectionName={item.collectionName}
                      title={item.metadata.name}
                      timeLeft="2 days left"
                      contractAddress={item.contractAddress}
                      onClick={() => {
                        navigate(
                          `${routes.nftDetails.url}/${
                            item.contractAddress
                          }/nft/${item.metadata.id.toString()}`,
                        );
                      }}
                    />
                  ))}
              </>
            )}
          </div>
          {selectedCategory === ProfileCategories.ACTIVITY && (
            <div className="flex w-full justify-around">
              <div className="">
                <p className="text-xl font-semibold text-center mb-2">
                  Recent Sales
                </p>
                {recentSales.map((sale, index) => (
                  <div className="flex text-center space-x-2">
                    <p>Tx Hash: </p>
                    <a
                      className="text-blue-500 hover:text-blue-700"
                      href={`${process.env.REACT_APP_TLX_SCAN}/tx/${sale.txHash}`}
                      target="_blank"
                    >
                      {ellipsizeAddress(sale.txHash, 20)}
                    </a>
                  </div>
                ))}
                {recentSales.length === 0 && (
                  <p className="text-center text-gray-400">No recent sales</p>
                )}
              </div>
              <div>
                <p className="text-xl font-semibold text-center mb-2">
                  Recent Buys
                </p>
                {recentBuys.map((buy, index) => (
                  <div className="flex text-center space-x-2">
                    <p>Tx Hash: </p>
                    <a
                      className="text-blue-500 hover:text-blue-700"
                      href={`${process.env.REACT_APP_TLX_SCAN}/tx/${buy.txHash}`}
                      target="_blank"
                    >
                      {ellipsizeAddress(buy.txHash, 20)}
                    </a>
                  </div>
                ))}
                {recentBuys.length === 0 && (
                  <p className="text-center text-gray-400">No recent buys</p>
                )}
              </div>
            </div>
          )}

          {selectedCategory === ProfileCategories.LIKED && (
            <div className="flex w-full justify-around">
              <div className="">
                <p className="text-xl font-semibold text-center mb-2">
                  Recent Sales
                </p>
                {recentSales.map((sale, index) => (
                  <div className="flex text-center space-x-2">
                    <p>Tx Hash: </p>
                    <a
                      className="text-blue-500 hover:text-blue-700"
                      href={`${process.env.REACT_APP_TLX_SCAN}/tx/${sale.txHash}`}
                      target="_blank"
                    >
                      {ellipsizeAddress(sale.txHash, 20)}
                    </a>
                  </div>
                ))}
                {recentSales.length === 0 && (
                  <p className="text-center text-gray-400">No recent sales</p>
                )}
              </div>
              <div>
                <p className="text-xl font-semibold text-center mb-2">
                  Recent Buys
                </p>
                {recentBuys.map((buy, index) => (
                  <div className="flex text-center space-x-2">
                    <p>Tx Hash: </p>
                    <a
                      className="text-blue-500 hover:text-blue-700"
                      href={`${process.env.REACT_APP_TLX_SCAN}/tx/${buy.txHash}`}
                      target="_blank"
                    >
                      {ellipsizeAddress(buy.txHash, 20)}
                    </a>
                  </div>
                ))}
                {recentBuys.length === 0 && (
                  <p className="text-center text-gray-400">No recent buys</p>
                )}
              </div>
            </div>
          )}
        </div>
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplaceProfile;
