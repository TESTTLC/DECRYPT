import React from 'react';
import image1 from 'src/assets/images/nft_image_1.png';
import image2 from 'src/assets/images/nft_image_2.png';
import image3 from 'src/assets/images/nft_image_3.png';
import image4 from 'src/assets/images/nft_image_4.png';
import image5 from 'src/assets/images/nft_image_5.png';
import image6 from 'src/assets/images/nft_image_6.png';
import image7 from 'src/assets/images/nft_image_7.png';
import image8 from 'src/assets/images/nft_image_8.png';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import { marketplaceAddress } from 'src/utils/globals';

import { ThirdwebSDK } from '../../../thirdweb-dev/sdk';

import NFTItem from './components/NFTItem';
import MarketplaceRightSidebar from './components/MarketplaceRightSidebar';
import MarketplaceHeader from './components/MarketplaceHeader';
import MarketplaceHeaderSubHeader from './components/MarketplaceSubHeader';

const images = [image1, image2, image3, image4, image5, image6, image7, image8];
const NFTMarketplace: React.FC = () => {
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  // const getItems = async () => {
  //   if (provider) {
  //     const sdk = new ThirdwebSDK(provider.getSigner());
  //     const marketplaceContract = sdk.getMarketplace(marketplaceAddress);
  //     const listings = await marketplaceContract.getActiveListings();
  //     listings.map((listing) => {
  //       console.log('Listings: ', listing);
  //     });
  //     marketplaceContract.auction.createListing
  //   }
  // };
  return (
    <div className="w-full flex flex-col">
      <MarketplaceHeader />
      <div className="grid grid-cols-10 gap-x-2 gap-y-4">
        <div className="col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10">
          <MarketplaceHeaderSubHeader />
          <div className="grid grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 w-full mt-4 gap-y-4 gap-x-4">
            {Array(8)
              .fill(null)
              .map((item, index) => (
                <NFTItem
                  imageSource={images[index]}
                  title="Crypto Hero Marce"
                  price={66565}
                  timeLeft="2 days left"
                  collectionName="???"
                />
              ))}
          </div>
        </div>
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplace;
