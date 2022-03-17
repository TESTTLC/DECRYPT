import user3 from 'src/assets/images/user3.png';
import categoriesImage from 'src/assets/images/Categories.png';

import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

const inputClass =
  'bg-transparent border-[1px] rounded-full border-blue-500 px-4 py-2 w-4/5 text-sm';
const titleClass = 'text-lg font-medium';

const NFTMarketplaceEditProfile: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <MarketplaceHeader />

      <div className="grid grid-cols-10 gap-x-2 gap-y-4 rounded-xl">
        <div className="grid grid-cols-2 col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10 bg-black bg-opacity-70 p-6 rounded-xl">
          <div className="col-span-1 sm:col-span-2 xs:col-span-2">
            <p className={titleClass}>Profile Settings</p>

            <p className="mt-6 mb-2">Username*</p>
            <input className={inputClass} placeholder="johndoe" />

            <p className="mt-6 mb-2">Email*</p>
            <input className={inputClass} placeholder="johndoe@example.com" />

            <p className="mt-6 mb-2">Bio</p>
            <textarea
              className={`${inputClass} rounded-xl min`}
              placeholder="Description"
              rows={10}
            />

            <p className="mt-6 mb-2">Links</p>
            <div className="flex flex-col space-y-4">
              <input className={inputClass} placeholder="Dribble" />
              <input className={inputClass} placeholder="Behance" />
              <input className={inputClass} placeholder="Instagram" />
            </div>

            <button className="bg-blue-400 w-32 mt-7 rounded-full py-1 text-black text-sm mb-4">
              Submit
            </button>
          </div>

          <div className="flex flex-col col-span-1 sm:col-span-2 xs:col-span-2 space-y-10">
            <div>
              <p className={titleClass}>Profile Image</p>
              <div className="relative">
                <img
                  src={user3}
                  className="bg-gray-500 rounded-full w-24 h-24 mt-4"
                />
                {/* <img className="absolute right-2 bottom-2 bg-gray-700 rounded-full w-4 h-4" /> */}
              </div>
            </div>

            <div>
              <p className={titleClass}>Cover Image</p>
              <div className="relative">
                <img
                  src={categoriesImage}
                  className="w-full h-44 rounded-xl object-cover mt-4"
                />
                <button className="absolute right-4 top-2 bg-blue-500 px-4 py-[0.3rem] text-sm text-black rounded-full">
                  Upload
                </button>
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

export default NFTMarketplaceEditProfile;
