import React, { Key, useCallback, useEffect, useState } from 'react';
import nftMarketplaceImage from 'src/assets/images/nft_1.png';
import user3 from 'src/assets/images/user3.png';
import image1 from 'src/assets/images/nft_image_1.png';
import image2 from 'src/assets/images/nft_image_2.png';
import image3 from 'src/assets/images/nft_image_3.png';
import image4 from 'src/assets/images/nft_image_4.png';
import image5 from 'src/assets/images/nft_image_5.png';
import image6 from 'src/assets/images/nft_image_6.png';
import image7 from 'src/assets/images/nft_image_7.png';
import image8 from 'src/assets/images/nft_image_8.png';
import { useGetCollectionsByUserIdQuery } from 'src/redux/modules/collections/queries';
import { useSelector } from 'react-redux';
import { Collection, StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import { Path, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMarketplaceSDK } from 'src/hooks/useMarketplaceSDK';
import { routes } from 'src/utils/routes';

import { ThirdwebSDK } from '../../../thirdweb-dev/sdk';
import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';
import NFTItem from '../NFTMarketplace/components/NFTItem';

interface Props {
  name: string;
  description: string;
  imageSource: string;
  collectionId?: number;
  collectionName?: string;
  contractAddress: string;
  ownerAddress: string;
}

interface CustomLocation extends Path {
  state: {
    item: Collection | undefined;
  };
  key: Key;
}

const NFTMarketplaceViewCollection: React.FC = () => {
  const { sdk, marketplace } = useMarketplaceSDK();
  const navigate = useNavigate();
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const { contractAddress } = useParams();
  const { state } = useLocation() as CustomLocation;

  const [collection, setCollection] = useState<Collection>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [nfts, setNfts] = useState<any[]>([]);
  const [listingsIds, setListingsIds] = useState<string[]>([]);

  const getCollection = useCallback(async () => {
    if (provider && contractAddress && sdk) {
      try {
        const collectionContract = sdk.getNFTCollection(contractAddress);
        const localNfts = await collectionContract?.getAll();
        setNfts(localNfts || nfts);

        const collectionAddress = collectionContract?.getAddress();

        const localCollection = await collectionContract?.metadata.get();
        setCollection({
          ...localCollection,
          //@ts-ignore
          logoImageUri: localCollection.image,
          contractAddress,
          ownerAddress: '0x00',
          id: 0,
          collectionAddress,
        });
      } catch (error) {
        console.log('Err: ', error);
      }
    }
  }, [provider, contractAddress, sdk, nfts]);

  const getListings = useCallback(async () => {
    console.log('Here');
    const _listings = await marketplace?.getAllListings({
      tokenContract: contractAddress,
    });
    const _listingsIds: string[] = [];
    _listings?.forEach((_listing) => {
      _listingsIds.push(_listing.id);
    });
    console.log('listingsIds: ', _listingsIds);
    // setListingsIds(_listingsIds);
  }, [contractAddress, marketplace]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  useEffect(() => {
    getListings();
  }, [getListings]);

  return (
    <div className="w-full flex flex-col">
      <MarketplaceHeader title={collection?.name} />
      <div className="grid grid-cols-10 gap-x-2 gap-y-4">
        <div className="col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10">
          {/* <ProfileHeader
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          /> */}
          <div className="flex">
            {collection && nfts.length > 0 ? (
              // <img
              //   src={collection.logoImageUri}
              //   className="w-80 h-80 object-cover rounded-xl"
              // />

              <div className="grid grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 w-full mt-4 gap-y-4 gap-x-4">
                {nfts.map((item, index) => (
                  <NFTItem
                    key={`${item.metadata.id}-${index}`}
                    imageSource={item.metadata.image}
                    title={item.metadata.name}
                    // price={66565}

                    collectionName={collection.name}
                    timeLeft="2 days left"
                    description={item.metadata.description}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    contractAddress={contractAddress ?? ''}
                    id={item.metadata.id.toString()}
                    onClick={() => {
                      navigate(
                        `${
                          routes.nftDetails.url
                        }/${contractAddress}/nft/${item.metadata.id.toString()}`,
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <div>No items found</div>
            )}
          </div>
          {/* <div className="grid grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 w-full gap-y-4 gap-x-4"></div> */}
        </div>
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplaceViewCollection;
