import React, { useCallback, useEffect, useState } from 'react';
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
import { ProfileCategories } from 'src/utils/types';
import { Web3Provider } from '@ethersproject/providers';
import { useNavigate } from 'react-router-dom';
import { routes } from 'src/utils/routes';

import { ThirdwebSDK } from '../../../thirdweb-dev/sdk';
import ThirdWebReact from '../../../thirdweb-dev/react';
import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

import ProfileNFTItem from './components/ProfileNFTItem';
import ProfileHeader from './components/ProfileHeader';

const images = [image1, image2, image3, image4, image5, image6, image7, image8];
const categories = [
  ProfileCategories.COLLECTIONS,
  ProfileCategories.COLLECTED,
  ProfileCategories.CREATE,
  ProfileCategories.ACTIVITY,
  ProfileCategories.OFFERS,
];

const NFTMarketplaceProfile: React.FC = () => {
  const navigate = useNavigate();
  // const { data } = useGetCollectionsByUserIdQuery(userId, {
  //   skip: selectedCategory === ProfileCategories.COLLECTIONS ? false : true,
  // });

  const [collections, setCollections] = useState<Collection[]>([]);
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const userId = useSelector<StoreState, number>((state) => state.account.id);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    ProfileCategories.COLLECTIONS,
  );

  const getCollectedItems = async () => {
    if (provider && walletAddress) {
      const sdk = new ThirdwebSDK(provider.getSigner());
      const marketplaceContract = sdk.getMarketplace('eqeq');
      const nfts = await marketplaceContract.getAllListings();
      nfts.map((nft) => {
        console.log('i am nft owner: ', nft.sellerAddress === walletAddress);
      });
    }
  };

  const getAllCollections = useCallback(async () => {
    if (provider && walletAddress) {
      const sdk = new ThirdwebSDK(provider.getSigner());
      const contracts = await sdk.getContractList(walletAddress);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nftCollections: any = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contracts.map(async (contract: any) => {
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
      // await Promise.all(
      //   nftCollections.map(async (nftCollection: any) => {
      //     const item = await nftCollection.metadata();

      //     localCollections.push({
      //       ...item,
      //       imageUri: item.image,
      //       contractAddress: nftCollection.address,
      //     });
      //   }),
      // );

      setCollections(localCollections);
      // for (const nftCollection of nftCollections) {
      //   console.log(
      //     'nftCollectionContract.metadata: ',
      //     await nftCollection.metadata(),
      //   );
      // }
    }
  }, [provider, walletAddress]);

  useEffect(() => {
    if (
      provider &&
      walletAddress &&
      selectedCategory === ProfileCategories.COLLECTIONS
    ) {
      getAllCollections();
    }
  }, [provider, walletAddress, getAllCollections, selectedCategory]);

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
          <div className="grid grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 w-full gap-y-4 gap-x-4">
            {selectedCategory === ProfileCategories.COLLECTIONS &&
              collections.map((item, index) => (
                <ProfileNFTItem
                  key={`${item.contractAddress}-${index}`}
                  // imageSource={process.env.REACT_APP_BUCKET_URL + item.image}
                  imageSource={item.image}
                  title={item.name}
                  price={10000}
                  timeLeft="2 days left"
                  onClick={() => {
                    // setSelectedCategory(ProfileCategories.COLLECTED);
                    navigate(
                      `${routes.nftMarketplaceViewCollection.url}/${item.contractAddress}`,
                      {
                        state: { item },
                      },
                    );
                  }}
                />
              ))}
          </div>
        </div>
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplaceProfile;
