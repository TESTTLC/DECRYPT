import React, { useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import tlchainImage from 'src/assets/images/tlc-bridge.png';
import { ChainsIds, Project } from 'src/utils/types';
import usdcLogo from 'src/assets/images/USDC-logo.png';
import usdtLogo from 'src/assets/images/tether.png';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import lsoLogo from 'src/assets/images/LSO-logo.png';
import tlxLogo from 'src/assets/images/TLX-logo.png';
import tlLpLogo from 'src/assets/images/TLLP_COIN.png';
import atriLogo from 'src/assets/images/ATRI-logo.png';
import { AiFillLock } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { USDTContractAddress } from 'src/utils/globals';
import USDTToken from 'src/contracts/USDT.json';

import SwapTokensModal from './SwapTokensModal';
import Categories from './Categories';
import { toModalTokes } from './LiquiditySections';

/** Two Addreses because we have 1 for sending USDT to the TLLP address and
 *  1 for sending USDT to the TLC address
 */
const TLC_OwnerAddress = process.env.REACT_APP_TLC_OWNER_ADDRESS;
const TLLP_OwnerAddress = process.env.REACT_APP_TLLP_OWNER_ADDRESS;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromModalTokens: any[] = [
  {
    name: 'Tether',
    tag: 'USDT',
    image: usdtLogo,
    iconBackground: '',
    percentage1: 19,
    percentage2: 179,
  },
  {
    name: 'USD Coin',
    tag: 'USDC',
    image: usdcLogo,
    iconBackground: '',
    percentage1: 19,
    percentage2: 179,
  },
  {
    name: 'Luxandia',
    tag: 'LSO',
    image: lsoLogo,
    iconBackground: 'white',
    percentage1: 19,
    percentage2: 120,
  },
  {
    name: 'The Luxury',
    tag: 'TLX',
    image: tlxLogo,
    iconBackground: '',
    percentage1: 30,
    percentage2: 170,
  },
  {
    name: 'Atari Token',
    tag: 'ATRI',
    image: atriLogo,
    iconBackground: '',
    percentage1: 6.5,
    percentage2: undefined,
  },
];

const minimumAmount = 200;
const TLCValue = 0.2; // USDT
const TLLPValue = 0.2; // USDT

export const toModalTokens: Project[] = [
  {
    name: 'TLC',
    tag: 'TLC',
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

interface Props {
  currentChainId: string;
}
const SwapSections: React.FC<Props> = ({ currentChainId }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [amountToSwap, setAmountToSwap] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fromToken, setFromToken] = useState<string>(fromModalTokens[0].tag);
  const [txType, setTxType] = useState<string>('');
  const [toToken, setToToken] = useState(toModalTokens[0].tag);
  const [toUsdtAddress, setToUsdtAddress] = useState<string | undefined>(
    TLC_OwnerAddress,
  );
  // const [amountToSwap, setamountToSwap] = useState(0);

  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const onFromTokenChange = (token: string) => {
    console.log('Changing token: ', token);
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
    // setAmountToSwap(parseFloat(e.target.value));
    setAmountToSwap(e.target.value);
  };

  // Send USDT
  const send = async () => {
    console.log('provider: ', provider);
    console.log('walletAddress: ', walletAddress);
    console.log('amountToSwap: ', amountToSwap);
    console.log('fromToken: ', fromToken);
    console.log('currentChainId: ', currentChainId);
    console.log('toToken: ', toToken);
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
        console.log('provider: ', provider);

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
  };

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
        <Categories />
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
              {/* <SwapTokensModal tokens={localModalTokens} type="from" /> */}
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
                  value={amountToSwap / TLCValue}
                ></input>
              </div>
              {/* <SwapTokensModal tokens={[]} type="to" /> */}
              <div className="flex w-1/2 justify-end items-center mt-4">
                <SwapTokensModal
                  tokens={toModalTokens}
                  onTokenChange={onToTokenChange}
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
            </div>
            {walletAddress && currentChainId === ChainsIds.BSC ? (
              <button
                className="flex w-full h-10 xs:mt-3 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                onClick={() => {
                  if (
                    amountToSwap >= minimumAmount &&
                    fromToken === 'USDT' &&
                    currentChainId === ChainsIds.BSC
                  ) {
                    setIsLoading(true);
                    send();
                  }
                }}
                disabled={
                  isLoading ||
                  amountToSwap < minimumAmount ||
                  fromToken !== 'USDT'
                }
              >
                {isLoading ? (
                  <>
                    {' '}
                    Exchange in progress &nbsp;
                    <TailSpin color="#fff" height={18} width={18} />
                  </>
                ) : (
                  'Exchange'
                )}
              </button>
            ) : (
              <p className="text-red-400 leading-tight">
                Please connect to Binance Smart Chain{' '}
                {!walletAddress && 'and connect your wallet'}{' '}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-4">
              {fromModalTokens.map((t, index) => {
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
                        src={toModalTokens[0].image}
                        className={`w-10 h-10 absolute left-11 bottom-2 rounded-full border-4 bg-gray-600 border-gray-800 p-[0.15rem] ${
                          isOdd ? 'z-20' : 'z-10'
                        }`}
                      />
                    </div>
                    <div className="flex-[0.3]">
                      <span>
                        {t.tag}-{toModalTokens[0].tag}
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
                          // `/${t.percentage2}`
                          ''
                        )}
                        {/* {t.percentage2 ? (
                        <AiFillLock size={20} color={'yellow'} />
                      ) : (
                        ''
                      )} */}
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
