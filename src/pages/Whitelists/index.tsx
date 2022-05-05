import React, { useCallback, useEffect, useState } from 'react';
import { useMarketplaceSDK } from 'src/hooks/useMarketplaceSDK';
import { createMerkleTree, epochToDate } from 'src/utils/functions/utils';
import { formatEther, keccak256 } from 'ethers/lib/utils';
import { MarketplaceFilter } from '@thirdweb-dev/sdk/dist/types/marketplace/MarketPlaceFilter';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { routes } from 'src/utils/routes';
import MerkleTree from 'merkletreejs';
import { NFTDropAddress, TLNFTTokenContractAddress } from 'src/utils/globals';
import { ethers } from 'ethers';
import Papa from 'papaparse';
import LoadingSpinner from 'src/components/LoadingSpinner';

import {
  NFTDrop,
  NFTMetadataOwner,
  TransactionResultWithId,
} from '../../../thirdweb-dev/sdk';
import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

// const images = [image1, image2, image3, image4, image5, image6, image7, image8];
const WhiteLists: React.FC = () => {
  const { sdk, walletAddress } = useMarketplaceSDK();
  const [nft, setNft] = useState<NFTMetadataOwner>();
  const [nftDrop, setNFTDrop] = useState<NFTDrop>();
  const [claim, setClaim] =
    useState<TransactionResultWithId<NFTMetadataOwner>[]>();
  const [owned, setOwned] = useState<NFTMetadataOwner[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isFetchingDone, setIsFetchingDone] = useState(false);
  const [mintingError, setMintingError] = useState('');

  const getNft = useCallback(async () => {
    try {
      setIsLoading(true);
      const _drop = sdk?.getNFTDrop(NFTDropAddress);

      if (_drop) {
        setNFTDrop(_drop);
        const _nft = await _drop.get(0);
        if (_nft) {
          setNft(_nft);
        }
      }

      const _owned = await _drop?.getOwned(walletAddress);

      if (_owned?.length) {
        setOwned(_owned);
      }

      setIsLoading(false);
      setIsFetchingDone(true);
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(false);
      setIsFetchingDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, walletAddress]);

  const mint = async () => {
    try {
      setIsMinting(true);
      const _claim = await nftDrop?.claim(1);
      setClaim(_claim);
      setIsMinting(false);
    } catch (error: unknown) {
      const err: Error = error as Error;
      if (err.message && err.message.includes('No claim found')) {
        setMintingError("It looks like you're not on whitelist");
      }
      console.log('error: ', error);
      setIsMinting(false);
    }
  };

  useEffect(() => {
    getNft();
  }, [getNft]);

  return (
    <div className="w-full flex flex-col">
      <MarketplaceHeader title="Free Community Rewards for all the TLX holders" />
      <div className="grid grid-cols-10 gap-x-2 gap-y-4">
        <div className="col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10">
          <div></div>
          <div className="w-full flex flex-col px-10 justify-center items-center space-y-5">
            {isLoading ? (
              <LoadingSpinner width={40} height={40} />
            ) : (
              <>
                {nft && (
                  <img
                    src={nft?.metadata.image || ''}
                    className="w-full h-full object-cover"
                  />
                )}
                {owned?.length === 0 && isFetchingDone && (
                  <>
                    <p>
                      Please proceed to mint your{' '}
                      <span className="text-green-500">#Restart</span> -
                      Blockhain & Metaverse Innovation Summit ticket.
                    </p>

                    <button
                      className="self-center flex justify-center items-center w-40 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-semibold"
                      onClick={mint}
                    >
                      {isMinting ? (
                        <LoadingSpinner width={8} height={8} />
                      ) : (
                        <p>Mint now</p>
                      )}
                    </button>
                  </>
                )}
                {owned?.length > 0 && isFetchingDone && (
                  <div className="text-center">
                    <p>Your owned token:</p>
                    Contract address:{' '}
                    <span className="text-green-500">{NFTDropAddress}</span>
                    <p>
                      Token ID:{' '}
                      <span className="text-green-500">
                        {owned[0].metadata.id.toString()}
                      </span>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default WhiteLists;
