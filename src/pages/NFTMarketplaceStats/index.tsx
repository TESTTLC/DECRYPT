import React from 'react';
import nftMarketplaceImage from 'src/assets/images/nft_1.png';
import user3 from 'src/assets/images/user3.png';
import image1 from 'src/assets/images/nft_stats_1.png';
import image2 from 'src/assets/images/nft_stats_2.png';
import image3 from 'src/assets/images/nft_stats_3.png';
import image4 from 'src/assets/images/nft_stats_4.png';
import NFTItem from 'src/pages/NFTMarketplace/components/NFTItem';

import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

import StatsListHeader from './components/StatsListHeader';

const images = [
  {
    image: image1,
    title: 'Golf Membership',
    price: 5000,
    timeLeft: '2 days',
  },
  {
    image: image2,
    title: 'Crypto Walk Of Fame',
    price: 5000,
    timeLeft: '1 day',
  },
  {
    image: image3,
    title: 'Crypto Hero Marce',
    price: 5000,
    timeLeft: '4 days',
  },
  {
    image: image4,
    title: 'Crypto Hero Marce',
    price: 5000,
    timeLeft: '2 days',
  },
];

const NFTMarketplaceStats: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <MarketplaceHeader title={'ASSET-BACKED NFT MARKETPLACE'} />
      <div className="grid grid-cols-10 gap-x-2">
        <div className="col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10">
          <StatsListHeader />
          {/* Content */}
          <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 w-full mt-4 gap-y-4 gap-x-2">
            {Array(4)
              .fill(null)
              .map((item, index) => (
                <NFTItem
                  imageSource={images[index].image}
                  title={images[index].title}
                  price={images[index].price}
                  timeLeft={images[index].timeLeft}
                  //   isSquare={true}
                />
              ))}
          </div>
          {/* Content */}
        </div>
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplaceStats;
