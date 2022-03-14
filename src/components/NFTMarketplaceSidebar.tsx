import React from 'react';
import { HiX } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { closeSidebar } from 'src/redux/modules/globals/actions';
import { useDeviceInfo } from 'src/hooks/useDeviceInfo';
import DecryptionLogo from 'src/assets/svg/DecryptionLogo';
import nftMarketplaceImage from 'src/assets/images/nft_1.webp';

import SMALL_LOGO from '../assets/images/logo.png';
import ticketsIcon from '../assets/images/Tickets.png';
import communityIcon from '../assets/images/Community.png';
import { links } from '../utils/routes';

<script
  src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
  defer
></script>;

const NFTMarketplaceSidebar: React.FC = () => {
  const { isMobileDevice } = useDeviceInfo();
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector<StoreState, boolean>(
    (state) => state.globals.isSidebarOpen,
  );
  const location = useLocation();

  return (
    <div
      className={`transition-all  duration-500  fixed top-0 ${
        isSidebarOpen ? 'left-0' : '-left-60'
      } z-index-20 fixed z-50 h-screen`}
    >
      <div
        className="flex space-y-6 h-screen overflow-y-auto flex-col w-60
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
        <div className="flex w-full space-x-4 justify-center items-center bg-black bg-opacity-70 p-4 rounded-lg">
          <button className="w-6 h-6 bg-blue-400 rounded-lg">+</button>
          <p>Create NFT</p>
        </div>
        {/* End First Sidebar Element */}

        {/* Second Sidebar Element */}
        <div className="flex flex-col w-full bg-black bg-opacity-70 p-4 rounded-lg">
          <p className="uppercase text-blue-500 text-sm">Market Place</p>
          <div className="flex">
            <p>icon</p>
            <p>Marketplace</p>
          </div>
          <div className="flex">
            <p>icon</p>
            <p>Stats</p>
          </div>
          <div className="flex">
            <p>icon</p>
            <p>Resource</p>
          </div>
        </div>
        {/* End Second Sidebar Element */}

        {/* Third Sidebar Element */}
        <div className="flex flex-col w-full bg-black bg-opacity-70 p-4 rounded-lg">
          <p className="uppercase text-blue-500 text-sm">Filter</p>
          <div className="text-gray-400">
            <div className="flex">
              <p>icon</p>
              <p>Status</p>
            </div>
            <div className="flex">
              <p>icon</p>
              <p>Price</p>
            </div>
            <div className="flex">
              <p>icon</p>
              <p>Collections</p>
            </div>
            <div className="flex">
              <p>icon</p>
              <p>Chains</p>
            </div>
            <div className="flex">
              <p>icon</p>
              <p>Categories</p>
            </div>
            <div className="flex">
              <p>icon</p>
              <p>On sale in</p>
            </div>
          </div>
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
