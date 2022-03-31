import user3 from 'src/assets/images/user3.png';
import categoriesImage from 'src/assets/images/Categories.png';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

const inputClass =
  'bg-transparent border-[1px] rounded-full border-blue-500 px-4 py-2 text-sm';
const titleClass = 'text-lg font-medium';
const propertyClass = 'bg-blue-500 py-1 text-sm rounded-md';

const NFTMarketplaceCreateNFT: React.FC = () => {
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
            <div className="flex items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-4/5 h-60 rounded-lg">
              {/* <img /> */}
              <p>Upload here</p>
            </div>

            <p className={`${titleClass} mt-6 mb-2`}>Name*</p>
            <input className={`${inputClass} w-4/5`} placeholder="Item name" />

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
                rows={7}
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
                <input
                  className={`${inputClass} w-full`}
                  placeholder="Select collection"
                />
                <IoIosArrowDropdownCircle
                  size={20}
                  color={'#338eff'}
                  className="absolute top-2 right-6"
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
