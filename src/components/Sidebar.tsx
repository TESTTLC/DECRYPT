import React, { useEffect, useMemo } from 'react';
import { HiTicket, HiX } from 'react-icons/hi';
import { MdSettings } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { closeSidebar } from 'src/redux/modules/globals/actions';
import { useDeviceInfo } from 'src/hooks/useDeviceInfo';
import useCurrentChain from 'src/hooks/useCurrentChain';

import SMALL_LOGO from '../assets/images/logo.png';
import Main_Logo from '../assets/images/Main-Logo.png';
import ticketsIcon from '../assets/images/Tickets.png';
import communityIcon from '../assets/images/Community.png';
import { links, oldLinks } from '../utils/routes';

<script
  src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
  defer
></script>;

const Sidebar: React.FC = () => {
  const { isMobileDevice } = useDeviceInfo();
  const dispatch = useDispatch();
  const { chainId } = useCurrentChain();
  const isSidebarOpen = useSelector<StoreState, boolean>(
    (state) => state.globals.isSidebarOpen,
  );
  const location = useLocation();
  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    if (innerWidth < 600) {
      dispatch(closeSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const oldStakingLink = useMemo(() => {
    return oldLinks.find((link) => link.url === '/oldStaking');
  }, []);

  return (
    <div
      className={`transition-all  duration-500  fixed top-0 ${
        isSidebarOpen ? 'left-0' : '-left-60'
      } z-index-20 fixed z-50 h-screen`}
    >
      <div
        className="flex h-screen overflow-y-auto flex-col w-60
       px-2 py-8 border-r border-opacity-20 border-blue-600 min-h-screen relative bg-transparent sm:bg-customBlue-800 xs:bg-customBlue-800"
      >
        <button
          onClick={() => dispatch(closeSidebar())}
          className="absolute top-1 right-1 text-white w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
        >
          <HiX className="w-5 h-5" />
        </button>
        <div className="flex">
          <img
            src={Main_Logo}
            alt="avatar"
            className="w-1/3 ml-4 mx-2 self-center mt-4 object-center object-cover"
          />
          {/* <h2 className="text-sm mt-20 font-semibold text-white">
            Decryption{' '}
            <span className="text-green-400 ml-1 drop-shadow-2xl shadow-white">
              DeFi HUB
            </span>
          </h2> */}
        </div>
        {chainId && (
          <p className="text-gray-200 px-2 font-semibold mt-2">
            Current Chain: <span className="text-green-500">{chainId}</span>
          </p>
        )}
        <div className="flex flex-col mt-3 justify-between flex-1">
          <nav className="text">
            <p className="text-gray-200 text-xs px-2">TLChain Mainnet - 2321</p>
            {links.map((link, index) => {
              const { id, url, text, icon, imageSource } = link;
              return url.startsWith('https') ? (
                <a
                  key={`${id}/${url}`}
                  href={url}
                  target={'_blank'}
                  rel="noreferrer"
                  className={`h-10
                capitalize flex items-center px-2 py-1 ${
                  location.pathname === link.url
                    ? ''
                    : 'hover:bg-gray-600 hover:text-gray-200'
                }  ${
                    index === 0 ? 'mt-2' : 'mt-4'
                  } transition-colors duration-200 transform
                 rounded-md font-oswald text-white`}
                >
                  {imageSource ? (
                    <img src={imageSource} className="w-8 h-8" />
                  ) : (
                    icon
                  )}
                  <span
                    className={`mx-4 font-medium ${
                      location.pathname === link.url ? 'text-green-500' : ''
                    }`}
                  >
                    {text.toUpperCase()}
                  </span>
                </a>
              ) : (
                <Link
                  onClick={
                    isMobileDevice ? () => dispatch(closeSidebar()) : undefined
                  }
                  key={`${id}/${url}`}
                  to={{ pathname: url }}
                  className={`h-8
                  capitalize flex items-center px-2 py-1 ${
                    location.pathname === link.url
                      ? ''
                      : 'hover:bg-gray-600 hover:text-gray-200'
                  } ${
                    index === 0 ? 'mt-2' : 'mt-4'
                  } transition-colors duration-200 transform
                   rounded-md font-oswald text-white`}
                >
                  {imageSource ? (
                    <img src={imageSource} className="w-8 h-8" />
                  ) : (
                    icon
                  )}
                  <span
                    className={`mx-4 font-medium ${
                      location.pathname === link.url ? 'text-green-500' : ''
                    }`}
                  >
                    {text.toUpperCase()}
                  </span>
                </Link>
              );
            })}
            <p className="text-gray-200 text-xs px-2 mt-8">
              TLChain OLD - 5177
            </p>
            {oldLinks.map((link, index) => {
              const { id, url, text, icon, imageSource } = link;
              return (
                <Link
                  onClick={
                    isMobileDevice ? () => dispatch(closeSidebar()) : undefined
                  }
                  key={`${id}/${url}`}
                  to={{ pathname: url }}
                  className={`h-8
                  capitalize flex items-center px-2 py-1 ${
                    location.pathname === link.url
                      ? ''
                      : 'hover:bg-gray-600 hover:text-gray-200'
                  } ${
                    index === 0 ? 'mt-2' : 'mt-4'
                  } transition-colors duration-200 transform
                   rounded-md font-oswald text-white`}
                >
                  {imageSource ? (
                    <img src={imageSource} className="w-8 h-8" />
                  ) : (
                    icon
                  )}
                  <span
                    className={`mx-4 font-medium ${
                      location.pathname === link.url ? 'text-green-500' : ''
                    }`}
                  >
                    {text.toUpperCase()}
                  </span>
                </Link>
              );
            })}
            <hr className="my-6" />
            <a
              href="https://discord.gg/tlchain"
              target={'_blank'}
              className="flex items-center px-4  mt-5 rounded-md text-white hover:text-gray-700 hover:bg-gray-200 transition-colors transform"
            >
              <img src={ticketsIcon} className="w-8 h-8" />

              <p className="mx-4 font-medium font-oswald uppercase">Tickets</p>
            </a>
            <a
              href="https://community.decryption.com"
              target={'_blank'}
              className="flex items-center px-4  mt-5 rounded-md text-white hover:text-gray-700 hover:bg-gray-200 transition-colors transform"
            >
              <img src={communityIcon} className="w-8 h-8" />

              <span className="mx-4 font-medium font-oswald uppercase">
                Community
              </span>
            </a>
          </nav>
          <div className="flex items-center mt-5">
            <img
              src={Main_Logo}
              alt="avatar"
              className="h-6 w-6 mx-2 object-center object-cover rounded-full"
            />
            <h4 className="font-medium text-sm font-poppins text-gray-300 hover:underline cursor-pointer">
              <a href="https://decryption.com">Decryption</a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
