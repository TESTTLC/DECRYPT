import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import tlchainImage from 'src/assets/images/tlc-bridge.png';
import { Project, ChainsIds } from 'src/utils/types';
import usdcLogo from 'src/assets/images/USDC-logo.png';
import usdtLogo from 'src/assets/images/USDT-logo.png';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import { AiFillLock } from 'react-icons/ai';
import {
  Ethereum_USDC_TokenContractAddress,
  Ethereum_USDT_TokenContractAddress,
  Ethereum_wTLC_ChildTokenContractAddress,
  RouterContractAddress,
  TempUsdc,
  TempUsdt,
  X_TLC,
  X_USDT,
  X_USDC,
  TLChain_USDC_ChildTokenContractAddress,
  TLChain_USDT_ChildTokenContractAddress,
  WTLCTokenContractAddress,
} from 'src/utils/globals';
import { Contract, ethers, FixedNumber } from 'ethers';
import Router from 'src/contracts/Router.json';
import ERC20 from 'src/contracts/ERC20.json';
import Pair from 'src/contracts/Pair.json';
import TheLuxuryCoinToken from 'src/contracts/TheLuxuryCoinToken.json';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import { addHours } from 'src/utils/functions/utils';
import {
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
} from 'ethers/lib/utils';

import LiquidityTokensModal from './LiquidityTokensModal';
import Categories from './Categories';

export const toModalTokes: Project[] = [
  {
    name: 'Wrapped The Luxury Coin',
    tag: 'wTLC',
    image: tlcLogo,
    address: WTLCTokenContractAddress,
  },
];
export const Liquidities: Project[] = [
  {
    name: 'TLC-USDT LP',
    tag: 'TLC-USDT LP',
    image: tlcLogo,
    address: TempUsdt,
  },
  {
    name: 'TLC-USDC LP',
    tag: 'TLC-USDC LP',
    image: tlcLogo,
    address: TempUsdc,
  },
];

interface Props {
  currentChainId: string;
}

const RemoveLiquidity: React.FC<Props> = ({ currentChainId }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [amountToSwap, setAmountToSwap] = useState(0);
  const [secondToken, setSecondToken] = useState(toModalTokes[0]);
  const [secondAmount, setSecondAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [usdtLpBal, setUsdtLpBal] = useState(0);
  const [usdcLpBal, setUsdcLpBal] = useState(0);
  const [xTlcLpBal, setXTlcLpBal] = useState(0);
  const [xUsdtLpBal, setXUsdtLpBal] = useState(0);
  const [xUsdcLpBal, setXUsdcLpBal] = useState(0);
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  useEffect(() => {
    if (provider && walletAddress) {
      calculateWalletOwnLiquidity();
    }
  }, [provider, walletAddress]);
  const calculateWalletOwnLiquidity = useCallback(async () => {
    console.log('calculate wallet');
    // get balance of usdt-tlc, usdc-tlc lp amount of the walllet address
    if (walletAddress && provider) {
      const usdtLpContract = new Contract(
        TempUsdt,
        Pair.abi,
        provider?.getSigner(),
      );
      const usdcLpContract = new Contract(
        TempUsdc,
        Pair.abi,
        provider?.getSigner(),
      );
      const xTlcLpContract = new Contract(
        X_TLC,
        Pair.abi,
        provider?.getSigner(),
      );
      const xUsdtLpContract = new Contract(
        X_USDT,
        Pair.abi,
        provider?.getSigner(),
      );
      const xUsdcLpContract = new Contract(
        X_USDC,
        Pair.abi,
        provider?.getSigner(),
      );

      const usdtLp = await usdtLpContract.balanceOf(walletAddress);
      const usdtLpAmount = parseFloat(formatEther(usdtLp));
      setUsdtLpBal(usdtLpAmount);
      const usdcLp = await usdcLpContract.balanceOf(walletAddress);
      const usdcLpAmount = parseFloat(formatEther(usdcLp));
      setUsdcLpBal(usdcLpAmount);
      const xLp = await xTlcLpContract.balanceOf(walletAddress);
      const xLpAmount = parseFloat(formatEther(xLp));
      setXTlcLpBal(xLpAmount);
      const xUsdtLp = await xUsdtLpContract.balanceOf(walletAddress);
      const xUsdtLpAmount = parseFloat(formatEther(xUsdtLp));
      setXUsdtLpBal(xUsdtLpAmount);
      const xUsdcLp = await xUsdcLpContract.balanceOf(walletAddress);
      const xUsdcLpAmount = parseFloat(formatEther(xUsdcLp));
      setXUsdcLpBal(xUsdcLpAmount);
    }
  }, [provider, walletAddress]);

  const removeLp = async (lpType: number) => {
    console.log('removeLP');
    if (provider) {
      try {
        setIsLoading(true);
        const routerContract = new Contract(
          RouterContractAddress,
          Router.abi,
          provider.getSigner(),
        );
        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        const timestamp = block?.timestamp + 300000;
        if (lpType == 0) {
          // remove wUSDT-tlc lp
          /*const usdtLpContract = new Contract(
            TempUsdt,
            Pair.abi,
            provider?.getSigner(),
          );
          const signer = provider?.getSigner();
          const usdtLp = await usdtLpContract.balanceOf(walletAddress);
          const nonce = await usdtLpContract.nonces(walletAddress);

          // approve amount
          const approveLp = await usdtLpContract.approve(
            RouterContractAddress,
            usdtLp,
          );
          console.log(approveLp);
          console.log('usdtlp', usdtLp.toString());
          console.log('usdt nonce', nonce.toString());
          console.log('block time', timestamp);*/

          // Remove liquidity
          /* const result = await routerContract.removeLiquidityETH(
            TLChain_USDT_ChildTokenContractAddress,
            usdtLp,
            // usdtLp,
            1,
            1,
            walletAddress,
            timestamp,
            { gasLimit: 1000000 },
          );
          await result.wait();
          console.log('done');*/

          // const msgParams = JSON.stringify({
          //   types: {
          //     EIP712Domain: [
          //       { name: 'name', type: 'string' },
          //       { name: 'version', type: 'string' },
          //       { name: 'chainId', type: 'uint256' },
          //       { name: 'verifyingContract', type: 'address' },
          //     ],
          //     set: [
          //       { name: 'owner', type: 'address' },
          //       { name: 'sender', type: 'address' },
          //       { name: 'value', type: 'uint256' },
          //       { name: 'nonce', type: 'uint256' },
          //       { name: 'deadline', type: 'uint256' },
          //     ],
          //   },
          //   // replace contract address after deploying
          //   primaryType: 'set',
          //   domain: {
          //     name: 'TLC LP',
          //     version: '1',
          //     chainId: '2321',
          //     verifyingContract: TempUsdt,
          //   },
          //   message: {
          //     owner: walletAddress,
          //     sender: RouterContractAddress,
          //     // value: usdtLp.toString(),
          //     value: 10000,
          //     // nonce: parseInt(nonce.toString()),
          //     nonce: nonce.toHexString(),
          //     deadline: timestamp,
          //   },
          // });

          // call permit call
          // const result = await routerContract.removeLiquidityETHWithPermit(
          //   TempUsdt, // there is a problem here
          //   10000,
          //   1,
          //   1,
          //   walletAddress,
          //   timestamp,
          //   false,
          //   v,
          //   r,
          //   s,
          //   { gasLimit: 100000 },
          // );
          // result.wait();
          // console.log('result', result);

          setIsLoading(false);
        } else {
        }
      } catch (err) {
        console.log('Error on removeLiquidity', err);
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="relative text-white font-poppins">
      <div className="flex flex-col justify-between items-center w-full mb-4 mt-4">
        {usdtLpBal > 0 ? (
          <div className="flex justify-between w-full m-1">
            <h1>wUSDT-TLC LP</h1>
            <h1>{usdtLpBal.toFixed(4)}</h1>
            <button
              className="flex h-6 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
              onClick={() => removeLp(0)}
            >
              Remove LP
            </button>
          </div>
        ) : (
          <></>
        )}
        {usdcLpBal > 0 ? (
          <div className="flex justify-between w-full m-1">
            <h1>wUSDC-TLC LP</h1>
            <h1>{usdcLpBal.toFixed(4)}</h1>
            <button className="flex h-6 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center">
              Remove LP
            </button>
          </div>
        ) : (
          <></>
        )}
        {xTlcLpBal > 0 ? (
          <div className="flex justify-between w-full m-1">
            <h1>X-TLC LP</h1>
            <h1>{xTlcLpBal.toFixed(4)}</h1>
            <button className="flex h-6 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center">
              Remove LP
            </button>
          </div>
        ) : (
          <></>
        )}
        {xUsdtLpBal > 0 ? (
          <div className="flex justify-between w-full m-1">
            <h1>X-USDT LP</h1>
            <h1>{xUsdtLpBal.toFixed(4)}</h1>
            <button className="flex h-6 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center">
              Remove LP
            </button>
          </div>
        ) : (
          <></>
        )}
        {xUsdcLpBal > 0 ? (
          <div className="flex justify-between w-full m-1">
            <h1>X-USDC LP</h1>
            <h1>{xUsdcLpBal.toFixed(4)}</h1>
            <button className="flex h-6 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center">
              Remove LP
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default RemoveLiquidity;
