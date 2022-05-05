import React from 'react';
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
import { useLocation, useParams } from 'react-router-dom';

import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';
import CategoriesListHeader from '../NFTMarketplaceCategories/components/CategoriesListHeader';
import NFTItem from '../NFTMarketplace/components/NFTItem';

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const NFTMarketplaceCategory: React.FC = () => {
  const { state } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { categoryTitle } = state as any;

  return (
    <div className="w-full flex flex-col">
      <MarketplaceHeader />
      <p className="font-medium text-lg">{categoryTitle}</p>
      <div className="grid grid-cols-10 gap-x-2 gap-y-4">
        <div className="col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10">
          <div className="grid grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 w-full mt-2 gap-y-4 gap-x-4">
            {Array(8)
              .fill(null)
              .map((item, index) => (
                <NFTItem
                  imageSource={images[index]}
                  title="Crypto Hero Marce"
                  price={66565}
                  timeLeft="2 days left"
                  collectionName="Crypto Walk Of Fame"
                  id={index.toString()}
                  contractAddress={''}
                />
              ))}
          </div>
        </div>
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplaceCategory;
