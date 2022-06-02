/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, useCallback, useEffect, useRef, useState } from 'react';
import {
  Path,
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
} from 'react-router-dom';
import { useMarketplaceSDK } from 'src/hooks/useMarketplaceSDK';
import { collectionsApi } from 'src/redux/modules/collections/queries';
import { resolveIpfsUrl } from 'src/utils/functions/utils';
import {
  marketplaceAddress,
  nativeTLCAddress,
  TLLPTokenContractAddress,
  TLNFTTokenContractAddress,
} from 'src/utils/globals';
import { CollectionMetadata, NFT } from 'src/utils/storeTypes';
import { ListingProperties } from 'src/utils/types';
import { ethers } from 'ethers';
import FormField from 'src/components/FormField';
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';
import { TailSpin } from 'react-loader-spinner';
import LoadingSpinner from 'src/components/LoadingSpinner';
import { routes } from 'src/utils/routes';
import likeAnimation from 'src/assets/lottie/like.json';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import {
  useDislikeItemMutation,
  useGetLikesQuery,
  useLikeItemMutation,
} from 'src/redux/modules/likes/queries';
import { FiCopy } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
} from 'react-share';

import {
  AuctionListing,
  DirectListing,
  ListingType,
  MarketplaceContractDeployMetadata,
  NFTCollection,
  NFTMetadataOwner,
} from '../../../thirdweb-dev/sdk';

import ListingSaleDetails from './components/ListingSaleDetails';
import TransactionsHistory from './components/TransactionsHistory';

const inputClass =
  'mt-2 bg-transparent w-full border-[1px] rounded-full border-blue-500 px-4 py-2 text-sm';
const titleClass = 'text-lg font-medium';

const validationSchema = Yup.object().shape({
  duration: Yup.number()
    .min(1, 'Duration must be at least 1 hour')
    .required('Required')
    .typeError('Must be a number'),

  price: Yup.number()
    .min(0.1, 'Price must be at least 0.1 TLNFT')
    .required('Required')
    .typeError('Must be a number'),
});

interface CustomLocation extends Path {
  state: {
    item: NFT | undefined;
  };
  key: Key;
}

type CustomParams = {
  contractAddress: string;
  id: string;
};

const borderStyle = 'border-opacity-20 border-blue-600';
const NFTDetails: React.FC = () => {
  const { contractAddress, id: nftId } = useParams<CustomParams>();
  const { sdk, marketplace, provider, walletAddress } = useMarketplaceSDK();
  const navigate = useNavigate();
  const [nft, setNft] = useState<NFTMetadataOwner>();
  const [ownedBy, setOwnedBy] = useState<string>();
  const [collectionMetadata, setCollectionMetadata] =
    useState<CollectionMetadata>();
  const { data } = useGetLikesQuery(
    {
      contractAddress: contractAddress!,
      contractNftId: Number(nftId),
      type: 'NFT',
    },
    { skip: !nftId || !contractAddress },
  );
  const [likeItem, { isSuccess: isLikeSuccess }] = useLikeItemMutation();
  const [dislikeItem, { isSuccess: isDislikeSuccess }] =
    useDislikeItemMutation();

  const [collection, setCollection] = useState<NFTCollection>();
  const [isActiveListing, setIsActiveListing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const [isNewSaleLoading, setIsNewSaleLoading] = useState(false);
  const [isSelfOwned, setIsSelfOwned] = useState(false);
  const [listing, setListing] = useState<AuctionListing | DirectListing>();
  const [listingLoading, setListingLoading] = useState(false);
  const [isAddingListingInfo, setIsAddingListingInfo] = useState(false);
  const [showNewSaleContainer, setShowNewSaleContainer] = useState(false);
  const newSaleContainerRef = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(0);

  useEffect(() => {
    if (data && data.countLikes) {
      setCountLikes(data.countLikes);
      setIsLiked(data.likedByRequestingUser);
    }
  }, [data]);

  const getNFT = useCallback(async () => {
    if (sdk && contractAddress && nftId && provider) {
      const _collection = sdk.getNFTCollection(contractAddress);
      const _collectionMetadata = await _collection.metadata.get();
      const _nft = await _collection.get(nftId);

      if (_nft.owner.toLowerCase() === walletAddress?.toLowerCase()) {
        setOwnedBy('you');
        setIsSelfOwned(true);
      } else {
        setOwnedBy(_nft.owner.toLocaleLowerCase());
        setIsSelfOwned(false);
      }

      setCollectionMetadata(_collectionMetadata);
      setCollection(_collection);
      setNft(_nft);
    }
  }, [contractAddress, nftId, provider, sdk, walletAddress]);

  const checkNFTListing = useCallback(async () => {
    if (sdk && marketplace && nft && nftId && contractAddress) {
      setListingLoading(true);
      const _listings = await marketplace.getActiveListings();
      const _l = _listings.filter(
        (_listing) =>
          _listing.asset.id.toString() === nftId &&
          _listing.assetContractAddress.toLowerCase() ===
            contractAddress.toLowerCase(),
      );

      if (_l.length > 0) {
        setIsActiveListing(true);
        setListing(_l[0]);
      }

      //   const _listings = await marketplace.getAllListings({
      //     seller: nft.owner,
      //     tokenContract: contractAddress,
      //   });
      //   const filteredListings = _listings.filter(
      //     (_listing) =>
      //       _listing.asset.id.toString() === nftId &&
      //       _listing.assetContractAddress.toLowerCase() ===
      //         contractAddress.toLowerCase(),
      //   );

      //   if (filteredListings.length > 0) {
      //     if (filteredListings[filteredListings.length - 1]) {
      //       const lastListing = filteredListings[filteredListings.length - 1];
      //       if (lastListing.type === ListingType.Direct) {
      //         const isActive = await marketplace.direct.isStillValidListing(
      //           lastListing,
      //         );

      //         setIsActiveListing(isActive);
      //       }

      //       setListing(lastListing);
      //     }
      //   }

      setListingLoading(false);
    }
  }, [contractAddress, marketplace, nft, nftId, sdk]);

  useEffect(() => {
    checkNFTListing();
  }, [checkNFTListing, nft]);

  const getDetails = useCallback(async () => {
    try {
      if (sdk && marketplace && nftId && walletAddress && provider) {
        const marketplaceMetadata = marketplace.metadata;
      }
    } catch (error) {
      console.log('Error 2: ', error);
    }
  }, [marketplace, nftId, provider, sdk, walletAddress]);

  //   const grantAccess = async () => {
  //     try {
  //       if (provider && walletAddress && sdk) {
  //         // const p = ethers.getDefaultProvider('https://mainnet-rpc.tlxscan.com');
  //         const wallet = new ethers.Wallet(
  //           process.env.REACT_APP_MARKETPLACE_DEPLOYER_WALLET_PK || '',
  //           provider,
  //         );
  //         const marketplaceDeployMetadata: MarketplaceContractDeployMetadata = {
  //           name: 'TLChain Marketplace',
  //           trusted_forwarders: ['0x4C86F3C5Dafa55CA760c349263793953BBBc9695'],
  //           platform_fee_recipient: wallet.address,
  //           platform_fee_basis_points: 100,
  //         };
  //       }
  //     } catch (error) {
  //       console.log('Error: ', error);
  //     }
  //   };

  useEffect(() => {
    getNFT();
  }, [getNFT]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  useEffect(() => {
    if (isAddingListingInfo) {
      setShowNewSaleContainer(true);
      newSaleContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [isAddingListingInfo]);

  useEffect(() => {
    if (showNewSaleContainer) {
      newSaleContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [showNewSaleContainer]);

  const listItem = async (values: FormikValues) => {
    try {
      if (
        sdk &&
        marketplace &&
        nftId &&
        contractAddress &&
        walletAddress &&
        provider
      ) {
        setIsNewSaleLoading(true);
        const { price, duration } = values;
        const listingProperties: ListingProperties = {
          assetContractAddress: contractAddress,
          tokenId: nftId,
          startTimeInSeconds: 1,
          listingDurationInSeconds: 3600 * parseFloat(duration), // duration is represented in hours
          quantity: 1,
          currencyContractAddress: TLNFTTokenContractAddress,
          buyoutPricePerToken: price.toString(),
        };

        const result = await marketplace.direct.createListing(
          listingProperties,
        );
        setShowNewSaleContainer(false);
        await checkNFTListing();
        setIsNewSaleLoading(false);
      }
    } catch (error) {
      setIsNewSaleLoading(false);

      console.log('Error: ', error);
    }
  };

  const makeOffer = async () => {
    if (sdk && marketplace && walletAddress && provider && listing) {
      const currency = listing.currencyContractAddress;
      const offer = await marketplace.direct.makeOffer(
        listing.id,
        1,
        currency,
        9,
      );
    }
  };

  const sendBuyoutToDB = async () => {
    console.log('Send buyout');
  };

  const getEvents = async () => {
    if (sdk && marketplace && walletAddress && provider && nft && collection) {
      collection.events.addListener('Transfer', (event) => {
        console.log('Event is: ', event);
      });
    }
  };

  const buyItem = async () => {
    if (sdk && marketplace && walletAddress && provider && listing) {
      setIsBuyLoading(true);
      try {
        const result = await marketplace.buyoutListing(listing.id, 1);
        if (result.receipt.status === 1) {
          sendBuyoutToDB();
          sdk.emitAsync('buyout', {
            seller: nft?.owner,
            buyer: walletAddress,
            nftName: nft?.metadata.name,
            nftId: nft?.metadata.id,
          });
          await checkNFTListing();
        }

        setIsBuyLoading(false);
      } catch (error) {
        setIsBuyLoading(false);
        console.log('Error: ', error);
      }
    }
  };

  const notify = () => toast('Link copied to Clipboard');

  const copyUrlToClipboard = () => {
    console.log('window.location.href: ', window.location.href);
    navigator.clipboard.writeText(window.location.href);
    notify();
  };

  const likeOptions = {
    loop: false,
    autoplay: false,
    animationData: likeAnimation,
    rendererSettings: {
      //   preserveAspectRatio: "xMidYMid slice"
    },
  };

  return (
    // min-w-[80rem]
    <div className="min-h-[70rem] w-full mx-auto rounded-xl mt-10 bg-black bg-opacity-70 self-center p-8">
      {nft && collection && collectionMetadata && (
        <>
          <div className="flex w-full xs:flex-col sm:flex-col md:flex-col space-x-10 xs:space-x-0 sm:space-x-0 md:space-x-0 xs:items-center sm:items-center md:items-center">
            <ToastContainer style={{ marginTop: 40 }} />
            <div className="flex-grow w-full max-w-[24rem]">
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img
                  src={nft.metadata.image}
                  className="self-center w-full h-full object-cover rounded-t-xl"
                />
              </div>
              <div className={`border-[2px] ${borderStyle} rounded-lg my-4`}>
                <div className={`border-b-[2px] ${borderStyle} py-4 px-4`}>
                  <p className="text-xl font-semibold mbpl-2">Description</p>
                  <p>{nft.metadata.description}</p>
                </div>
                <div className="py-4 px-4 space-y-4">
                  <p className="text-xl font-semibold mb-2">Details</p>
                  <div className="flex justify-between">
                    <p>Contract address</p>
                    <a
                      className="text-blue-500 hover:text-blue-700"
                      href={`${process.env.REACT_APP_TLX_SCAN}/address/${contractAddress}/transactions`}
                      target="_blank"
                    >{`${contractAddress?.substring(
                      0,
                      5,
                    )}...${contractAddress?.substring(
                      contractAddress.length - 5,
                      contractAddress.length - 1,
                    )}`}</a>
                  </div>
                  <div className="flex justify-between">
                    <p>Token ID</p>
                    <a
                      className="text-blue-500 hover:text-blue-700"
                      href={resolveIpfsUrl(nft.metadata.uri)}
                      target="_blank"
                    >
                      {nftId}
                    </a>
                  </div>
                </div>
                <div className={`border-t-[2px] ${borderStyle} py-4 px-4`}>
                  <p className="text-xl font-semibold mb-2">
                    About {collectionMetadata.name}
                  </p>
                  <p>{collectionMetadata.description}</p>
                </div>
              </div>
            </div>
            <div className="mx-auto flex-auto xs:max-w-[24rem]">
              <div className="flex items-center justify-between">
                <button
                  onClick={() =>
                    navigate(
                      `${routes.nftMarketplaceViewCollection.url}/${contractAddress}`,
                    )
                  }
                  className="text-start text-blue-500 hover:text-blue-700 text-2xl"
                >
                  {collectionMetadata.name}
                </button>
                {nft.owner.toLowerCase() === walletAddress?.toLowerCase() &&
                  !isActiveListing &&
                  !isLoading && (
                    <button
                      className="w-32 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-semibold"
                      onClick={() => {
                        setIsAddingListingInfo(true);
                        newSaleContainerRef.current?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                      }}
                    >
                      Sell item
                    </button>
                  )}
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="text-5xl mt-4 font-semibold">
                    {nft.metadata.name} #{parseInt(nftId || '0', 10)}
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button className="" onClick={copyUrlToClipboard}>
                      <FiCopy size={30} />
                    </button>
                    <FacebookShareButton
                      url={window.location.href}
                      quote={nft.metadata.name}
                      //   className="Demo__some-network__share-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </div>
                </div>
                <p className="mt-6 text-lg xs:text-sm">Owned by {ownedBy}</p>
                {/* <Lottie options={likeOptions} height={400} width={400} /> */}
                <div className="flex space-x-4 mt-4">
                  <div className="">
                    {isLiked ? (
                      <button>
                        <RiHeartFill
                          size={30}
                          onClick={() => {
                            if (contractAddress && nftId) {
                              dislikeItem({
                                contractAddress,
                                contractNftId: Number(nftId),
                                type: 'NFT',
                              });
                              setIsLiked(false);
                              setCountLikes(countLikes - 1);
                            }
                          }}
                        />
                      </button>
                    ) : (
                      <button>
                        <RiHeartLine
                          size={30}
                          onClick={() => {
                            if (contractAddress && nftId) {
                              likeItem({
                                contractAddress,
                                contractNftId: Number(nftId),
                                type: 'NFT',
                              });
                              setIsLiked(true);
                              setCountLikes(countLikes + 1);
                            }
                          }}
                        />
                      </button>
                    )}
                    {countLikes > 0 && (
                      <p>
                        {countLikes} {countLikes === 1 ? 'like' : 'likes'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="">
                  {listingLoading ? (
                    <div className="w-full mt-20 flex justify-center items-center">
                      <LoadingSpinner height={40} width={40} />
                    </div>
                  ) : (
                    <ListingSaleDetails
                      listing={listing}
                      onBuy={buyItem}
                      isActiveListing={isActiveListing}
                      walletAddress={walletAddress}
                      ownerAddress={nft.owner}
                      isBuyLoading={isBuyLoading}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <TransactionsHistory contractAddress={contractAddress} />
          {showNewSaleContainer && (
            <Formik
              initialValues={{
                duration: null,
                price: null,
              }}
              onSubmit={listItem}
              validationSchema={validationSchema}
            >
              {({ handleSubmit }) => (
                <div ref={newSaleContainerRef} className="flex flex-col mt-20">
                  <p className="text-sm">
                    We currently support Direct Listings. Add a price and
                    duration in hours and your item is ready for sale.
                  </p>
                  <div className="mb-3 w-[22rem] flex flex-col space-y-4">
                    <div>
                      <p>Price (TLNFT)</p>
                      <FormField
                        name="price"
                        className={inputClass}
                        placeholder="Price"
                        isNumber
                      />
                    </div>
                    <div>
                      <p>Duration (in hours)</p>
                      <FormField
                        name="duration"
                        className={inputClass}
                        placeholder="Duration"
                        isNumber
                      />
                    </div>
                    <div>
                      <p>Royalty fee (percentage up to 10%)</p>
                      <FormField
                        name="royalty"
                        className={inputClass}
                        placeholder="Royalty"
                        isNumber
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="w-40 h-8 flex justify-center items-center mt-3 bg-gradient-to-r from-green-500 text-sm to-blue-500 rounded-xl font-semibold"
                      onClick={() => handleSubmit()}
                    >
                      {isNewSaleLoading ? (
                        <TailSpin color="#fff" height={10} width={10} />
                      ) : (
                        <p>Create sale</p>
                      )}
                    </button>
                    <button
                      className="w-40 h-8 mt-3 bg-gradient-to-r from-green-500 text-sm to-blue-500 rounded-xl font-semibold"
                      onClick={() => {
                        setIsAddingListingInfo(false);
                        setShowNewSaleContainer(false);
                      }}
                      disabled={isNewSaleLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Formik>
          )}
        </>
      )}
    </div>
  );
};

export default NFTDetails;
