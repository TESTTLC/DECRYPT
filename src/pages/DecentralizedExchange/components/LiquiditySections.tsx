import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import tlchainImage from 'src/assets/images/tlc-bridge.png';
import { Project } from 'src/utils/types';
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

interface Props {
  usdtTlcApr: string;
  usdcTlcApr: string;
}

const LiquiditySections: React.FC<Props> = ({ usdtTlcApr, usdcTlcApr }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fromModalTokens: any[] = [
    {
      name: 'Wrapped USDC',
      tag: 'wUSDC',
      image: usdcLogo,
      iconBackground: '',
      percentage1: usdtTlcApr,
      // percentage2: 179,
      address: TLChain_USDC_ChildTokenContractAddress,
    },
    {
      name: 'Wrapped USDT',
      tag: 'wUSDT',
      image: usdtLogo,
      iconBackground: '',
      percentage1: usdcTlcApr,
      // percentage2: 179,
      address: TLChain_USDT_ChildTokenContractAddress,
    },
    //   {
    //     name: 'LSO',
    //     tag: 'LSO',
    //     image: lsoLogo,
    //     iconBackground: 'white',
    //     percentage1: 19,
    //     percentage2: 120,
    //   },
    //   {
    //     name: 'EGLD',
    //     tag: 'EGLD',
    //     image: egldLogo,
    //     iconBackground: '',
    //     percentage1: 30,
    //     percentage2: 170,
    //   },
    //   {
    //     name: 'TLX',
    //     tag: 'TLX',
    //     image: tlxLogo,
    //     iconBackground: '',
    //     percentage1: 30,
    //     percentage2: 170,
    //   },
    //   {
    //     name: 'ATRI',
    //     tag: 'ATRI',
    //     image: atriLogo,
    //     iconBackground: '',
    //     percentage1: 6.5,
    //     percentage2: undefined,
    //   },
  ];

  const [sectionIndex, setSectionIndex] = useState(0);
  const [amountToSwap, setAmountToSwap] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [firstToken, setFirstToken] = useState(fromModalTokens[0]);
  const [secondToken, setSecondToken] = useState(toModalTokes[0]);
  const [secondAmount, setSecondAmount] = useState(0);

  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const onFirstTokenChange = (tag: string) => {
    const token = fromModalTokens.find((item) => item.tag === tag);
    console.log('T: ', token);
    setFirstToken(token);
  };

  const onSecondTokenChange = (tag: string) => {
    const token = toModalTokes.find((item) => item.tag === tag);
    // setSecondToken(token);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAmountChange = (e: any) => {
    setAmountToSwap(e.target.value);
  };

  const calculateInputAmount = useCallback(async () => {
    let pairAddress = TempUsdc;
    if (firstToken.address === TLChain_USDT_ChildTokenContractAddress) {
      pairAddress = TempUsdt;
    }

    const pairContract = new Contract(
      pairAddress,
      Pair.abi,
      provider?.getSigner(),
    );

    console.log('PairContract: ', pairContract);
    // const reservesResult = await pairContract.getReserves(
    //   FactoryContractAddress,
    //   firstToken.address,
    //   secondToken.address,
    // );
    const reservesResult = await pairContract.getReserves();
    console.log(
      'Reserves result: ',
      reservesResult[0].toString(),
      reservesResult[1].toString(),
    );

    // it looks like reserves are reversed in the LP Contracts
    let reserve1 = 0;
    let reserve2 = 0;
    if (pairAddress === TempUsdt) {
      //   reserve1 = reservesResult[1].toString() * 1000000000000;
      reserve2 = Number(formatEther(reservesResult[0].toString()));
      reserve1 = Number(formatUnits(reservesResult[1], 6));
    } else {
      reserve1 = Number(formatUnits(reservesResult[0], 6));
      reserve2 = Number(formatEther(reservesResult[1].toString()));
      //   reserve1 = reservesResult[0].toString();
    }
    const ratio = reserve1 / reserve2;

    console.log('ratio: ', ratio);
    console.log(
      'parseFloat(ratio.toFixed(8)',
      parseFloat(ratio.toString()).toFixed(8),
    );
    const finalSecondInput = amountToSwap / ratio;

    console.log('finalSecondInput: ', finalSecondInput);

    setSecondAmount(finalSecondInput);
  }, [firstToken.address, amountToSwap, provider]);

  useEffect(() => {
    if (provider && walletAddress) {
      calculateInputAmount();
    }
  }, [provider, walletAddress, amountToSwap, calculateInputAmount]);

  const addLiquidity = useCallback(async () => {
    console.log('Started addLiquidity');
    if (provider) {
      console.log('Provider here');
      try {
        setIsLoading(true);
        const routerContract = new Contract(
          RouterContractAddress,
          Router.abi,
          provider.getSigner(),
        );
        const wUSDTContract = new Contract(
          Ethereum_USDT_TokenContractAddress,
          ERC20.abi,
          provider.getSigner(),
        );
        const wUSDCContract = new Contract(
          Ethereum_USDC_TokenContractAddress,
          ERC20.abi,
          provider.getSigner(),
        );
        const wTLCContract = new Contract(
          Ethereum_wTLC_ChildTokenContractAddress,
          ERC20.abi,
          provider.getSigner(),
        );

        console.log('Contract: ', routerContract);
        const amount1 = amountToSwap; // wUSDT
        const amount2 = amount1 / 4.89; // TLC
        // const amountAMin = amount1 - (0.5 / 100) * amount1; //amount1 - 0.5% slippage
        // const amountBMin = amount2 - (0.5 / 100) * amount2; //amount1 - 0.5% slippage
        const deadline = addHours(1);

        console.log('Deadline: ', deadline);

        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        const timestamp = block?.timestamp + 300;

        console.log('blockNumber: ', blockNumber);
        console.log('firstToken.address: ', firstToken.address);
        console.log('secondToken.address: ', secondToken.address);
        console.log(
          'amount2: ',
          ethers.FixedNumber.fromValue(parseEther(amount2.toFixed(18)), 18),
        );
        let approve1tx;
        if (firstToken.tag === 'wUSDT') {
          approve1tx = await wUSDTContract.approve(
            RouterContractAddress,
            parseUnits(amount1.toString(), 6),
          );
        } else {
          approve1tx = await wUSDCContract.approve(
            RouterContractAddress,
            parseUnits(amount1.toString(), 6),
          );
        }

        const approve1Result = await approve1tx.wait();
        console.log('approve1tx: ', approve1tx);
        console.log('approve1Result: ', approve1Result);

        const approve2tx = await wTLCContract.approve(
          RouterContractAddress,
          ethers.FixedNumber.fromValue(parseEther(amount2.toFixed(18))),
        );
        const approve2Result = await approve2tx.wait();
        console.log('approve2tx: ', approve2tx);
        console.log('approve2Result: ', approve2Result);
        const result = await routerContract.addLiquidity(
          firstToken.address,
          secondToken.address,
          //   parseEther(amount1.toString()),
          parseUnits(amount1.toString(), 6),
          ethers.FixedNumber.fromValue(parseEther(amount2.toFixed(18))),
          //   parseEther(amount2.toFixed(18)),
          0,
          0,
          //   parseEther(amountAMin.toString()),
          //   parseEther(amountBMin.toString()),
          walletAddress,
          timestamp,
        );

        console.log('result: ', result.wait());
        setIsLoading(false);
      } catch (error) {
        console.log('Error on addLiquidity: ', error);
        setIsLoading(false);
      }
    }
  }, [
    amountToSwap,
    firstToken.address,
    firstToken.tag,
    provider,
    secondToken.address,
    walletAddress,
  ]);

  //   useEffect(() => {
  //     addLiquidity();
  //   }, [addLiquidity]);

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
                  {/* From */}
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
                  onTokenChange={onFirstTokenChange}
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
                  {/* To */}
                </p>
                <input
                  className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                  type="number"
                  disabled
                  //   value={amountToSwap / 4.89}
                  value={secondAmount}
                ></input>
              </div>
              <div className="flex w-1/2 justify-end items-center mt-4">
                <img
                  className="text-white font-poppins w-9 h-9 mr-2 object-cover "
                  src={tlchainImage}
                  alt="TLChain-Logo"
                />
                <p className="font-poppins text-md text-white">wTLC</p>
              </div>
            </div>
            <div className="h-14 mt-2" />
            <button
              onClick={addLiquidity}
              className="flex w-full h-10 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
            >
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
                        {t.percentage1}
                        {/* {t.percentage2 ? (
                          <>
                            /
                            <AiFillLock size={20} color={'yellow'} />
                            {t.percentage2}%
                          </>
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
