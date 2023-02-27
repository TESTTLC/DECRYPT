import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import { ChainsIds } from 'src/utils/types';
import usdcLogo from 'src/assets/images/USDC-logo.png';
import usdtLogo from 'src/assets/images/tether.png';
import xLogo from 'src/assets/images/X-logo.png';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import lsoLogo from 'src/assets/images/LSO-logo.png';
import tlLpLogo from 'src/assets/images/TLLP_COIN.png';
import egldLogo from 'src/assets/images/egld-coin.png';
import { AiFillLock } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { Contract, ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import {
  RouterContractAddress,
  TLChain_USDC_ChildTokenContractAddress,
  TLChain_USDT_ChildTokenContractAddress,
  TLChain_X_ChildTokenContractAddress,
  TLCTokenContractAddress,
  USDTContractAddress,
  WTLCTokenContractAddress,
} from 'src/utils/globals';
import USDTToken from 'src/contracts/USDT.json';
import Router from 'src/contracts/Router.json';
import ERC20 from 'src/contracts/ERC20.json';
import wTLCToken from 'src/contracts/WTLC.json';
import { formatUnits, parseEther } from 'ethers/lib/utils';

import SwapTokensModal from './SwapTokensModal';
import { toModalTokes } from './LiquiditySections';

/** Two Addreses because we have 1 for sending USDT to the TLLP address and
 *  1 for sending USDT to the TLC address
 */
const TLC_OwnerAddress = process.env.REACT_APP_TLC_OWNER_ADDRESS;
const TLLP_OwnerAddress = process.env.REACT_APP_TLLP_OWNER_ADDRESS;
const minimumAmount = 0;
const TLCValue = 4.65; // USDT
const TLLPValue = 4.65; // USDT

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromBinanceModalTokens: any[] = [
  {
    name: 'USDC',
    tag: 'USDC',
    image: usdcLogo,
    iconBackground: '',
    percentage1: 19,
    percentage2: 179,
  },
  {
    name: 'USDT',
    tag: 'USDT',
    image: usdtLogo,
    iconBackground: '',
    percentage1: 19,
    percentage2: 179,
  },
  {
    name: 'LSO',
    tag: 'LSO',
    image: lsoLogo,
    iconBackground: 'white',
    percentage1: 19,
    percentage2: 120,
  },
  {
    name: 'EGLD',
    tag: 'EGLD',
    image: egldLogo,
    iconBackground: '',
    percentage1: 30,
    percentage2: 170,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromBinanceToTLChainModalTokens: any[] = [
  {
    name: 'TLC',
    tag: 'TLC',
    image: tlcLogo,
    value: TLCValue,
  },
  {
    name: 'wTLC',
    tag: 'wTLC',
    image: tlcLogo,
    value: TLCValue,
  },
  {
    name: 'TLLP',
    tag: 'TLLP',
    image: tlLpLogo,
    value: TLLPValue,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromTLChainModalTokens: any[] = [
  {
    name: 'TLC',
    tag: 'TLC',
    image: tlcLogo,
    value: TLCValue,
    address: WTLCTokenContractAddress,
  },
  // {
  //   name: 'wTLC',
  //   tag: 'wTLC',
  //   image: tlcLogo,
  //   iconBackground: '',
  //   value: TLCValue,
  //   address: WTLCTokenContractAddress,
  // },
  {
    name: 'wUSDT',
    tag: 'wUSDT',
    image: usdtLogo,
    value: 1,
    address: TLChain_USDT_ChildTokenContractAddress,
  },
  {
    name: 'wUSDC',
    tag: 'wUSDC',
    image: usdcLogo,
    value: 1,
    address: TLChain_USDC_ChildTokenContractAddress,
  },
  {
    name: 'Luxury Token',
    tag: 'X',
    image: xLogo,
    value: 1,
    address: TLChain_X_ChildTokenContractAddress,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromTLChainToTLChainModalTokens: any[] = [
  // {
  //   name: 'wTLC',
  //   tag: 'wTLC',
  //   image: tlcLogo,
  //   iconBackground: '',
  //   value: TLCValue,
  //   address: WTLCTokenContractAddress,
  // },
  {
    name: 'wUSDT',
    tag: 'wUSDT',
    image: usdtLogo,
    value: 1,
    address: TLChain_USDT_ChildTokenContractAddress,
  },
  {
    name: 'TLC',
    tag: 'TLC',
    image: tlcLogo,
    value: TLCValue,
    address: WTLCTokenContractAddress,
  },
  {
    name: 'wUSDC',
    tag: 'wUSDC',
    image: usdcLogo,
    value: 1,
    address: TLChain_USDC_ChildTokenContractAddress,
  },
  {
    name: 'Luxury Token',
    tag: 'X',
    image: xLogo,
    value: 1,
    address: TLChain_X_ChildTokenContractAddress,
  },
];

const defaultToken = {
  name: 'Select token',
  tag: 'Select token',
  image: tlcLogo,
  iconBackground: '',
  value: 0,
  address: '',
};

interface Props {
  currentChainId: string;
}
const SwapSections: React.FC<Props> = ({ currentChainId }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [chainSectionIndex, setChainSectionIndex] = useState(1);
  const [amountToSwap, setAmountToSwap] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fromModalTokens, setFromModalTokens] = useState(
    fromBinanceModalTokens,
  );
  const [toModalTokens, setToModalTokens] = useState(
    fromBinanceToTLChainModalTokens,
  );

  const [fromToken, setFromToken] = useState<string>(defaultToken.tag);
  const [toToken, setToToken] = useState(toModalTokens[0].tag);
  const [txType, setTxType] = useState<string>(
    `${defaultToken.tag}_${toModalTokens[0].tag}`,
  );
  const [toUsdtAddress, setToUsdtAddress] = useState<string | undefined>(
    TLC_OwnerAddress,
  );

  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const [amountsOut, setAmountsOut] = useState(0);

  useEffect(() => {
    if (chainSectionIndex === 0) {
      // console.log('0');
      setFromModalTokens(fromBinanceModalTokens);
      setToModalTokens(fromBinanceToTLChainModalTokens);
      setFromToken(fromBinanceModalTokens[0].tag);
      setToToken(fromBinanceToTLChainModalTokens[0].tag);
    } else if (chainSectionIndex === 1) {
      // console.log('1');
      setFromModalTokens(fromTLChainModalTokens);
      setToModalTokens(fromTLChainToTLChainModalTokens);
      setFromToken(fromTLChainModalTokens[0].tag);
      setToToken(fromTLChainToTLChainModalTokens[0].tag);
    }
  }, [chainSectionIndex]);

  const swapTLCToWTLC = useCallback(async () => {
    if (amountToSwap > 0) {
      const tx = await provider?.getSigner().sendTransaction({
        to: WTLCTokenContractAddress,
        value: parseEther(amountToSwap.toString()),
      });
      const result = await tx?.wait();
    }
  }, [amountToSwap, provider]);

  const swapWTLCToTLC = useCallback(async () => {
    if (amountToSwap > 0 && provider) {
      //   const tx = await provider?.getSigner().sendTransaction({
      //     to: WTLCTokenContractAddress,
      //     value: parseEther(amountToSwap.toString()),
      //   });
      const wTLCContract = new Contract(
        WTLCTokenContractAddress,
        wTLCToken.abi,
        provider.getSigner(),
      );
      const finalAmount = parseEther(amountToSwap.toString());

      const tx = await wTLCContract.withdraw(finalAmount);
      const result = await tx?.wait();
    }
  }, [amountToSwap, provider]);

  const onFromTokenChange = (token: string) => {
    if (token === 'TLC' && toToken === 'TLC') {
      onToTokenChange('wTLC');
    }
    setFromToken(token);
    setTxType(`${token}_${toToken}`);
  };

  const onToTokenChange = (token: string) => {
    setToToken(token);
    setTxType(`${fromToken}_${token}`);
    if (token === toModalTokes[0].tag) {
      setToUsdtAddress(TLC_OwnerAddress);
    } else {
      setToUsdtAddress(TLLP_OwnerAddress);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAmountChange = (e: any) => {
    setAmountToSwap(e.target.value);
  };
  const swapExactEthForTokens = useCallback(async () => {
    if (provider) {
      try {
        setIsLoading(true);
        const address1 = WTLCTokenContractAddress;
        // console.log('swapExactEthForToken from address', address1);
        const address2 = fromTLChainToTLChainModalTokens.find(
          (token) => token.tag === toToken,
        ).address;

        // console.log('swapExactEthForToken to address', address2);

        const routerContract = new Contract(
          RouterContractAddress,
          Router.abi,
          provider?.getSigner(),
        );
        const amount1 = parseEther(amountToSwap.toString());

        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        const timestamp = block?.timestamp + 300;

        const tx = await routerContract.swapExactETHForTokens(
          0,
          [address1, address2],
          walletAddress,
          timestamp,
          { value: amount1 },
        );

        const swapResult = await tx.wait();
        setIsLoading(false);
      } catch (error) {
        console.log('Error on swapExactEthForTokens: ', error);
        setIsLoading(false);
      }
    }
  }, [amountToSwap, fromToken, provider, toToken, walletAddress]);
  const swapExactTokenForEth = useCallback(async () => {
    if (provider) {
      try {
        setIsLoading(true);

        const address1 = fromTLChainModalTokens.find(
          (token) => token.tag === fromToken,
        ).address;
        const address2 = WTLCTokenContractAddress;
        const routerContract = new Contract(
          RouterContractAddress,
          Router.abi,
          provider?.getSigner(),
        );

        const token = new Contract(address1, ERC20.abi, provider.getSigner());
        // check token is approved
        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        const timestamp = block?.timestamp + 300;

        // console.log('blockNumber: ', blockNumber);
        // console.log('firstToken.address: ', address1);
        // console.log('secondToken.address: ', address2);
        const amount1 = parseEther(amountToSwap.toString());
        const approvedAmount = await token.allowance(
          walletAddress,
          RouterContractAddress,
        );
        // console.log('amount1', amount1.toString());
        // console.log('approveAMount', approvedAmount.toString());
        if (amount1.gt(approvedAmount)) {
          const approveTx = await token.approve(RouterContractAddress, amount1);
          const approve1Result = await approveTx.wait();
        }

        // swap exact token to eth
        const tx = await routerContract.swapExactTokensForETH(
          amount1,
          0,
          [address1, address2],
          walletAddress,
          timestamp,
        );

        const swapResult = await tx.wait();
        setIsLoading(false);
      } catch (error) {
        console.log('Error on swapExactTokensForEth: ', error);
        setIsLoading(false);
      }
    }
  }, [amountToSwap, fromToken, provider, toToken, walletAddress]);
  const swapExactTokensForTokens = useCallback(async () => {
    if (provider) {
      try {
        setIsLoading(true);
        const address1 = fromTLChainModalTokens.find(
          (token) => token.tag === fromToken,
        ).address;
        const address2 = fromTLChainToTLChainModalTokens.find(
          (token) => token.tag === toToken,
        ).address;

        const routerContract = new Contract(
          RouterContractAddress,
          Router.abi,
          provider?.getSigner(),
        );

        const wUSDTContract = new Contract(
          TLChain_USDT_ChildTokenContractAddress,
          ERC20.abi,
          provider.getSigner(),
        );
        const wUSDCContract = new Contract(
          TLChain_USDC_ChildTokenContractAddress,
          ERC20.abi,
          provider.getSigner(),
        );

        const wTLCContract = new Contract(
          WTLCTokenContractAddress,
          wTLCToken.abi,
          provider.getSigner(),
        );

        const XContract = new Contract(
          TLChain_X_ChildTokenContractAddress,
          ERC20.abi,
          provider.getSigner(),
        );

        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        const timestamp = block?.timestamp + 300;

        // console.log('blockNumber: ', blockNumber);
        // console.log('firstToken.address: ', address1);
        // console.log('secondToken.address: ', address2);
        const amount1 = parseEther(amountToSwap.toString());

        let approve1tx;
        if (fromToken === 'wUSDT') {
          approve1tx = await wUSDTContract.approve(
            RouterContractAddress,
            amount1,
          );
          const approve1Result = await approve1tx.wait();
        } else if (fromToken === 'wUSDC') {
          approve1tx = await wUSDCContract.approve(
            RouterContractAddress,
            amount1,
          );
          const approve1Result = await approve1tx.wait();
        } else if (fromToken === 'X') {
          approve1tx = await XContract.approve(RouterContractAddress, amount1);
          const approve1Result = await approve1tx.wait();
        }

        const tx = await routerContract.swapExactTokensForTokens(
          amount1,
          0,
          [address1, address2],
          walletAddress,
          timestamp,
        );
        const swapResult = await tx.wait();
        setIsLoading(false);
      } catch (error) {
        console.log('Error on swapExactTokensForTokens: ', error);
        setIsLoading(false);
      }
    }
  }, [amountToSwap, fromToken, provider, toToken, walletAddress]);

  // Send USDT
  const send = useCallback(async () => {
    if (
      provider &&
      walletAddress &&
      amountToSwap >= minimumAmount &&
      fromToken === 'USDT' &&
      currentChainId === ChainsIds.BSC
    ) {
      try {
        const contract = new ethers.Contract(
          USDTContractAddress,
          USDTToken.abi,
          provider.getSigner(),
        );

        const usdts = ethers.utils.parseUnits(amountToSwap.toString(), 18);
        const tx = await contract.transfer(toUsdtAddress, usdts);
        const res = await fetch(
          `${process.env.REACT_APP_API_BACKEND_EXCHANGE}/api/claim`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: walletAddress,
              txhash: tx.hash,
              amount: amountToSwap.toString(),
              txType,
            }),
          },
        );
        setIsLoading(false);

        await res.json();
      } catch (error) {
        console.log('Error: ', error);
        setIsLoading(false);
      }
    }
  }, [
    amountToSwap,
    currentChainId,
    fromToken,
    provider,
    toUsdtAddress,
    txType,
    walletAddress,
  ]);

  const messageValue = useMemo(() => {
    if (chainSectionIndex === 1) {
      // if (
      //   (fromToken !== 'TLC' && fromToken === 'wUSDC' && toToken === 'wTLC') ||
      //   (fromToken === 'wUSDT' && toToken === 'wTLC') ||
      //   (fromToken === 'wTLC' && toToken === 'wUSDC') ||
      //   (fromToken === 'wTLC' && toToken === 'wUSDT')
      // ) {
      //   return 'Exchange';
      // } else if (
      //   (fromToken === 'TLC' && toToken === 'wTLC') ||
      //   (fromToken === 'wTLC' && toToken === 'TLC')
      // ) {
      //   return 'Exchange';
      // } else if (
      //   (fromToken === 'TLC' && toToken === 'wTLC') ||
      //   (fromToken === 'wTLC' && toToken === 'TLC')
      // ) {
      //   return 'Exchange';
      // } else {
      //   return 'Not possible yet';
      // }
      return 'Exchange';
    } else {
      return 'Exchange';
    }
  }, [chainSectionIndex, fromToken, toToken]);

  const shownTap = useMemo(() => {
    if (chainSectionIndex === 1) {
      if (
        walletAddress &&
        parseInt(currentChainId) === parseInt(ChainsIds.TLC)
      ) {
        return (
          <button
            className="flex w-full h-10 xs:mt-3 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
            onClick={async () => {
              // if (
              //   fromToken !== 'TLC' &&
              //   ((fromToken === 'wUSDC' && toToken === 'wTLC') ||
              //     (fromToken === 'wUSDT' && toToken === 'wTLC') ||
              //     (fromToken === 'wTLC' && toToken === 'wUSDC') ||
              //     (fromToken === 'wTLC' && toToken === 'wUSDT'))
              // ) {
              //   await swapExactTokensForTokens();
              // } else if (
              //   (fromToken === 'TLC' && toToken === 'wTLC') ||
              //   (fromToken === 'wTLC' && toToken === 'TLC')
              // ) {
              //   if (fromToken === 'TLC' && toToken === 'wTLC') {
              //     setIsLoading(true);
              //     await swapTLCToWTLC();
              //     setIsLoading(false);
              //   } else if (fromToken === 'wTLC' && toToken === 'TLC') {
              //     setIsLoading(true);
              //     swapWTLCToTLC();
              //     setIsLoading(false);
              //   }
              // }
              if (fromToken === 'TLC' || toToken === 'TLC') {
                if (fromToken === 'TLC') {
                  if (toToken === 'TLC') {
                    return;
                  }
                  await swapExactEthForTokens();
                } else {
                  await swapExactTokenForEth();
                }
              } else {
                await swapExactTokensForTokens();
              }
            }}
            disabled={isLoading || amountToSwap < minimumAmount}
          >
            {isLoading ? (
              <>
                {' '}
                Exchange in progress &nbsp;
                <TailSpin color="#fff" height={18} width={18} />
              </>
            ) : (
              `${messageValue}`
            )}
          </button>
        );
      } else {
        return (
          <p className="text-red-400 leading-tight">
            {/* Please connect to TLChain Mainnet{' '} */}
            Please connect to TLChain Mainnet{' '}
            {!walletAddress && 'and connect your wallet'}{' '}
          </p>
        );
      }
    } else if (chainSectionIndex === 0) {
      if (walletAddress && currentChainId === ChainsIds.BSC) {
        return (
          <button
            className="flex w-full h-10 xs:mt-3 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
            // onClick={() => {
            //   if (
            //     amountToSwap >= minimumAmount &&
            //     fromToken === 'USDT' &&
            //     currentChainId === ChainsIds.BSC
            //   ) {
            //     setIsLoading(true);
            //     send();
            //   }
            // }}
            disabled={
              isLoading || amountToSwap < minimumAmount || fromToken !== 'USDT'
            }
          >
            {isLoading ? (
              <>
                {' '}
                Exchange in progress &nbsp;
                <TailSpin color="#fff" height={18} width={18} />
              </>
            ) : (
              `${messageValue}`
            )}
          </button>
        );
      } else {
        return (
          <p className="text-red-400 leading-tight">
            Please connect to Binance Smart Chain{' '}
            {!walletAddress && 'and connect your wallet'}{' '}
          </p>
        );
      }
    }
  }, [
    amountToSwap,
    chainSectionIndex,
    currentChainId,
    fromToken,
    isLoading,
    messageValue,
    swapExactTokensForTokens,
    swapExactEthForTokens,
    swapTLCToWTLC,
    swapWTLCToTLC,
    toToken,
    walletAddress,
  ]);

  const getAmountsOut = useCallback(async () => {
    let out = 0;
    try {
      const routerC = new Contract(
        RouterContractAddress,
        Router.abi,
        provider?.getSigner(),
      );

      const from = fromTLChainToTLChainModalTokens.find(
        (t) => t.tag === fromToken,
      );
      const to = fromTLChainToTLChainModalTokens.find((t) => t.tag === toToken);
      // console.log('get amount from', from);
      // console.log('get amount, to', to);
      // console.log(
      //   'parseEther(amountToSwap.toString()): ',
      //   parseEther(amountToSwap.toString()),
      // );
      // console.log('[from.address, to.address]: ', [from.address, to.address]);
      if (from?.address && to?.address) {
        const result = await routerC.getAmountsOut(
          parseEther(amountToSwap.toString()),
          [from.address, to.address],
        );

        setAmountsOut(Number(formatUnits(result[1].toString())));
        out = Number(formatUnits(result[1].toString()));
      }
    } catch (error) {
      console.log('Error o getAmountsOut: ', error);
      setAmountsOut(0);
    }
    return out;
  }, [amountToSwap, fromToken, provider, toToken]);

  const value = useMemo(() => {
    getAmountsOut();
    const from = fromBinanceToTLChainModalTokens.find(
      (t) => t.tag === fromToken,
    );
    const to = fromBinanceToTLChainModalTokens.find((t) => t.tag === toToken);
    if (chainSectionIndex === 0) {
      return amountToSwap / TLCValue;
    } else if (chainSectionIndex === 1) {
      if (fromToken === toToken) {
        return amountToSwap;
      } else if (
        (fromToken === 'TLC' && toToken === 'wTLC') ||
        (fromToken === 'wTLC' && toToken === 'TLC')
      ) {
        return amountToSwap;
      } else if (fromToken === 'TLC' || fromToken === 'wTLC') {
        // return amountToSwap * TLCValue;
        return amountsOut;
      } else return amountsOut;
    }
  }, [
    getAmountsOut,
    fromToken,
    toToken,
    chainSectionIndex,
    amountToSwap,
    amountsOut,
  ]);

  return (
    <div className="relative items-center w-[34rem] xs:w-[22rem] xs:px-4 rounded-lg bg-black bg-opacity-60 text-white font-poppins">
      <div className="flex justify-between items-center w-full mb-4 h-10">
        <button
          className={`${
            sectionIndex === 0
              ? 'bg-black border-b-2 border-opacity-30'
              : 'bg-transparent'
          } items-center justify-center flex flex-[0.5] text-center rounded-tl-lg h-full`}
          onClick={() => setSectionIndex(0)}
        >
          Swap
        </button>
        <button
          className={`${
            sectionIndex === 1
              ? 'bg-black border-b-2 border-opacity-30'
              : 'bg-transparent '
          } items-center justify-center flex flex-[0.5] text-center rounded-tr-lg h-full`}
          onClick={() => setSectionIndex(1)}
        >
          Active Pools
        </button>
      </div>
      <div className="relative items-center pb-8 px-8 xs:px-2 sm:px-4">
        {/* <Categories /> */}
        <div className="flex items-center space-x-6 mb-2">
          {/* <div
            className={`${
              chainSectionIndex === 0 ? 'bg-black bg-opacity-70' : ''
            } px-4 py-2 rounded-lg cursor-pointer border-[1px] border-green-400`}
            onClick={() => setChainSectionIndex(0)}
          >
            Binance - TLChain
          </div> */}
          <div
            className={`${
              chainSectionIndex === 1 ? 'bg-black bg-opacity-70' : ''
            } px-4 py-2 rounded-lg cursor-pointer border-[1px] border-green-400`}
            onClick={() => setChainSectionIndex(1)}
          >
            TLChain - TLChain
          </div>
        </div>
        {sectionIndex === 0 ? (
          <>
            <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
              <div className="flex w-1/2 flex-col h-full">
                <p className="text-gray-400 font-medium font-poppins text-sm">
                  From
                </p>
                <input
                  className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                  onChange={handleAmountChange}
                  value={amountToSwap}
                  type="number"
                ></input>
              </div>
              <div className="flex w-1/2 justify-end items-center mt-4">
                {/* <img
              className="text-white font-poppins w-4 h-4 mr-2 object-cover "
              src={tetherImage}
              alt="Tether-Logo"
            /> 
             <p className="font-poppins text-md text-white">USDC</p> */}
                <SwapTokensModal
                  tokens={fromModalTokens}
                  onTokenChange={onFromTokenChange}
                  fromToken={fromToken}
                  toToken={toToken}
                  type="from"
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center h-14">
              <FaArrowCircleDown
                className="h-6 w-6 bg-transparent self-center "
                color="gray"
              />
            </div>
            <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
              <div className="flex w-1/2 flex-col h-full">
                <p className="text-gray-400 font-medium font-poppins text-sm">
                  To
                </p>
                <input
                  className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                  type="number"
                  disabled
                  value={value}
                ></input>
              </div>
              {/* <SwapTokensModal tokens={[]} type="to" /> */}
              <div className="flex w-1/2 justify-end items-center mt-4">
                <SwapTokensModal
                  tokens={toModalTokens}
                  onTokenChange={onToTokenChange}
                  fromToken={fromToken}
                  toToken={toToken}
                  type="to"
                />
                {/* <img
                  className="text-white font-poppins w-6 h-6 mr-2 object-cover "
                  src={tlchainImage}
                  alt="TLChain-Logo"
                />
                <p className="font-poppins text-md text-white">TLC</p> */}
              </div>
            </div>
            <div className="h-14 mt-2">
              {fromToken === 'USDT' ? (
                <>
                  <p className="font-poppins text-gray-300 h-4 text-sm">
                    Exchange Rate: 1 {fromToken} ≃ {1 / TLCValue} {toToken}
                  </p>
                  <p className="font-poppins text-gray-300 h-4 text-sm">
                    Slippage 1%
                  </p>
                  <p className="mb-2 font-poppins text-red-400 text-xs h-4 ">
                    Please note that there's a minim of {minimumAmount} USDT
                    (BEP20) per swap
                  </p>
                </>
              ) : null}

              {chainSectionIndex === 1 &&
                (fromToken === 'wUSDT' || fromToken === 'wUSDC') && (
                  <>
                    <p className="font-poppins text-gray-300 h-4 text-sm mb-1">
                      Price Impact
                    </p>
                    <p className="mb-2 font-poppins text-yellow-400 text-xs h-4 ">
                      This swap has a price impact of at least 10%
                    </p>
                  </>
                )}
            </div>
            {shownTap}
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-4">
              {fromBinanceModalTokens.map((t, index) => {
                const isOdd = index % 2 !== 0;
                return (
                  <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center text-sm">
                    <div className="flex flex-[0.2]">
                      <img
                        src={t.image}
                        className={`w-10 h-10 absolute top-2 rounded-full border-4 border-gray-800 p-0 ${
                          isOdd ? 'z-10' : 'z-20'
                        }`}
                      />
                      <img
                        src={fromBinanceToTLChainModalTokens[0].image}
                        className={`w-10 h-10 absolute left-11 bottom-2 rounded-full border-4 bg-gray-600 border-gray-800 p-[0.15rem] ${
                          isOdd ? 'z-20' : 'z-10'
                        }`}
                      />
                    </div>
                    <div className="flex-[0.3]">
                      <span>
                        {t.tag}-{fromBinanceToTLChainModalTokens[0].tag}
                      </span>
                    </div>
                    <div className="flex-[0.5]">
                      <span className="flex justify-end">
                        {t.percentage1}%
                        {t.percentage2 ? (
                          <>
                            /
                            <AiFillLock size={20} color={'yellow'} />
                            {t.percentage2}%
                          </>
                        ) : (
                          ''
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col mt-4 border-[1px] border-yellow-400 p-4 w-full text-yellow-400 text-xs rounded-md">
              <span className="font-bold">Reminder:</span>
              <span>
                After you swap tokens you can stake your LP tokens in a farm to
                earn more rewards!
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SwapSections;
