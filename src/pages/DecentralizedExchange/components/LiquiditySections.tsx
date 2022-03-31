import React, { useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import tlchainImage from 'src/assets/images/tlc-bridge.png';
import { Project } from 'src/utils/types';
import usdcLogo from 'src/assets/images/USDC-logo.png';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import lsoLogo from 'src/assets/images/LSO-logo.png';
import tlxLogo from 'src/assets/images/TLX-logo.png';
import atriLogo from 'src/assets/images/ATRI-logo.png';
import { AiFillLock } from 'react-icons/ai';

import LiquidityTokensModal from './LiquidityTokensModal';
import Categories from './Categories';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromModalTokens: any[] = [
  {
    name: 'USDC',
    tag: 'USDC',
    image: usdcLogo,
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
    name: 'TLX',
    tag: 'TLX',
    image: tlxLogo,
    iconBackground: '',
    percentage1: 30,
    percentage2: 170,
  },
  {
    name: 'ATRI',
    tag: 'ATRI',
    image: atriLogo,
    iconBackground: '',
    percentage1: 6.5,
    percentage2: undefined,
  },
];

export const toModalTokes: Project[] = [
  {
    name: 'TLC',
    tag: 'TLC',
    image: tlcLogo,
  },
];

const LiquiditySections: React.FC = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [amountToSwap, setAmountToSwap] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fromToken, setFromToken] = useState(fromModalTokens[0].tag);
  const [toToken, setToToken] = useState(toModalTokes[0].tag);

  const onFromTokenChange = (token: string) => {
    setFromToken(token);
  };

  const onToTokenChange = (token: string) => {
    setToToken(token);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAmountChange = (e: any) => {
    setAmountToSwap(e.target.value);
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
          Liquidity
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
              {/* <LiquidityTokensModal tokens={localModalTokens} type="from" /> */}
              <div className="flex w-1/2 justify-end items-center mt-4">
                {/* <img
              className="text-white font-poppins w-4 h-4 mr-2 object-cover "
              src={tetherImage}
              alt="Tether-Logo"
            /> 
             <p className="font-poppins text-md text-white">USDC</p> */}
                <LiquidityTokensModal
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
                  value={amountToSwap * 17}
                ></input>
              </div>
              {/* <LiquidityTokensModal tokens={[]} type="to" /> */}
              <div className="flex w-1/2 justify-end items-center mt-4">
                <img
                  className="text-white font-poppins w-6 h-6 mr-2 object-cover "
                  src={tlchainImage}
                  alt="TLChain-Logo"
                />
                <p className="font-poppins text-md text-white">TLC</p>
              </div>
            </div>
            <div className="h-14 mt-2" />
            <button className="flex w-full h-10 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center">
              {isLoading ? (
                <>
                  {' '}
                  Adding in progress &nbsp;
                  <TailSpin color="#fff" height={18} width={18} />
                </>
              ) : (
                'Add'
              )}
            </button>
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
                        src={toModalTokes[0].image}
                        className={`w-10 h-10 absolute left-11 bottom-2 rounded-full border-4 bg-gray-600 border-gray-800 p-[0.15rem] ${
                          isOdd ? 'z-20' : 'z-10'
                        }`}
                      />
                    </div>
                    <div className="flex-[0.3]">
                      <span>
                        {t.tag}-{toModalTokes[0].tag}
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
                After you add liquidity you can stake your LP tokens in a farm
                to earn more rewards!
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiquiditySections;
