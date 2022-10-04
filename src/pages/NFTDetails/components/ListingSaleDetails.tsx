import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useState } from 'react';
import { epochToDate } from 'src/utils/functions/utils';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import { useMarketplaceSDK } from 'src/hooks/useMarketplaceSDK';
import { TailSpin } from 'react-loader-spinner';

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
  walletAddress?: string;
  ownerAddress: string;
  isBuyLoading: boolean;
}

const ListingSaleDetails: React.FC<Listing> = ({
  listing,
  onBuy,
  isActiveListing,
  walletAddress,
  ownerAddress,
  isBuyLoading,
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
      className={`${borderStyle} border-[2px] rounded-lg mt-6 overflow-hidden`}
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
            {formatEther(listing.buyoutPrice)} WTLC
          </p>
        </div>
        <div className="flex mt-2 space-x-4">
          {isActiveListing &&
            walletAddress?.toLowerCase() === ownerAddress.toLowerCase() && (
              <button
                className="w-40 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-semibold"
                onClick={cancelListing}
              >
                Cancel listing
              </button>
            )}
          {isActiveListing &&
            walletAddress?.toLowerCase() !== ownerAddress.toLowerCase() && (
              <button
                className="flex items-center justify-center w-40 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-semibold"
                onClick={onBuy}
              >
                {isBuyLoading ? (
                  <TailSpin color="#fff" height={10} width={10} />
                ) : (
                  'Buy'
                )}
              </button>
            )}
          {/* {walletAddress?.toLowerCase() !== ownerAddress.toLowerCase() && (
            <button
              className="w-40 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-semibold"
              // onClick={onBuy}
            >
              Make offer
            </button>
          )} */}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${borderStyle} border-[2px] rounded-lg mt-4 overflow-hidden`}
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

export default ListingSaleDetails;
