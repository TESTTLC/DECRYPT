/* eslint-disable @typescript-eslint/no-explicit-any */
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, {
  createRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Contract, ethers } from 'ethers';
import ERC20 from 'src/contracts/ERC20.json';
import WBNB from 'src/contracts/WTLC.json';
import { formatEther, parseEther, formatUnits } from 'ethers/lib/utils';
import {
  WTLCTokenContractAddress,
  TempUsdt,
  TempUsdc,
  TLChain_USDT_ChildTokenContractAddress,
  TLChain_USDC_ChildTokenContractAddress,
  MasterchefContractAddress,
  wtlc_eth,
  usdc_eth,
  usdt_eth,
  usdt_tlc_pool_eth,
  usdc_tlc_pool_eth,
} from 'src/utils/globals';

import { useUsdtTrans, useUsdcTrans } from '../utils/fetchVolume';

export const DexInfo = (prop: any) => {
  const [tlcPrice, setTlcPrice] = useState('0');
  const [tvl, setTvl] = useState('0.0');
  // Dex volume
  const [currentBlock, setCurrentBlock] = useState(0);
  const [usdtVolume, setUsdtVolume] = useState(0);
  const [usdcVolume, setUsdcVolume] = useState(0);
  const [usdtTrans, setUsdtTrans] = useUsdtTrans(currentBlock);
  const [usdcTrans, setUsdcTrans] = useUsdcTrans(currentBlock);
  const url = 'https://mainnet-rpc.tlchain.live/';
  // const url = 'https://mainnet.infura.io/v3/7f7f3d56bbbb45389554ccbaf12df8e3';

  const getBlock = async () => {
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    const cBlock = await customHttpProvider.getBlockNumber();
    setCurrentBlock(cBlock);
  };

  useEffect(() => {
    getBlock();
  }, [currentBlock]);

  useEffect(() => {
    async function usdtTransactionFetch() {
      if (usdtTrans) {
        const data = usdtTrans;
        let usdtTransAmount = 0;
        for (let i = 0; i < data.length; i++) {
          const { index, swapData, path, timeStamp, transactionHash } = data[i];
          const temp = swapData.slice(2);
          const d2 = formatEther(
            parseInt(temp.slice(64, 128), 16).toLocaleString('fullwide', {
              useGrouping: false,
            }),
          );
          const des = formatEther(
            parseInt(temp.slice(192, 256), 16).toLocaleString('fullwide', {
              useGrouping: false,
            }),
          );
          const wtlc = WTLCTokenContractAddress.slice(2);

          if (wtlc.toLocaleLowerCase() === path[1].toLocaleLowerCase()) {
            usdtTransAmount += parseFloat(d2);
          } else {
            usdtTransAmount += parseFloat(des);
          }
        }
        setUsdtVolume(usdtTransAmount);
      }
    }
    usdtTransactionFetch();
  }, [usdtTrans]);

  useEffect(() => {
    async function usdcTransactionFetch() {
      if (usdcTrans) {
        const data = usdcTrans;
        let usdcTransAmount = 0;
        for (let i = 0; i < data.length; i++) {
          const { swapData, path } = data[i];
          const temp = swapData.slice(2);
          const d2 = formatEther(
            parseInt(temp.slice(64, 128), 16).toLocaleString('fullwide', {
              useGrouping: false,
            }),
          );
          const des = formatEther(
            parseInt(temp.slice(192, 256), 16).toLocaleString('fullwide', {
              useGrouping: false,
            }),
          );

          const wtlc = WTLCTokenContractAddress.slice(2);
          if (wtlc.toLocaleLowerCase() === path[1].toLocaleLowerCase()) {
            usdcTransAmount += parseFloat(d2);
          } else {
            usdcTransAmount += parseFloat(des);
          }
        }
        setUsdcVolume(usdcTransAmount);
      }
    }
    usdcTransactionFetch();
  }, [usdcTrans]);

  useEffect(() => {
    async function fetchData() {
      // get the price
      const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
      const tlc_usdc_cont = new Contract(
        TLChain_USDC_ChildTokenContractAddress,
        // usdc_eth,
        ERC20.abi,
        customHttpProvider,
      );
      const tlc_usdt_cont = new Contract(
        TLChain_USDT_ChildTokenContractAddress,
        // usdt_eth,
        ERC20.abi,
        customHttpProvider,
      );
      const usdt_amount = await tlc_usdt_cont.balanceOf(TempUsdt);
      const usdt_amount_fl = parseFloat(
        formatEther(
          usdt_amount.toLocaleString('fullwide', {
            useGrouping: false,
          }),
        ),
      );

      const tlc_wbnb_cont = new Contract(
        WTLCTokenContractAddress,
        WBNB.abi,
        customHttpProvider,
      );
      const wbnb_amount = await tlc_wbnb_cont.balanceOf(TempUsdt);
      const wbnb_amount_fl = parseFloat(
        formatEther(
          wbnb_amount.toLocaleString('fullwide', {
            useGrouping: false,
          }),
        ),
      );
      const price = usdt_amount_fl / wbnb_amount_fl;
      setTlcPrice(price.toFixed(2));

      //Get TVL
      // get the locked amount on masterchef from 2 pools
      const tlc_usdt_pool = new Contract(
        TempUsdt,
        ERC20.abi,
        customHttpProvider,
      );
      const tlc_usdt_total = await tlc_usdt_pool.totalSupply();
      const tlc_usdt_total_fl = parseFloat(
        formatEther(
          tlc_usdt_total.toLocaleString('fullwide', { useGrouping: false }),
        ),
      );
      //   console.log('total supply', tlc_usdt_total_fl);
      const tlc_usdt_locked = await tlc_usdt_pool.balanceOf(
        MasterchefContractAddress,
      );
      const tlc_usdt_locked_fl = parseFloat(
        formatEther(
          tlc_usdt_locked.toLocaleString('fullwide', { useGrouping: false }),
        ),
      );
      //   console.log('locked tlc usdt', tlc_usdt_locked_fl);
      const tlc_usdt_pool_usdt = await tlc_usdt_cont.balanceOf(TempUsdt);
      const tlc_usdt_pool_usdt_fl = parseFloat(
        formatEther(
          tlc_usdt_pool_usdt.toLocaleString('fullwide', { useGrouping: false }),
        ),
      );

      // locked tlc_usdt_pool
      const tvl_tlc_usdt =
        ((2 * tlc_usdt_locked_fl) / tlc_usdt_total_fl) * tlc_usdt_pool_usdt_fl;

      const tlc_usdc_pool = new Contract(
        TempUsdc,
        ERC20.abi,
        customHttpProvider,
      );
      const tlc_usdc_total = await tlc_usdc_pool.totalSupply();
      const tlc_usdc_total_fl = parseFloat(
        formatEther(
          tlc_usdc_total.toLocaleString('fullwide', { useGrouping: false }),
        ),
      );
      //   console.log('total supply', tlc_usdc_total_fl);
      const tlc_usdc_locked = await tlc_usdc_pool.balanceOf(
        MasterchefContractAddress,
      );
      const tlc_usdc_locked_fl = parseFloat(
        formatEther(
          tlc_usdc_locked.toLocaleString('fullwide', { useGrouping: false }),
        ),
      );
      //   console.log('locked tlc usdc', tlc_usdc_locked_fl);
      const tlc_usdc_pool_usdc = await tlc_usdc_cont.balanceOf(TempUsdc);
      const tlc_usdc_pool_usdc_fl = parseFloat(
        formatEther(
          tlc_usdc_pool_usdc.toLocaleString('fullwide', { useGrouping: false }),
        ),
      );

      // locked tlc_usdc_pool
      const tvl_tlc_usdc =
        ((2 * tlc_usdc_locked_fl) / tlc_usdc_total_fl) * tlc_usdc_pool_usdc_fl;

      // staking balance
      const stakingBal = await customHttpProvider.getBalance(
        '0x140a7698690E689FE65AdC6AeCBB5bD8301999d4',
      );
      const staking_fl = parseFloat(formatEther(stakingBal));
      const tvl_staking = staking_fl * price;

      const total_tvl = (tvl_tlc_usdc + tvl_tlc_usdt + tvl_staking).toFixed(2);

      setTvl(total_tvl.toString());
    }

    // trading volume
    fetchData();
  }, []);

  return (
    <>
      <div className="relative flex items-center justify-between w-[36rem] xs:w-[22rem] min-h-20 px-8 xs:px-2 sm:px-4 py-4 rounded-lg bg-black bg-opacity-60 text-white text-center my-4">
        <div className="flex flex-col items-center justify-center text-sm">
          <span>TLC Price = ${tlcPrice}</span>
          <span>Total Value Locked</span>
          <span>${tvl}</span>
        </div>
        <div className="w-[1px] bg-gray-400 h-16 mx-3"></div>
        <div className="flex flex-col items-center justify-center text-sm">
          <span>Trading Volume</span>
          <span>${(usdtVolume + usdcVolume).toFixed(4)}</span>
        </div>
      </div>
    </>
  );
};

export default DexInfo;
