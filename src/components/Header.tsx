import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { ChainsIds } from 'src/utils/types';
import MetamaskIcon from 'src/assets/svg/MetamaskIcon';
import { setIsLoggedIn } from 'src/redux/modules/account/actions';

import { useWalletConnector } from '../hooks/useWalletConnector';
import SMALL_LOGO from '../assets/images/logo.png';
import { routes } from '../utils/routes';

import CustomButton from './CustomButton';

interface ConnectWalletButtonProps {
  connectWallet: () => void;
  disconnectWallet: () => void;
  walletAddress?: string;
  isMobileDevice: boolean;
}
const metamaskAppDeepLink = 'https://metamask.app.link/dapp/decryption.com';
// "https://metamask.app.link/dapp/app-theluxurybank-com-hrcup.ondigitalocean.app";
// const metamaskAppDeepLink = "https://metamask.app.link/dapp/192.168.1.2:3000";

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  isMobileDevice,
  walletAddress,
  connectWallet,
  disconnectWallet,
}) => {
  if (isMobileDevice) {
    if (!window.ethereum) {
      console.log('here');
      return (
        <a
          href={metamaskAppDeepLink}
          target="_blank"
          className="rounded-md"
          rel="noreferrer"
        >
          <button className="rounded-md group-hover:text-gray-100 h-8 relative px-2 py-2 bg-black leading-none flex items-center divide-x divide-gray-600">
            <span className="hover:text-gray-100 font-poppins py-4 text-sm text-indigo-400 transition duration-200 leading-[12px]">
              {walletAddress
                ? `Disconnect ${walletAddress.slice(
                    0,
                    4,
                  )}...${walletAddress.slice(
                    walletAddress.length - 4,
                    walletAddress.length,
                  )}`
                : 'Connect wallet'}{' '}
            </span>
          </button>
        </a>
      );
    } else {
      return (
        <button
          onClick={walletAddress ? disconnectWallet : connectWallet}
          className="rounded-md group-hover:text-gray-100 h-8 relative px-2 py-2 bg-black leading-none flex items-center divide-x divide-gray-600"
        >
          <span className="hover:text-gray-100 font-poppins py-4 text-sm text-indigo-400 transition duration-200 leading-[12px]">
            {walletAddress
              ? `Disconnect ${walletAddress.slice(
                  0,
                  4,
                )}...${walletAddress.slice(
                  walletAddress.length - 4,
                  walletAddress.length,
                )}`
              : 'Connect wallet'}{' '}
          </span>
        </button>
      );
    }
  } else {
    return (
      <button
        onClick={walletAddress ? disconnectWallet : connectWallet}
        className="rounded-md group-hover:text-gray-100 h-8 relative px-2 py-2 bg-black leading-none flex items-center divide-x divide-gray-600"
      >
        <span className="hover:text-gray-100 font-poppins py-4 text-sm text-indigo-400 transition duration-200 leading-[12px]">
          {walletAddress
            ? `Disconnect ${walletAddress.slice(0, 4)}...${walletAddress.slice(
                walletAddress.length - 4,
                walletAddress.length,
              )}`
            : 'Connect wallet'}{' '}
        </span>
      </button>
    );
  }
};

const addNetwork = () => {
  const params = [
    {
      chainId: ChainsIds.TLC,
      chainName: 'TLChain Mainnet',
      nativeCurrency: {
        name: 'The Luxury Coin',
        symbol: 'TLC',
        decimals: 18,
      },
      rpcUrls: ['https://mainnet-rpc.tlxscan.com/'],
      blockExplorerUrls: ['https://tlxscan.com/'],
    },
  ];

  window.ethereum
    ?.request({ method: 'wallet_addEthereumChain', params })
    .then(() => console.log('Success'))
    .catch((error: Error) => console.log('Error', error.message));
};

const Header: React.FC = () => {
  // const { logout } = useAuth0();
  const dispatch = useDispatch();
  const onLogout = () => {
    localStorage.clear();
    dispatch(setIsLoggedIn(false));
  };

  const {
    walletAddress,
    connectWallet,
    disconnectWallet,
    isMobileSize,
    isMobileDevice,
  } = useWalletConnector();
  const isSidebarOpen = useSelector<StoreState, boolean>(
    (state) => state.globals.isSidebarOpen,
  );
  const isLoggedIn = useSelector<StoreState, boolean>(
    (state) => state.account.isLoggedIn,
  );

  return (
    <div
      className="w-full z-30 flex flex-wrap justify-between xs:justify-center sm:justify-center items-center px-10 py-5 xs:px-0 sm:px-0
    bg-transparent "
    >
      <div
        className={`flex transition-all duration-500 ${
          isSidebarOpen ? 'ml-60 xs:ml-0 sm:ml-0' : 'ml-20 xs:ml-0 sm:ml-0'
        } mb-2`}
      >
        <div className="items-start justify-center xs:w-96">
          <div className="relative group">
            <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative px-2xs:px-0 py-2 bg-black leading-none flex items-center divide-x divide-gray-600 rounded-md">
              <span className="xs:ml-10 pl-2 mr-2 xs:pl-2 flex items-right text-center">
                {!isMobileSize ? (
                  <img
                    src={SMALL_LOGO}
                    alt="TLX logo"
                    className="w-4 h-4 mr-2"
                    style={{ width: 20, height: 20 }}
                  />
                ) : null}
                <span className="pr-0 font-poppins text-sm text-gray-100">
                  New Release Coming Soon
                </span>
              </span>
              <a
                href="https://tlchain.network/"
                target="_blank"
                className="text-center xs:ml-4 pl-4 pr-2 mr-2 font-poppins text-sm text-indigo-400 group-hover:text-gray-100 transition duration-200"
                rel="noreferrer"
              >
                See what's new on our website &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex items-center transition-all duration-500 ${
          isSidebarOpen ? 'ml-60 xs:ml-0 sm:ml-0' : 'ml-20 xs:ml-0 sm:ml-0'
        }`}
      >
        <Link
          key={routes.dashboard.title}
          to={{ pathname: routes.dashboard.url }}
          className="flex h-8 mx-2 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center"
        >
          <span className="text-center font-poppins text-sm">Dashboard</span>
        </Link>

        {window.ethereum && (
          <button
            className="flex h-8 mx-2 space-x-2 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center"
            onClick={addNetwork}
          >
            <MetamaskIcon width={20} height={17} />
            <span className="leading-[12px]">Add TLC Network</span>
          </button>
        )}

        <div className="items-center justify-center mx-2">
          <div className="relative">
            <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt "></div>
            <ConnectWalletButton
              walletAddress={walletAddress}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
              isMobileDevice={isMobileDevice}
            />
          </div>
        </div>

        <div className="items-center justify-center mx-2">
          <div className="relative">
            <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt "></div>
            <CustomButton text="Log out" onClick={onLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
