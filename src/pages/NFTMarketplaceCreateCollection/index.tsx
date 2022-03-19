import user3 from 'src/assets/images/user3.png';
import categoriesImage from 'src/assets/images/Categories.png';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

const inputClass =
  'bg-transparent border-[1px] rounded-full border-blue-500 px-4 py-2 text-sm';
const titleClass = 'text-lg font-medium';
const propertyClass = 'bg-blue-500 py-1 text-sm rounded-md';

const NFTMarketplaceCreateCollection: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <MarketplaceHeader />

      <div className="grid grid-cols-10 gap-x-2 gap-y-4 rounded-xl">
        <div className="grid grid-cols-2 col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10 bg-black bg-opacity-70 p-6 rounded-xl">
          <div className="col-span-1 sm:col-span-2 xs:col-span-2">
            <p className={titleClass}>Create a Collection</p>

            <p className="mt-6">Logo Image*</p>
            <p className="mt-2 mb-2 text-xs text-gray-400 w-4/5">
              This image will be used for navigation. <br /> 350x350 recommended
            </p>
            <div className="relative">
              <img
                src={user3}
                className="bg-gray-500 rounded-full w-24 h-24 mt-4"
              />
              {/* <img className="absolute right-2 bottom-2 bg-gray-700 rounded-full w-4 h-4" /> */}
            </div>

            <p className={`${titleClass} mt-6 mb-2`}>Featured Image</p>

            <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
              This image will be used for featured your collection on the
              homepage, category pages, or other promotional areas of Decryption
            </p>
            <div className="flex items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-4/5 h-60 rounded-lg">
              {/* <img /> */}
              <p>Upload here</p>
            </div>
          </div>

          <div className="flex flex-col col-span-1 sm:col-span-2 xs:col-span-2 space-y-6">
            <div>
              <p className={titleClass}>Banner Image</p>
              <p className="mt-2 text-xs text-gray-400 w-4/5 mb-4">
                This image will appear at the top of your collection page. Avoid
                including to much text in this banner image. 1400x400
                recommended
              </p>
              <div className="flex items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-4/5 h-40 rounded-lg">
                {/* <img /> */}
                <p>Upload here</p>
              </div>
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
                  rows={7}
                />
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

export default NFTMarketplaceCreateCollection;
