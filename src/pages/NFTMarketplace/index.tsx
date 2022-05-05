import React, { useCallback, useEffect, useState } from 'react';
import { useMarketplaceSDK } from 'src/hooks/useMarketplaceSDK';
import { epochToDate } from 'src/utils/functions/utils';
import { formatEther } from 'ethers/lib/utils';
import { MarketplaceFilter } from '@thirdweb-dev/sdk/dist/types/marketplace/MarketPlaceFilter';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { routes } from 'src/utils/routes';

import {
  AuctionListing,
  DirectListing,
  ListingType,
} from '../../../thirdweb-dev/sdk';

import NFTItem from './components/NFTItem';
import MarketplaceRightSidebar from './components/MarketplaceRightSidebar';
import MarketplaceHeader from './components/MarketplaceHeader';
import MarketplaceHeaderSubHeader from './components/MarketplaceSubHeader';

// const images = [image1, image2, image3, image4, image5, image6, image7, image8];
const NFTMarketplace: React.FC = () => {
  const { sdk, marketplace } = useMarketplaceSDK();
  const navigate = useNavigate();
  const [listings, setListings] = useState<(DirectListing | AuctionListing)[]>(
    [],
  );
  const [collectionsNames, setCollectionsNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getActiveListings = useCallback(async () => {
    if (listings.length === 0) {
      try {
        const filter: MarketplaceFilter = {
          start: 0,
          count: 20,
        };
        setIsLoading(true);
        const _listings = await marketplace?.getActiveListings();
        if (_listings) {
          const _collectionsNames: string[] = [];

          for (const _listing of _listings) {
            const _collection = sdk?.getNFTCollection(
              _listing.assetContractAddress,
            );
            const collectionMetadata = await _collection?.metadata.get();
            _collectionsNames.push(collectionMetadata?.name || '');
          }

          setCollectionsNames(_collectionsNames);
          setListings(_listings);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Can't get listings", error);
        setIsLoading(false);
      }
    }
  }, [listings.length, marketplace, sdk]);

  useEffect(() => {
    getActiveListings();
  }, [getActiveListings]);

  return (
    <div className="w-full flex flex-col">
      <MarketplaceHeader />
      <div className="grid grid-cols-10 gap-x-2 gap-y-4">
        <div className="col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10">
          <MarketplaceHeaderSubHeader />
          {isLoading ? (
            <div className="w-full flex justify-center items-center text-center mt-20">
              <TailSpin color="#fff" height={40} width={40} />
            </div>
          ) : (
            <div className="grid grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 w-full mt-4 gap-y-4 gap-x-4">
              {listings.length === 0 && !isLoading && marketplace && (
                <p>No active listings found</p>
              )}
              {listings?.map((item, index) => (
                <NFTItem
                  key={`${item.asset.id}-${index}`}
                  imageSource={item.asset.image || ''}
                  title={item.asset.name}
                  price={parseFloat(formatEther(item.buyoutPrice.toString()))}
                  timeLeft={
                    item.type === ListingType.Direct
                      ? epochToDate(
                          item.secondsUntilEnd.toString(),
                          'localeString',
                        )
                      : epochToDate(
                          item.endTimeInEpochSeconds.toString(),
                          'localeString',
                        )
                  }
                  collectionName={collectionsNames[index]}
                  id={item.asset.id.toString()}
                  contractAddress={item.assetContractAddress}
                  onClick={() => {
                    navigate(
                      `${routes.nftDetails.url}/${
                        item.assetContractAddress
                      }/nft/${item.asset.id.toString()}`,
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplace;
