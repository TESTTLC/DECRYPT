import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import user3 from 'src/assets/images/user3.png';
import categoriesImage from 'src/assets/images/Categories.png';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { Collection, StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { BiImageAdd } from 'react-icons/bi';
import SelectDropdown from 'src/components/SelectDropdown';

import {
  ThirdwebSDK,
  TokenContractDeployMetadata,
} from '../../../thirdweb-dev/sdk';
import { useNFTCollection, useSDK } from '../../../thirdweb-dev/react';
import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

const inputClass =
  'bg-transparent border-[1px] rounded-full border-blue-500 px-4 py-2 text-sm';
const titleClass = 'text-lg font-medium';
const propertyClass = 'bg-blue-500 py-1 text-sm rounded-md';

const NFTMarketplaceCreateNFT: React.FC = () => {
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const [collectionAddress, setCollectionAddress] = useState<string>();
  // const selectedCollectionContract = useNFTCollection(collectionAddress);
  const [selectedCollectionContract, setSelectedCollectionContract] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [collections, setCollections] = useState<any[]>([]);
  const [image, setImage] = useState<File>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>();
  const inputImageRef = createRef<HTMLInputElement>();
  const [dropdownElements, setDropdownElements] = useState<string[]>([]);

  const sdk = useMemo(
    () =>
      provider
        ? new ThirdwebSDK(provider.getSigner(), {
            // readonlySettings: {
            //   chainId: 5177,
            //   rpcUrl: 'https://mainnet-rpc.tlxscan.com/',
            // },
          })
        : undefined,
    [provider],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //@ts-ignore

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mintCollectionNFT = async (nftMetadata: any) => {
    if (selectedCollectionContract && walletAddress) {
      const tx = await selectedCollectionContract.mintTo(
        walletAddress,
        nftMetadata,
      );
      const nft = tx?.data; // (optional) fetch details of minted NFT
    }
  };

  const mintIndividualNFT = async (
    nftMetadata: TokenContractDeployMetadata,
  ) => {
    const result = await sdk?.deployer.deployToken(nftMetadata);
  };

  const mintNFT = async () => {
    if (name && description && image && walletAddress) {
      setIsLoading(true);
      const nftMetadata = {
        name,
        description,
        image,
        primary_sale_recipient: walletAddress,
      };
      if (selectedCollectionContract) {
        await mintCollectionNFT(nftMetadata);
      } else {
        await mintIndividualNFT(nftMetadata);
      }

      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getAllCollections = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const allContracts = await sdk?.getContractList(walletAddress!);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localCollections: any = [];
    allContracts?.map((c) => {
      if (c.contractType === 'nft-collection') {
        localCollections.push(c);
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCollections(localCollections);
    getDropdownElements(localCollections);
  }, [sdk, walletAddress]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDropdownElements = async (localCollections: any[]) => {
    const elements: string[] = [];
    for (const c of localCollections) {
      const metadata = await c.metadata();
      elements.push(metadata.name);
    }
    //   localCollections.map(async (c) => {
    //     const metadata = await c.metadata();
    //     elements.push(metadata.name);
    //   }),
    // await Promise.all(
    //   localCollections.map(async (c) => {
    //     const metadata = await c.metadata();
    //     elements.push(metadata.name);
    //   }),
    // );

    setDropdownElements(elements);
  };

  useEffect(() => {
    if (sdk && walletAddress && provider) {
      getAllCollections();
    }
  }, [getAllCollections, provider, sdk, walletAddress]);

  useEffect(() => {
    if (selectedCollectionContract) {
    }
  }, [selectedCollectionContract]);

  return (
    <div className="flex flex-col w-full">
      <MarketplaceHeader />

      <div className="grid grid-cols-10 gap-x-2 gap-y-4 rounded-xl">
        <div className="grid grid-cols-2 col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10 bg-black bg-opacity-70 p-6 rounded-xl">
          <div className="col-span-1 sm:col-span-2 xs:col-span-2">
            <p className={titleClass}>Create New Item</p>

            <p className="mt-6">Image, Video, Audio or 3D Model*</p>
            <p className="mt-2 mb-2 text-xs text-gray-400 w-4/5">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, OGG,
              GLB, GLTF. Max size 100MB
            </p>
            <button
              className="flex items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-1/2 aspect-h-1 aspect-w-2 rounded-lg"
              onClick={() => inputImageRef.current?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview ? imagePreview : 'undefined'}
                  className={`bg-transparent w-full h-full object-cover ${
                    imagePreview ? '' : 'hidden'
                  }`}
                />
              ) : (
                <div className="flex w-full h-full items-center justify-center">
                  <BiImageAdd size={70} />
                </div>
              )}
              <input
                type="file"
                id="file"
                ref={inputImageRef}
                className="hidden w-full h-full"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              />
            </button>

            <p className={`${titleClass} mt-6 mb-2`}>Name*</p>
            <input
              className={`${inputClass} w-4/5`}
              placeholder="Item name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <p className={`${titleClass} mt-6 mb-2`}>External link</p>
            <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
              Decryption will include a link to this URL on this item’s detail
              page, so that users can click to lkearn more about it. You are
              welcome to link to your own webpage with more details.
            </p>

            <input className={`${inputClass} w-4/5`} placeholder="Instagram" />

            {/* <button className="bg-blue-400 w-32 mt-7 rounded-full py-1 text-black text-sm mb-4">
              Submit
            </button> */}
          </div>

          <div className="flex flex-col col-span-1 sm:col-span-2 xs:col-span-2 space-y-6">
            <div>
              <p className={titleClass}>Description</p>
              <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
                Decryption will include a link to this URL on this item’s detail
                page, so that users can click to lkearn more about it. You are
                welcome to link to your own webpage with more details.
              </p>
              <textarea
                className={`${inputClass} w-4/5 rounded-xl min`}
                placeholder="Provide a detailed description of your item"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <p className={titleClass}>Collection</p>
              <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
                Decryption will include a link to this URL on this item’s detail
                page, so that users can click to lkearn more about it. You are
                welcome to link to your own webpage with more details.
              </p>
              <div className="relative w-4/5">
                <SelectDropdown
                  text="Select Collection"
                  elements={dropdownElements}
                  onSelect={(e) => {
                    setCollectionAddress(
                      collections[e.target.selectedIndex - 1].address,
                    );
                    if (sdk) {
                      setSelectedCollectionContract(
                        sdk.getNFTCollection(
                          collections[e.target.selectedIndex - 1].address,
                        ),
                      );
                    }
                  }}
                />

                {/* <input
                  className={`${inputClass} w-full`}
                  placeholder="Select collection"
                />
                <IoIosArrowDropdownCircle
                  size={20}
                  color={'#338eff'}
                  className="absolute top-2 right-6"
                /> */}
              </div>
              <div>
                <p className={`${titleClass} mt-6`}>Properties</p>
                <div className="w-4/5 flex items-center justify-between mt-2">
                  <button className={`${propertyClass} px-1`}>
                    Ambient Sound
                  </button>
                  <button className={`${propertyClass} px-1`}>
                    Animations
                  </button>
                  <button className={`${propertyClass} px-4`}>+</button>
                </div>
                <div className="w-4/5 flex items-center justify-between mt-4">
                  <button className={`${propertyClass} px-4`}>+</button>
                  <button className={`${propertyClass} px-4`}>+</button>
                  <button className={`${propertyClass} px-4`}>+</button>
                </div>
              </div>

              <button
                className="bg-blue-400 w-32 mt-7 rounded-full py-1 text-black text-sm mb-4"
                onClick={mintNFT}
              >
                {isLoading ? (
                  <TailSpin color="#fff" height={18} width={18} />
                ) : (
                  'Create'
                )}
              </button>
            </div>
          </div>
        </div>
        {/* <MarketplaceRightSidebar showCreditCard/> */}
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplaceCreateNFT;
