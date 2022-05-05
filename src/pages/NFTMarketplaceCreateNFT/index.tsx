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
import { useCreateNFTMutation } from 'src/redux/modules/nfts/queries';
import { useMarketplaceSDK } from 'src/hooks/useMarketplaceSDK';
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';
import FormField from 'src/components/FormField';

import {
  NFTCollection,
  TokenContractDeployMetadata,
} from '../../../thirdweb-dev/sdk';
import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(30).required('Required').typeError('Required'),
  description: Yup.string()
    .max(250, 'Description must be less than 250 characters')
    .min(3, 'Description must be at least 3 characters')
    .required('Required')
    .typeError('Required'),
  externalLink: Yup.string().url('Invalid external link URL').nullable(),
});

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
    useState<NFTCollection>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [collections, setCollections] = useState<any[]>([]);
  const [image, setImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>();
  const inputImageRef = createRef<HTMLInputElement>();
  const [dropdownElements, setDropdownElements] = useState<string[]>([]);
  // const [externalLink, setExternalLink] = useState<string>();
  const { sdk } = useMarketplaceSDK();

  const [
    createNFT,
    { isLoading: isMutationLoading, isSuccess, isError, isUninitialized },
  ] = useCreateNFTMutation();

  const sendNFTToDB = async (params: {
    name: string;
    description: string;
    imageUri?: string;
  }) => {
    const { name, description, imageUri } = params;
    if (
      name &&
      description &&
      image &&
      collectionAddress &&
      walletAddress &&
      sdk
    ) {
      const collection = await sdk.getNFTCollection(collectionAddress);
      const metadata = await collection.metadata.get();
      const formData = new FormData();

      formData.append('contractAddress', collectionAddress);
      formData.append('creatorAddress', walletAddress);
      formData.append('collectionName', metadata.name);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('imageUri', metadata.image || '');
      // formData.append('externalLink', externalLink || '');

      await createNFT(formData);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mintCollectionNFT = async (nftMetadata: any) => {
    if (selectedCollectionContract && walletAddress) {
      const tx = await selectedCollectionContract.mintTo(
        walletAddress,
        nftMetadata,
      );
      const nft = await tx.data(); // (optional) fetch details of minted NFT
      if (tx.id) {
        await sendNFTToDB({
          name: nftMetadata.name,
          description: nftMetadata.description,
        });
      }
    }
  };

  const mintIndividualNFT = async (
    nftMetadata: TokenContractDeployMetadata,
  ) => {
    const result = await sdk?.deployer.deployToken(nftMetadata);
  };

  const mintNFT = async (values: FormikValues) => {
    try {
      const { name, description, externalLink } = values;
      if (
        name &&
        description &&
        image &&
        walletAddress &&
        selectedCollectionContract
      ) {
        setIsLoading(true);
        const nftMetadata: TokenContractDeployMetadata = {
          name,
          description,
          image,
          primary_sale_recipient: walletAddress,
          ...(externalLink && { external_link: externalLink }),
        };
        if (selectedCollectionContract) {
          mintCollectionNFT(nftMetadata);
        } else {
          await mintIndividualNFT(nftMetadata);
        }

        setIsLoading(false);
      } else {
        if (!walletAddress) {
          alert('Please connect your wallet');
        }
        alert('Please fill in all required fields');
      }
    } catch (error) {
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
        <Formik
          initialValues={{
            name: null,
            description: null,
            externalLink: '',
          }}
          onSubmit={mintNFT}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
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
                <FormField
                  name="name"
                  className={`${inputClass} w-4/5`}
                  placeholder="Title"
                />

                <p className={`${titleClass} mt-6 mb-2`}>External link</p>
                <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
                  Decryption will include a link to this URL on this item’s
                  detail page, so that users can click to lkearn more about it.
                  You are welcome to link to your own webpage with more details.
                </p>

                <FormField
                  className={`${inputClass} w-4/5`}
                  placeholder="Instagram"
                  name="externalLink"
                />
              </div>

              <div className="flex flex-col col-span-1 sm:col-span-2 xs:col-span-2 space-y-6">
                <div>
                  <p className={titleClass}>Description*</p>
                  <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
                    Provide a short description of your item.{' '}
                  </p>
                  <FormField
                    name="description"
                    className={`${inputClass} w-4/5 rounded-xl min`}
                    placeholder="More information about your item..."
                    isTextArea
                    rows={4}
                  />
                </div>

                <div>
                  <p className={titleClass}>Collection</p>
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
                    className="bg-blue-400 flex justify-center w-32 mt-7 rounded-full py-1 text-black text-sm mb-4 text-center items-center"
                    onClick={() => handleSubmit()}
                    type="submit"
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
          )}
        </Formik>
        {/* <MarketplaceRightSidebar showCreditCard/> */}
        <MarketplaceRightSidebar />
      </div>
    </div>
  );
};

export default NFTMarketplaceCreateNFT;
