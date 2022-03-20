import React from 'react';
import { HiX } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { closeSidebar } from 'src/redux/modules/globals/actions';
import { useDeviceInfo } from 'src/hooks/useDeviceInfo';
import DecryptionLogo from 'src/assets/svg/DecryptionLogo';
import nftMarketplaceImage from 'src/assets/images/nft_1.png';
import MenuIcon from 'src/assets/svg/MenuIcon';
import VerticalLineChartIcon from 'src/assets/svg/VerticalLineChart';
import PaperIcon from 'src/assets/svg/Paper';
import UsersIcon from 'src/assets/svg/Users';
import DotsCirleIcon from 'src/assets/svg/DotsCirle';
import BagIcon from 'src/assets/svg/Bag';
import DiscountIcon from 'src/assets/svg/Discount';
import { routes } from 'src/utils/routes';

<script
  src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
  defer
></script>;

const NFTMarketplaceSidebar: React.FC = () => {
  const { isMobileDevice } = useDeviceInfo();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector<StoreState, boolean>(
    (state) => state.globals.isSidebarOpen,
  );
  const location = useLocation();
  console.log('Location: ', location);

  return (
    <div
      className={`transition-all  duration-500  fixed top-0 ${
        isSidebarOpen ? 'left-0' : '-left-60'
      } z-index-20 fixed z-50 h-screen`}
    >
      <div
        className="flex space-y-4 h-screen overflow-y-auto flex-col w-60
       px-2 py-8 border-r border-opacity-20 border-blue-600 min-h-screen relative bg-transparent sm:bg-customBlue-800 xs:bg-customBlue-800"
      >
        <button
          onClick={() => dispatch(closeSidebar())}
          className="absolute top-1 right-1 text-white w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
        >
          <HiX className="w-5 h-5" />
        </button>
        <div className="self-center">
          <DecryptionLogo className="justify-self-auto self-center" />
        </div>

        {/* First Sidebar Element */}
        <div>
          <button
            className="flex w-full space-x-4 items-center bg-black bg-opacity-70 px-4 py-2 rounded-lg mb-1"
            onClick={() => navigate(routes.nftMarketplaceCreateNFT.url)}
          >
            <div className="w-6 h-6 bg-blue-400 rounded-lg">+</div>
            <p>Create NFT</p>
          </button>
          <button
            className="flex w-full space-x-4 items-center bg-black bg-opacity-70 px-4 py-2 rounded-lg"
            onClick={() => navigate(routes.nftMarketplaceCreateCollection.url)}
          >
            <div className="w-6 h-6 bg-blue-400 rounded-lg">+</div>
            <p>Create Collection</p>
          </button>
        </div>
        {/* End First Sidebar Element */}

        {/* Second Sidebar Element */}
        <div className="flex flex-col w-full bg-black bg-opacity-70 p-4 rounded-lg space-y-2 text-gray-400">
          <p className="uppercase text-blue-500 text-sm ml-2">Market Place</p>
          <button
            className={`flex items-center space-x-2 hover:bg-gray-700 rounded-md px-2 py-[0.1rem] ${
              location.pathname === routes.nftMarketplace.url
                ? 'text-green-500'
                : 'underline'
            }`}
            onClick={() => navigate('/nftmarketplace')}
          >
            <MenuIcon />
            <p>Marketplace</p>
          </button>
          <button
            className={`flex items-center space-x-2 hover:bg-gray-700 rounded-md px-2 py-[0.1rem] ${
              location.pathname === routes.nftMarketplaceStats.url
                ? 'text-green-500'
                : 'underline'
            }`}
            onClick={() => navigate('/nftmarketplace/stats')}
          >
            <VerticalLineChartIcon />
            <p>Stats</p>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-700 rounded-md px-2 py-[0.1rem]">
            <PaperIcon />
            <p>Resource</p>
          </button>
        </div>
        {/* End Second Sidebar Element */}

        {/* Third Sidebar Element */}
        <div className="flex flex-col w-full bg-black bg-opacity-70 p-4 rounded-lg space-y-2 text-gray-400">
          <p className="uppercase text-blue-500 text-sm ml-2">Filter</p>
          <button className="flex items-center space-x-2 hover:bg-gray-700 rounded-md px-2 py-[0.1rem]">
            <MenuIcon />
            <p>Status</p>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-700 rounded-md px-2 py-[0.1rem]">
            <VerticalLineChartIcon />
            <p>Price</p>
          </button>
          <button
            className="flex items-center space-x-2 hover:bg-gray-700 rounded-md px-2 py-[0.1rem]"
            // onClick={() => navigate('/nftmarketplace/collections')}
          >
            <UsersIcon />
            <p>Collections</p>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-700 rounded-md px-2 py-[0.1rem]">
            <DotsCirleIcon />
            <p>Chains</p>
          </button>
          <button
            className={`flex items-center space-x-2 hover:bg-gray-700 rounded-md px-2 py-[0.1rem] ${
              location.pathname === routes.nftMarketplaceCategories.url
                ? 'text-green-500'
                : 'underline'
            }`}
            onClick={() => navigate('/nftmarketplace/categories')}
          >
            <BagIcon />
            <p>Categories</p>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-700 rounded-md px-2 py-[0.1rem]">
            <DiscountIcon />
            <p>On sale in</p>
          </button>
        </div>
        {/* End Third Sidebar Element */}

        <div className="w-full h-80 bg-gray-800 rounded-xl ">
          <img
            src={nftMarketplaceImage}
            className="w-full h-60 object-cover rounded-xl"
          />
          <div className="p-4 flex flex-col space-y-4">
            <p className="text-xs text-gray-500">Crypto Hero Marce</p>
            <div className="flex justify-between items-center text-sm">
              <p className="text-blue-500">Crypto Hero Marce</p>
              <p className="text-gray-500">x</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplaceSidebar;
