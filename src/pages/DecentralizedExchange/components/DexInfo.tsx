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
import { formatEther, parseEther } from 'ethers/lib/utils';
import {
  WTLCTokenContractAddress,
  TempUsdt,
  TempUsdc,
  TLChain_USDT_ChildTokenContractAddress,
  TLChain_USDC_ChildTokenContractAddress,
  MasterchefContractAddress,
} from 'src/utils/globals';

import { useTrans } from '../utils/fetchData';

export const DexInfo = (prop: any) => {
  const [tlcPrice, setTlcPrice] = useState('0');
  const [tvl, setTvl] = useState('0.0');
  const [currentBlock, setCurrentBlock] = useState(0);

  const [trans, setTrans] = useTrans(currentBlock);
  const url = 'https://mainnet-rpc.tlxscan.com/';

  const getBlock = async () => {
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    const cBlock = await customHttpProvider.getBlockNumber();
    console.log('current block', cBlock);
    setCurrentBlock(cBlock);
  };

  useEffect(() => {
    getBlock();
  }, [currentBlock]);

  useEffect(() => {
    async function fetchData() {
      // get the price

      const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
      const tlc_usdc_cont = new Contract(
        TLChain_USDC_ChildTokenContractAddress,
        ERC20.abi,
        customHttpProvider,
      );
      const tlc_usdt_cont = new Contract(
        TLChain_USDT_ChildTokenContractAddress,
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
      //   console.log('pool usdt', tlc_usdt_pool_usdt_fl);

      // locked tlc_usdt_pool
      const tvl_tlc_usdt =
        ((2 * tlc_usdt_locked_fl) / tlc_usdt_total_fl) * tlc_usdt_pool_usdt_fl;
      //   console.log('tvl usdt', tvl_tlc_usdt);

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
      //   console.log('pool usdc', tlc_usdc_pool_usdc_fl);

      // locked tlc_usdc_pool
      const tvl_tlc_usdc =
        ((2 * tlc_usdc_locked_fl) / tlc_usdc_total_fl) * tlc_usdc_pool_usdc_fl;
      //   console.log('tvl usdc', tvl_tlc_usdc);

      // staking balance
      const stakingBal = await customHttpProvider.getBalance(
        '0xf71147E5cD6AB7b3d2Ae43256733Dff24231e832',
      );
      const staking_fl = parseFloat(formatEther(stakingBal));
      const tvl_staking = staking_fl * price;

      console.log('staking fl', staking_fl);

      const total_tvl = (tvl_tlc_usdc + tvl_tlc_usdt + tvl_staking).toFixed(2);

      setTvl(total_tvl.toString());
    }

    // trading volume

    fetchData();
  }, []);

  useEffect(() => {
    console.log('hello world');
    console.log(trans);
  }, [trans]);

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
          <span>Volume</span>
          <span>$3500</span>
        </div>
      </div>
    </>
  );
};

export default DexInfo;
