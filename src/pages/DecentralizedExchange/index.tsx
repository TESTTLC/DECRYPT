import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { prices, USDTContractAddress } from 'src/utils/globals';
import USDTToken from 'src/contracts/USDT.json';
import { getBalance } from 'src/utils/functions/Contracts';
import { StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changeChain } from '../../utils/functions/MetaMask';
import { ChainsIds, Project } from '../../utils/types';

import SwapSections from './components/SwapSections';
import LiquiditySections from './components/LiquiditySections';
import Farms from './components/Farms';
import ChartSection from './components/ChartSection';
import DexInfo from './components/DexInfo';
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
  const navigate = useNavigate();

  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const [currentChainId, setCurrentChainId] = useState(
    //@ts-ignore
    window.ethereum?.networkVersion
      ? //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
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
    //@ts-ignore
    if (window.ethereum?.networkVersion) {
      setCurrentChainId(
        //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
      );
    }
  }, [currentChainId, provider, walletAddress]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    // chainChange();
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
      //   chainChange();
      getUsdtBalance();
    }
  }, [walletAddress, provider, currentChainId, getUsdtBalance]);

  useEffect(() => {
    if (window.ethereum) {
      //@ts-ignore
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
        window.location.reload();
      });
      setCurrentChainId(
        //@ts-ignore
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
            <p className="font-bold text-white text-3xl mb-4">
              Trade Coin In An Instant
            </p>
            <p className="text-xs mb-2 items-center justify-between w-[37rem] xs:w-[22rem] text-center">
              Discover the potential of your assets, in Decryption DEX Profit
              gained every second that can be withdrawn at any time
            </p>
            {currentChainId === ChainsIds.BSC && (
              <div className="flex">
                <p className="text-green-400 font-semibold text-lg mb-4">
                  {usdtBalance} USDT
                </p>
                <p className="text-white font-semibold text-lg mb-4">
                  &nbsp;available on BSC
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 md:space-y-8 sm:space-y-8 xs:space-y-8 gap-x-8 mb-8">
        <div className="">
          <SwapSections currentChainId={currentChainId ?? ''} />
        </div>
        <div className="">
          <LiquiditySections />
        </div>
      </div>

      <button
        className="flex w-30 h-8 mt-2 mb-4 text-sm items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
        onClick={() => navigate('/dexdisclaimer')}
      >
        See Exchange Disclaimer
      </button>

      <DexInfo />

      <div
        id="chartContainer"
        className="self-center flex items-center justify-center my-6 rounded-md xs:w-[22rem] md:w-[39rem] lg:w-[50rem] w-[70rem]"
      >
        <ChartSection />
      </div>

      <div className="relative flex flex-col space-y-8 w-[70rem] xs:w-[22rem] md:w-[40rem] px-8 xs:px-2 sm:px-4 py-8 rounded-lg bg-black bg-opacity-60 text-white text-sm">
        <Farms currentChainId={currentChainId ?? ''} />
      </div>
    </div>
  );
};

export default DecentralizedExchange;
