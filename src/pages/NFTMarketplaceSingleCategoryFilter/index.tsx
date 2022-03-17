import React from 'react';
import nftMarketplaceImage from 'src/assets/images/nft_1.png';
import user3 from 'src/assets/images/user3.png';
import image1 from 'src/assets/images/nft_category_1.png';
import image2 from 'src/assets/images/nft_category_2.png';
import image3 from 'src/assets/images/nft_category_3.png';
import image4 from 'src/assets/images/nft_category_4.png';
import image5 from 'src/assets/images/nft_category_5.png';
import image6 from 'src/assets/images/nft_category_6.png';
import image7 from 'src/assets/images/nft_category_7.png';
import image8 from 'src/assets/images/nft_category_8.png';

import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';
import CategoriesListHeader from '../NFTMarketplaceCategories/components/CategoriesListHeader';

const categories = [
  {
    title: 'Architecture',
    categoryImageSource: image1,
  },
  {
    title: 'Abstract Hilll',
    categoryImageSource: image2,
  },
  {
    title: 'Art',
    categoryImageSource: image3,
  },
  {
    title: 'Photography',
    categoryImageSource: image4,
  },
  {
    title: 'Way Photos',
    categoryImageSource: image5,
  },
  {
    title: '3d Photography',
    categoryImageSource: image6,
  },
  {
    title: 'Abstract',
    categoryImageSource: image7,
  },
  {
    title: 'Signature',
    categoryImageSource: image8,
  },
];

const NFTMarketplaceSingleCategoryFilter: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <MarketplaceHeader />
      <div className="grid grid-cols-6">
        <div className="col-span-5">
          <CategoriesListHeader />
          {/* Content */}
          <div className="grid grid-cols-4 w-full mt-4 gap-y-4">
            {/* {Array(8)
              .fill(null)
              .map((item, index) => (
                <NFTCategoryItem
                  collectionImageSource={categories[index].categoryImageSource}
                  collectionUserImageSource={user3}
                  title={categories[index].title}
                  description="Anmutig Studio was launched as a collection of unique NFTs generated."
                />
              ))} */}
          </div>
          {/* Content */}
        </div>
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplaceSingleCategoryFilter;
