import { Contract, ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
  prices,
  USDTContractAddress,
  MasterchefContractAddress,
  usdt_tlc_pool_eth,
  usdc_tlc_pool_eth,
  usdt_eth,
  usdc_eth,
  wtlc_eth,
  TempUsdt,
  TempUsdc,
  WTLCTokenContractAddress,
  TLChain_USDT_ChildTokenContractAddress,
  TLChain_USDC_ChildTokenContractAddress,
} from 'src/utils/globals';
import USDTToken from 'src/contracts/USDT.json';
import { getBalance } from 'src/utils/functions/Contracts';
import { StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ERC20 from 'src/contracts/ERC20.json';
import { formatEther, parseEther, formatUnits } from 'ethers/lib/utils';
import useRefresh from 'src/redux/useRefresh';

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
  const { fastRefresh, slowRefresh } = useRefresh();
  // apr logic
  const [usdtTlcApr, setUsdtTlcApr] = useState('-');
  const [usdcTlcApr, setUsdcTlcApr] = useState('-');
  useEffect(() => {
    async function getApr() {
      /**
       * APY calculation
       * block count per year: 3600s * 24h * 365d / 3s = 10512000
       * tlc per block: 90000000000000000  => 0.09 tlc
       * allocation point: 200, 200
       **/
      try {
        // const url ='https://mainnet.infura.io/v3/7f7f3d56bbbb45389554ccbaf12df8e3';
        const url = 'https://mainnet-rpc.tlchain.live/';
        const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
        // const usdt_cont = new Contract(usdt_eth, ERC20.abi, customHttpProvider);
        // const usdc_cont = new Contract(usdc_eth, ERC20.abi, customHttpProvider);
        // const tlc_cont = new Contract(wtlc_eth, ERC20.abi, customHttpProvider);
        const usdt_cont = new Contract(
          TLChain_USDT_ChildTokenContractAddress,
          ERC20.abi,
          customHttpProvider,
        );
        const usdc_cont = new Contract(
          TLChain_USDC_ChildTokenContractAddress,
          ERC20.abi,
          customHttpProvider,
        );
        const tlc_cont = new Contract(
          WTLCTokenContractAddress,
          ERC20.abi,
          customHttpProvider,
        );
        ///////////////// current USDT-TLC lp locked amount in farming pools start//////////////////////////////////////
        // usdt-tlc lp locked price
        const tlc_usdt_cont = new Contract(
          // usdt_tlc_pool_eth,
          TempUsdt,
          ERC20.abi,
          customHttpProvider,
        );
        const tlc_usdt_total_supply = await tlc_usdt_cont.totalSupply();
        // console.log(
        //   'tlc_usdt_total_supply',
        //   formatEther(tlc_usdt_total_supply.toString()),
        // );
        const locked_tlc_usdt = await tlc_usdt_cont.balanceOf(
          MasterchefContractAddress,
        );
        // console.log('locked_tlc_usdt', formatEther(locked_tlc_usdt.toString()));
        // usdt-tlc lp usdt
        const usdt_amount = await usdt_cont.balanceOf(TempUsdt);
        const usdt_amount_fl = parseFloat(
          // formatUnits(
          //   usdt_amount.toLocaleString('fullwide', {
          //     useGrouping: false,
          //   }),
          //   6,
          // ),
          formatEther(
            usdt_amount.toLocaleString('fullwide', {
              useGrouping: false,
            }),
          ),
        );
        // console.log('usdt tlc lp usdt amount', usdt_amount_fl);
        // locked usdt-tlc lp price
        const locked_usdt_tlc_lp_price =
          (2 * usdt_amount_fl * locked_tlc_usdt) / tlc_usdt_total_supply;
        console.log('usdt tlc price', locked_usdt_tlc_lp_price);
        // CURRENT TLC PRICE
        const tlc_amount = await tlc_cont.balanceOf(TempUsdt);
        const tlc_amount_fl = parseFloat(
          formatEther(
            tlc_amount.toLocaleString('fullwide', {
              useGrouping: false,
            }),
          ),
        );
        // console.log('tlc amount at tlc-usdt lp', tlc_amount_fl);
        const current_tlc_price = usdt_amount_fl / tlc_amount_fl;
        console.log('current tlc price', current_tlc_price);
        // usdt-tlc pool apr =>  tlc_reward * block_per_year / total_alloc * pool_alloc * tlc_Price / pool_price * 100%
        let usdt_tlc_apr = 500;
        if (locked_usdt_tlc_lp_price < 10) {
          usdt_tlc_apr =
            ((((0.09 * 10512000) / 400) * 200 * current_tlc_price) / 10) * 100;
        } else {
          usdt_tlc_apr =
            ((((0.09 * 10512000) / 400) * 200 * current_tlc_price) /
              locked_usdt_tlc_lp_price) *
            100;
        }
        // console.log('usdt tlc apr', usdt_tlc_apr);
        ///////////////// current USDT-TLC lp locked amount in farming pools end//////////////////////////////////////

        ///////////////// current USDC-TLC lp locked amount in farming pools start//////////////////////////////////////
        // usdc-tlc lp locked price
        const tlc_usdc_cont = new Contract(
          TempUsdc,
          ERC20.abi,
          customHttpProvider,
        );
        const tlc_usdc_total_supply = await tlc_usdc_cont.totalSupply();
        const locked_tlc_usdc = await tlc_usdc_cont.balanceOf(
          MasterchefContractAddress,
        );
        // usdc-tlc lp usdc
        const usdc_amount = await usdc_cont.balanceOf(TempUsdc);
        const usdc_amount_fl = parseFloat(
          // formatUnits(
          //   usdc_amount.toLocaleString('fullwide', {
          //     useGrouping: false,
          //   }),
          //   6,
          // ),
          formatEther(
            usdc_amount.toLocaleString('fullwide', {
              useGrouping: false,
            }),
          ),
        );
        // locked usdc-tlc lp price
        const locked_usdc_tlc_lp_price =
          (2 * usdc_amount_fl * locked_tlc_usdc) / tlc_usdc_total_supply;

        // usdc-tlc pool apr =>  tlc_reward * block_per_year / total_alloc * pool_alloc * tlc_Price / pool_price * 100%
        let usdc_tlc_apr = 500;
        if (locked_usdc_tlc_lp_price < 10) {
          usdc_tlc_apr =
            ((((0.09 * 10512000) / 400) * 200 * current_tlc_price) / 10) * 100;
        } else {
          usdc_tlc_apr =
            ((((0.09 * 10512000) / 400) * 200 * current_tlc_price) /
              locked_usdc_tlc_lp_price) *
            100;
        }
        setUsdcTlcApr(usdc_tlc_apr.toFixed(2).toString() + '%');
        setUsdtTlcApr(usdt_tlc_apr.toFixed(2).toString() + '%');
        ///////////////// current USDC-TLC lp locked amount in farming pools end//////////////////////////////////////
      } catch (err) {
        console.log('calc apr error', err);
      }
    }
    getApr();
  }, [walletAddress, slowRefresh]);
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
          <LiquiditySections
            currentChainId={currentChainId ?? ''}
            usdtTlcApr={usdtTlcApr}
            usdcTlcApr={usdcTlcApr}
          />
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
        <Farms
          currentChainId={currentChainId ?? ''}
          usdtTlcApr={usdtTlcApr}
          usdcTlcApr={usdcTlcApr}
        />
      </div>
    </div>
  );
};

export default DecentralizedExchange;
