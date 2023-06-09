import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useState } from 'react';
import { epochToDate } from 'src/utils/functions/utils';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import { useMarketplaceSDK } from 'src/hooks/useMarketplaceSDK';

const borderStyle = 'border-opacity-20 border-blue-600';
const containerPaddings = 'px-6 py-6';
const containerPaddingsX = 'px-6';
const containerPaddingsY = 'py-6';
const containerPaddingsB = 'pb-6';
const containerPaddingsT = 'pt-6';

import {
  ListingType,
  AuctionListing,
  DirectListing,
} from '../../../../thirdweb-dev/sdk';

interface Listing {
  listing?: AuctionListing | DirectListing;
  onBuy: () => void;
  isActiveListing: boolean;
}

const ListingOffersDetails: React.FC<Listing> = ({
  listing,
  onBuy,
  isActiveListing,
}) => {
  const { marketplace } = useMarketplaceSDK();
  const [secondsUntilEnd, setSecondsUntilEnd] = useState(
    listing
      ? BigNumber.from(
          listing?.type === ListingType.Auction
            ? listing?.endTimeInEpochSeconds
            : listing?.secondsUntilEnd,
        )
      : 0,
  );

  const cancelListing = async () => {
    if (listing) {
      marketplace?.direct.cancelListing(listing.id);
    }
  };

  return listing ? (
    <div
      className={`${borderStyle} border-[2px] rounded-lg mt-10 overflow-hidden`}
    >
      <div
        className={`${borderStyle} border-b-[2px] w-full bg-black bg-opacity-30 py-6`}
      >
        <p className={`px-6 text-xl`}>
          Sale ends {epochToDate(parseFloat(secondsUntilEnd.toString()))}
        </p>
      </div>
      <div className="px-6 py-6 ">
        <p className="mb-2 text-lg">Current price</p>
        <div className={`flex items-center space-x-4`}>
          <img
            className="text-white font-poppins w-7 h-7 object-cover "
            src={tlcLogo}
            alt="TLChain-Logo"
          />
          <p className="text-3xl font-semibold">
            {formatEther(listing.buyoutPrice)} TLC
          </p>
        </div>
        <div className="flex mt-2"></div>
      </div>
    </div>
  ) : (
    <div
      className={`${borderStyle} border-[2px] rounded-lg mt-10 overflow-hidden`}
    >
      <div
        className={`${borderStyle} border-b-[2px] w-full bg-black bg-opacity-30 py-6`}
      >
        <p className={`px-6 text-lg`}>
          This item is not for sale at the moment.
        </p>
      </div>
    </div>
  );
};

export default ListingOffersDetails;
