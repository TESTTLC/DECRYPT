import { createRef, useCallback, useRef, useState } from 'react';
import user3 from 'src/assets/images/user3.png';
import categoriesImage from 'src/assets/images/Categories.png';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useAuth0 } from '@auth0/auth0-react';
import { useCreateCollectionMutation } from 'src/redux/modules/collections/queries';
import axios from 'axios';
import EditButton from 'src/assets/svg/EditButton';
import { TailSpin } from 'react-loader-spinner';
import { ethers } from 'ethers';
import { StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import { useSelector } from 'react-redux';
import factoryAbi from 'src/contracts/Factory.json';
import { BiImageAdd } from 'react-icons/bi';

import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';
import { NFTCollection, ThirdwebSDK } from '../../../thirdweb-dev/sdk';

const inputClass =
  'bg-transparent border-[1px] rounded-full border-blue-500 px-4 py-2 text-sm';
const titleClass = 'text-lg font-medium';
const propertyClass = 'bg-blue-500 py-1 text-sm rounded-md';

const NFTMarketplaceCreateCollection: React.FC = () => {
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [bannerImage, setBannerImage] = useState<File>();
  const [bannerImagePreview, setBannerImagePreview] = useState<string>();
  const [featuredImage, setFeaturedImage] = useState<File>();
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>();
  const [logoImage, setLogoImage] = useState<File>();
  const [logoImagePreview, setLogoImagePreview] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [createCollection, { isLoading, isSuccess, isError, isUninitialized }] =
  //   useCreateCollectionMutation();
  const inputLogoImageRef = createRef<HTMLInputElement>();
  const inputBannerImageRef = createRef<HTMLInputElement>();
  const inputFeaturedImageRef = createRef<HTMLInputElement>();

  // const onCreateCollection = useCallback(() => {
  //   if (name && description && bannerImage && featuredImage && logoImage) {
  //     const formData = new FormData();
  //     formData.append('name', name);
  //     formData.append('description', description);
  //     formData.append('logoImage', logoImage);
  //     formData.append('bannerImage', bannerImage);
  //     formData.append('featuredImage', featuredImage);
  //     const obj = { ...formData };
  //     createCollection(formData);
  //   }
  // }, [
  //   bannerImage,
  //   createCollection,
  //   description,
  //   featuredImage,
  //   logoImage,
  //   name,
  // ]);

  const onCreateCollection = async () => {
    console.log('Provider: ', provider);
    console.log('Provider: ', walletAddress);
    console.log('Provider: ', description);
    console.log('Provider: ', logoImage);
    if (provider && walletAddress && name && description && logoImage) {
      const sdk = new ThirdwebSDK(provider.getSigner());
      setIsLoading(true);
      await sdk.deployer.deployNFTCollection({
        name,
        description,
        image: logoImage,
        primary_sale_recipient: walletAddress,
      });
      setIsLoading(false);
    }
  };

  const getCollection = async (contractAddress: string) => {
    if (provider && walletAddress) {
      const sdk = new ThirdwebSDK(provider.getSigner());
      const collection = sdk.getNFTCollection(contractAddress);
    }
  };

  const call = async () => {
    if (name && description && bannerImage) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('bannerImage', bannerImage);
      const result = await axios.post(
        'http://localhost:4000/collections',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      );
    }
  };
  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerImage(e.target.files[0]);
      setBannerImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFeaturedImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
      setFeaturedImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoImage(e.target.files[0]);
      setLogoImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col w-full">
      <MarketplaceHeader />

      <div className="grid grid-cols-10 gap-x-2 gap-y-4 rounded-xl">
        <div className="grid grid-cols-2 col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10 bg-black bg-opacity-70 p-6 rounded-xl">
          <div className="col-span-1 sm:col-span-2 xs:col-span-2">
            <p className={titleClass}>Create a Collection</p>

            <div className="mt-6 mb-2">
              <p className={titleClass}>Title</p>

              <input
                className={`${inputClass} w-4/5 rounded-xl min`}
                placeholder="Provide a detailed description of your item"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <p className="mt-6">Logo Image*</p>
            <p className="mt-2 mb-2 text-xs text-gray-400 w-4/5">
              This image will be used for navigation. <br /> 350x350 recommended
            </p>
            <button
              className="flex items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-1/2 aspect-h-1 aspect-w-2 rounded-lg"
              onClick={() => inputLogoImageRef.current?.click()}
            >
              {logoImagePreview ? (
                <img
                  src={logoImagePreview ? logoImagePreview : 'undefined'}
                  className={`bg-transparent w-full h-full object-cover ${
                    logoImagePreview ? '' : 'hidden'
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
                ref={inputLogoImageRef}
                className="hidden w-full h-full"
                accept=".png, .jpg, .jpeg"
                onChange={handleLogoImageChange}
              />
            </button>

            {/* <div className="relative w-24 h-24">
              <img
                src={logoImagePreview ? logoImagePreview : user3}
                className="bg-gray-500 w-full h-full rounded-full object-cover"
              />
              <button
                className="absolute right-1 bottom-1"
                onClick={() => {
                  inputLogoImageRef.current?.click();
                  // handleLogoImageChange(inputLogoImageRef.current?.targe);
                }}
              >
                <EditButton />
                <input
                  type="file"
                  id="file"
                  ref={inputLogoImageRef}
                  className="hidden"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleLogoImageChange}
                />
              </button>

              <img className="absolute right-2 bottom-2 bg-gray-700 rounded-full w-4 h-4" />
            </div>  */}

            {/* <p className={`${titleClass} mt-6 mb-2`}>Featured Image</p>

            <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
              This image will be used for featured your collection on the
              homepage, category pages, or other promotional areas of Decryption
            </p>
            <div className="flex relative items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-4/5 h-60 rounded-lg">
              <input
                className="absolute top-10"
                type="file"
                name="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFeaturedImageChange}
              >
              </input>
              <img
                className="w-full h-full  object-cover"
                src={featuredImagePreview}
              />
            </div> */}
          </div>

          <div className="flex flex-col col-span-1 sm:col-span-2 xs:col-span-2 space-y-6">
            <div>
              <p className={titleClass}>Banner Image</p>
              <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
                This image will appear at the top of your collection page. Avoid
                including to much text in this banner image. 1400x400
                recommended
              </p>

              <button
                className="flex items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-4/5 aspect-h-1 aspect-w-3 rounded-lg"
                onClick={() => inputBannerImageRef.current?.click()}
              >
                {bannerImagePreview ? (
                  <img
                    src={bannerImagePreview ? bannerImagePreview : 'undefined'}
                    className={`bg-transparent w-full h-full object-cover ${
                      bannerImagePreview ? '' : 'hidden'
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
                  ref={inputBannerImageRef}
                  className="hidden w-full h-full"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleBannerImageChange}
                />
              </button>

              {/* <div className="flex relative items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-4/5 h-40 rounded-lg">
                
                <input
                  className="absolute top-10"
                  type="file"
                  name="file"
                  // name="bannerImage"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleBannerImageChange}
                ></input>
                <img
                  className="w-full h-full  object-cover"
                  src={bannerImagePreview}
                />
              </div> */}
            </div>

            <div>
              <div>
                <p className={titleClass}>Description</p>
                <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
                  This is the collection where your item will appear
                </p>
                <textarea
                  className={`${inputClass} w-4/5 rounded-xl min`}
                  placeholder="Provide a detailed description of your item"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-400 w-32 mt-7 rounded-full py-1 text-black text-sm mb-4"
                onClick={onCreateCollection}
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

export default NFTMarketplaceCreateCollection;
