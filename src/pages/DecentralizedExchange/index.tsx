import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import { USDTContractAddress } from 'src/utils/globals';
import USDTToken from 'src/contracts/USDT.json';
import { getBalance } from 'src/utils/functions/Contracts';
import tetherImage from 'src/assets/images/tether.png';
import tlchainImage from 'src/assets/images/tlc-bridge.png';
import { StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import { useSelector } from 'react-redux';
import { useWalletConnector } from 'src/hooks/useWalletConnector';

import { changeChain } from '../../utils/functions/MetaMask';
import { ChainsIds, Project } from '../../utils/types';

import SwapSections from './components/SwapSections';
import LiquiditySections from './components/LiquiditySections';
import Farms from './components/Farms';

export const localModalTokens: Project[] = [
  {
    name: 'Tether',
    tag: 'USDT',
    image: '',
  },
  {
    name: 'The Luxury Token',
    tag: 'TLX',
    image: '',
  },
];

const DecentralizedExchange: React.FC = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const { connectWallet } = useWalletConnector();

  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const [currentChainId, setCurrentChainId] = useState(
    window.ethereum?.networkVersion
      ? ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
      : undefined,
  );
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [chainErrorMessage, setChainErrorMessage] = useState<
    string | undefined
  >(undefined);

  const chainChange = async () => {
    await changeChain(ChainsIds.BSC);
  };

  const getUsdtBalance = useCallback(async () => {
    if (walletAddress && provider && currentChainId) {
      const contract = new ethers.Contract(
        USDTContractAddress,
        USDTToken.abi,
        provider,
      );

      const balance = await getBalance(contract, walletAddress);
      setUsdtBalance(balance);
    }
    if (window.ethereum?.networkVersion) {
      setCurrentChainId(
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
      );
    }
  }, [currentChainId, provider, walletAddress]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    chainChange();
    getUsdtBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUsdtBalance();
    if (currentChainId === ChainsIds.BSC) {
      setChainErrorMessage(undefined);
    } else {
      setChainErrorMessage('Please connect to Binance Smart Chain');
    }
  }, [currentChainId, getUsdtBalance]);

  useEffect(() => {
    if (currentChainId === ChainsIds.BSC) {
      getUsdtBalance();
    } else {
      chainChange();
      getUsdtBalance();
    }
  }, [walletAddress, provider, currentChainId, getUsdtBalance]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
        window.location.reload();
      });
      setCurrentChainId(
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum]);

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="font-poppins font-bold text-gray-300 text-3xl mb-4">
              Trade Coin In An Instant
            </p>

            <div className="flex">
              <p className="text-green-400 font-poppins font-semibold text-lg mb-4">
                {usdtBalance} USDT
              </p>
              <p className="text-white font-poppins font-semibold text-lg mb-4">
                &nbsp;available on BSC
              </p>
            </div>
          </div>
        </div>
        {chainErrorMessage && (
          <p className="mb-2 font-poppins text-red-400">{chainErrorMessage}</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 md:space-y-8 sm:space-y-8 xs:space-y-8 gap-x-8 mb-8">
        <div className="">
          <SwapSections currentChainId={currentChainId ?? ''} />
        </div>
        <div className="">
          <LiquiditySections />
        </div>
      </div>
      <p className="text-xs items-center justify-between w-[37rem] xs:w-[22rem] text-center">
        You will have an opportunity to purchase $TLC on Feb 22 at 22 PM UTC
        with a price of $0.16/TLC - 6.25 $TLC/1 USDT. The swap module will
        remain open until 23 Feb at 10.30 UTC.
      </p>
      <div className="relative flex items-center justify-between w-[36rem] xs:w-[22rem] min-h-20 px-8 xs:px-2 sm:px-4 py-8 rounded-lg bg-black bg-opacity-60 font-poppins text-white text-center my-4">
        <div className="flex flex-col items-center justify-center text-sm">
          <span>Total Value Locked on Farms</span>
          <span>1.434.241</span>
        </div>
        <div className="w-[1px] bg-gray-400 h-16 mx-3"></div>
        <div className="flex flex-col items-center justify-center text-sm">
          <span>1 TLC = $0.0625</span>
          <span>Market Cap: $1.240.062</span>
          <span>Est. Weekly Rewards: $25.254</span>
        </div>
      </div>

      <div className="relative flex flex-col space-y-8 w-[70rem] xs:w-[22rem] md:w-[40rem] px-8 xs:px-2 sm:px-4 py-8 rounded-lg bg-black bg-opacity-60 font-poppins text-white text-sm">
        <Farms />
      </div>
    </div>
  );
};

export default DecentralizedExchange;
