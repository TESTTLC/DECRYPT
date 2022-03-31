/* eslint-disable no-nested-ternary */
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import BatteryStatus from 'src/components/BatteryStatus';
import { StoreState } from 'src/utils/storeTypes';
import dotenv from 'dotenv';
import { changeChain } from 'src/utils/functions/MetaMask';
import EarningsIcon from 'src/assets/svg/Earnings';
import StakedFileIcon from 'src/assets/svg/StakedFile';
import TimeIcon from 'src/assets/svg/Time';
import RankIcon from 'src/assets/svg/Rank';
import LoanIcon from 'src/assets/svg/Loan';
import DebtIcon from 'src/assets/svg/Debt';
import OfferIcon from 'src/assets/svg/Offer';
import EyeIcon from 'src/assets/svg/Eye';
import WalletPng from 'src/assets/images/wallet.png';
import communityBond from 'src/assets/images/community-bond-bg.png';
import communityBond2 from 'src/assets/images/community-bond-bg-2.png';
import communityBond3 from 'src/assets/images/community-bond-bg-3.png';
import Switch from 'react-switch';
import { AiFillStar } from 'react-icons/ai';
import { useWindowSize } from 'src/hooks/useWindowSize';

import { useContracts } from '../../hooks/useContracts';
import { ChainsIds, Stake } from '../../utils/types';
import {
  determinePowerForStake,
  getTotalNumberOfTxByAddress,
  getTotalValueLocked,
  getUserStakes,
} from '../../utils/functions/Contracts';
import ProjectElement from '../Launchpad/components/ProjectElement';

import CryptoCityComponent from './components/CryptoCityComponent';
import AnalysisComponent from './components/AnalysisComponent';
import DailyInfoComponent from './components/DailyInfoComponent';

dotenv.config();

const DHS: React.FC = () => {
  const { state } = useLocation();
  const { isMobileSize } = useWindowSize();
  const { stakeContract: TLXStakeContract } = useContracts('TLX');
  const { stakeContract: TLCStakeContract } = useContracts('TLC');
  const { stakeContract: LSOStakeContract } = useContracts('LSO');
  const navigate = useNavigate();
  const walletAddress = useSelector<StoreState, string | undefined>(
    (reduxState) => reduxState.account.walletAddress,
  );
  const [showLaunchpadRegistration, setShowLaunchpadRegistration] =
    useState(false);

  const [totalSelfTransactionsCount, setTotalSelfTransactionsCount] =
    useState();
  const [switchChecked, setSwitchChecked] = useState(true);
  const [powerColor, setPowerColor] = useState('red-400');
  const [TLXPower, setTLXPower] = useState(0);
  const [TLCPower, setTLCPower] = useState(0);
  const [totalSelfStakedTLX, setTotalSelfStakedTLX] = useState(0);
  const [totalSelfStakedTLC, setTotalSelfStakedTLC] = useState(0);
  const [power, setPower] = useState(0);
  const [totalValueLocked, setTotalValueLocked] = useState('');
  const [totalRewards, setTotalRewards] = useState('');
  const [totalTLCStaked, setTotalTLCStaked] = useState('');
  const [totalTLXStaked, setTotalTLXStaked] = useState('');
  const [totalLSOtaked, setTotalLSOStaked] = useState('');

  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const [chainErrorMessage, setChainErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [launchpadRegistrationPower, setLaunchpadRegistrationPower] =
    useState(0);

  const [currentChainId, setCurrentChainId] = useState(
    window.ethereum?.networkVersion
      ? ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
      : undefined,
  );

  useEffect(() => {
    if (power < 20) {
      setPowerColor('#f43f5e');
    } else if (power >= 20 && power < 50) {
      setPowerColor('#fcd34d');
    } else {
      setPowerColor('#4ade80');
    }
  }, [power]);

  useEffect(() => {
    if (TLXStakeContract && TLCStakeContract) {
      getTLXtakeTransactions();
      getTLCStakeTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TLCStakeContract, TLXStakeContract]);

  const getTLXtakeTransactions = async () => {
    try {
      if (TLXStakeContract) {
        let currentAmout = 0;
        let currentPower = 0;
        const stakes = await getUserStakes(TLXStakeContract);
        stakes.forEach((stake: Stake) => {
          currentAmout += parseFloat(ethers.utils.formatEther(stake.amount));
          currentPower += determinePowerForStake(
            parseFloat(ethers.utils.formatEther(stake.amount)),
            stake.period.toNumber(),
            'TLX',
          );
        });
        setTLXPower(currentPower);
        setTotalSelfStakedTLX(parseFloat(currentAmout.toFixed(3)));
      }
    } catch (error) {}
  };

  const getTLCStakeTransactions = async () => {
    try {
      if (TLCStakeContract) {
        let currentAmout = 0;
        let currentPower = 0;
        const stakes = await getUserStakes(TLCStakeContract);
        stakes.forEach((stake: Stake) => {
          currentAmout += parseFloat(ethers.utils.formatEther(stake.amount));
          currentPower += determinePowerForStake(
            parseFloat(ethers.utils.formatEther(stake.amount)),
            stake.period.toNumber(),
            'TLC',
          );
        });
        setTLCPower(currentPower);
        setTotalSelfStakedTLC(parseFloat(currentAmout.toFixed(3)));
      }
    } catch (error) {}
  };

  const joinLaunchpad = async () => {
    const url = process.env.REACT_APP_JOIN_LAUNCHPAD_API;
    try {
      if (url && walletAddress && power >= 1) {
        const res = await fetch(`${url}/launchpad`, {
          method: 'POST',
          headers: {
            //   // Authorization: `Bearer 3d640837f60927fea171573fefff84d8fa4da0bc`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress,
            tlcStake: totalSelfStakedTLC,
            tlxStake: totalSelfStakedTLX,
            totalPower: power,
          }),
        });
        const result = await res.json();
        if (
          result &&
          result.walletAddress &&
          result.walletAddress === walletAddress
        ) {
          setAlreadyJoined(true);
          setLaunchpadRegistrationPower(power);
        } else {
          setAlreadyJoined(false);
        }
      }
    } catch (error) {
      setAlreadyJoined(false);
    }
  };

  const getLaunchpadRegistration = useCallback(async () => {
    const url = process.env.REACT_APP_JOIN_LAUNCHPAD_API;
    try {
      if (url && walletAddress) {
        const res = await fetch(
          `${url}/walletAddress?walletAddress=${walletAddress}`,
          {
            method: 'GET',
          },
        );

        const result = await res.json();
        if (result.walletAddress && result.totalPower) {
          setAlreadyJoined(true);
          setLaunchpadRegistrationPower(result.totalPower);
        } else {
          setAlreadyJoined(false);
        }
      }
    } catch (error) {
      setAlreadyJoined(false);
    }
  }, [walletAddress]);

  const chainChange = async () => {
    await changeChain(ChainsIds.TLC);
  };

  const getTotalSelfTransactions = async (addressHash: string) => {
    const total = await getTotalNumberOfTxByAddress(addressHash);
    setTotalSelfTransactionsCount(total);
  };

  useEffect(() => {
    if (walletAddress) {
      console.log('WORKING');
      getTotalSelfTransactions(walletAddress);
    }
  }, [walletAddress]);

  useEffect(() => {
    chainChange();
  }, []);

  useEffect(() => {
    let p = TLXPower + TLCPower;
    if (p > 100) {
      p = 100;
    }

    setPower(parseFloat(p.toFixed(4)));
  }, [TLXPower, TLCPower]);

  useEffect(() => {
    //@ts-ignore
    if (state && state.comingFromLaunchpad) {
      setShowLaunchpadRegistration(true);
    }
  }, [state]);

  useEffect(() => {
    getLaunchpadRegistration();
  }, [getLaunchpadRegistration, walletAddress]);

  useEffect(() => {
    if (currentChainId === ChainsIds.TLC) {
      setChainErrorMessage(undefined);
    } else {
      setChainErrorMessage('Please connect to TLChain Mainnet');
    }
  }, [currentChainId]);

  const getValueLocked = useCallback(async () => {
    if (TLCStakeContract && TLXStakeContract && LSOStakeContract) {
      const tlcStaked = await getTotalValueLocked(TLCStakeContract);
      const tlxStaked = await getTotalValueLocked(TLXStakeContract);
      const lsoStaked = await getTotalValueLocked(LSOStakeContract);

      setTotalTLCStaked(parseFloat(tlcStaked.toFixed(1)).toLocaleString());
      setTotalTLXStaked(parseFloat(tlxStaked.toFixed(1)).toLocaleString());
      setTotalLSOStaked(parseFloat(lsoStaked.toFixed(1)).toLocaleString());

      const valueLocked = 0.16 * tlcStaked + 40 * tlxStaked + 0.07 * lsoStaked;

      setTotalValueLocked(parseFloat(valueLocked.toFixed(1)).toLocaleString());
    }
  }, [LSOStakeContract, TLCStakeContract, TLXStakeContract]);

  const getTotalRewards = useCallback(async () => {
    if (TLCStakeContract && TLXStakeContract && LSOStakeContract) {
      const totalTLCRewards = await TLCStakeContract.getTotalRewards();
      const totalTLXRewards = await TLXStakeContract.getTotalRewards();
      const totalLSORewards = await LSOStakeContract.getTotalRewards();

      const rewards = parseFloat(
        parseFloat(
          ethers.utils.formatEther(totalTLCRewards) +
            ethers.utils.formatEther(totalTLXRewards) +
            ethers.utils.formatEther(totalLSORewards),
        ).toFixed(1),
      ).toLocaleString();

      setTotalRewards(rewards);
    }
  }, [LSOStakeContract, TLCStakeContract, TLXStakeContract]);

  useEffect(() => {
    getValueLocked();
    getTotalRewards();
  }, [getTotalRewards, getValueLocked]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
        // window.location.reload();
      });

      if (window.ethereum?.networkVersion) {
        setCurrentChainId(
          ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum?.networkVersion]);

  return (
    <div className="w-full mt-2">
      <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 grid-cols-2 gap-y-4 bg-black bg-opacity-70 w-full items-center justify-between px-4 py-1 rounded-xl">
        <div className="flex col-span-1 h-full items-center space-x-12 md:space-x-4 lg:space-x-3">
          {/* {!isMobileSize && (
            <div className="lg:hidden xl:hidden">
              <p>Universe</p>
              <div className="h-1/3 w-[0.1rem] bg-gray-500 rounded-md" />
            </div>
          )} */}
          <div className="flex space-x-2">
            <img src={WalletPng} className="h-10 w-10" />
            <div className="">
              <p className="text-sm font-bold text-gray-500">
                Total Value Locked
              </p>
              {totalValueLocked && (
                <p className="text-lg font-medium">${totalValueLocked}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <EarningsIcon />
            <div className="">
              <p className="text-sm font-bold text-gray-500">Earnings</p>
              {totalRewards && (
                <p className="text-lg font-medium">${totalRewards}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex col-span-1 space-x-16 lg:space-x-8 h-full items-center">
          <div className="flex items-center space-x-2">
            <StakedFileIcon />
            <div className="">
              <p className="text-sm font-bold text-gray-500">$TLX Staked</p>
              {totalTLXStaked && (
                <p className="text-lg font-medium">${totalTLXStaked}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StakedFileIcon />
            <div className="">
              <p className="text-sm font-bold text-gray-500">$TLC Staked</p>
              {totalTLCStaked && (
                <p className="text-lg font-medium">${totalTLCStaked}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <StakedFileIcon />
            <div className="">
              <p className="text-sm font-bold text-gray-500">$LSO Staked</p>
              {totalLSOtaked && (
                <p className="text-lg font-medium">${totalLSOtaked}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mt-3 gap-x-2 gap-y-4">
        <div className="col-span-3 xs:col-span-1 sm:col-span-1 md:col-span-1 px-2 flex flex-col justify-center ">
          <div className="grid grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-2 justify-between gap-x-3 gap-y-4">
            <DailyInfoComponent />
            {/* <AnalysisComponent coinTag={'TLC'} /> */}
            <div className="flex" onClick={() => navigate('/launchpad/LSO')}>
              <ProjectElement coinTag={'LSO'} />
            </div>
            <AnalysisComponent coinTag={'TLX'} />
          </div>
          <div className="grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-x-16 gap-y-6 bg-black bg-opacity-70 mt-4 rounded-xl justify-between py-4 px-6">
            <CryptoCityComponent />
          </div>
        </div>
        <div className="col-span-1 xs:col-span-1 sm:col-span-1 flex flex-col w-full bg-black bg-opacity-70 p-4 rounded-xl">
          <div className="flex flex-col space-y-3 bg-[#171726] shadow-innerWhite rounded-xl py-4 pl-4">
            <div className="flex justify-between items-center ">
              <p>Personal Account Status</p>

              <span className="flex items-center justify-between px-2 py-1 bg-yellow-900 bg-opacity-75 text-powerYellow rounded-l-lg">
                5 stars <AiFillStar size={25} color="yellow" />
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex flex-[0.6] items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-1 rounded-lg">
                  <TimeIcon />
                </div>
                <div className="">
                  <p className="text-xs text-gray-500">Times</p>
                  <p>1 year</p>
                </div>
              </div>
              <div className="flex flex-[0.4] items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-1 rounded-lg">
                  <RankIcon />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rank</p>
                  <p>A</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-[0.6] items-center space-x-2">
                <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 p-1 rounded-lg">
                  <LoanIcon />
                </div>
                <div className="">
                  <p className="text-xs text-gray-500">Transactions</p>
                  {totalSelfTransactionsCount && (
                    <p>{totalSelfTransactionsCount}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-[0.4] items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-800 p-1 rounded-lg">
                  <DebtIcon />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bad Reports</p>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col relative items-center mt-6">
            <div className="flex relative flex-col w-full h-36 bg-[#171726] shadow-innerWhite rounded-xl pl-4 z-30">
              <img
                src={communityBond}
                className="absolute bottom-0 right-0 z-0"
              />
              <p className="absolute -top-4 bg-[#171726] px-2 py-1 rounded-xl drop-shadow-lg shadow-lg text-xs">
                Community Bond
              </p>
              <div className="flex justify-between items-center z-30">
                <div>
                  <div className="flex space-x-2 mt-4 items-center">
                    <OfferIcon />
                    <p>Offer</p>
                  </div>
                  <div className="flex space-x-2">
                    <p>$LSO 10000</p>
                    <p>+</p>
                    <p className="text-sm text-[#5EFF5A]">1000</p>
                  </div>
                </div>
                <div className="px-2 py-1 text-[#5EFF5A] bg-green-800 bg-opacity-75 rounded-l-lg">
                  Interest 10%
                </div>
                {/* <span className="px-2 py-1 bg-yellow-900 bg-opacity-75 text-powerYellow rounded-l-lg">
                  5 stars
                </span> */}
              </div>
              <div className="pr-4 z-30">
                <div className="w-full bg-green-600 bg-opacity-30 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full"
                    style={{ width: '80%' }}
                  ></div>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <p>1 month left</p>
                    <p>15/04/2022</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex absolute top-4 w-3/4 flex-col h-36 bg-gradient-to-r from-purple-600 to-pink-400 shadow-innerWhite rounded-xl pl-4 z-20 drop-shadow-lg">
              <img src={communityBond2} className="absolute bottom-0 left-0 " />
            </div>
            <div className="flex absolute top-8 w-1/2 flex-col h-36 bg-gradient-to-r from-blue-500 to-green-500 shadow-innerWhite rounded-xl pl-4 z-10 drop-shadow-lg">
              <img
                src={communityBond3}
                className="absolute bottom-0 right-0 "
              />
            </div>
          </div>
          <button className="bg-[#52FEFD] rounded-lg py-2 text-black mt-10">
            Coming Soon
          </button>
          <div className="flex relative flex-col w-full h-40 bg-[#171726] shadow-innerWhite rounded-xl pl-4 pt-2 z-30 mt-4">
            <div className="flex justify-between items-center ">
              <div>
                <div className="flex space-x-2 mt-4">
                  <p>$LSO 10000</p>
                  <p>+</p>
                  <p className="text-sm text-[#5EFF5A]">1000</p>
                </div>
              </div>
              <div className="px-2 py-1 text-[#5EFF5A] bg-green-800 bg-opacity-75 rounded-l-lg">
                Interest 10%
              </div>
              {/* <span className="px-2 py-1 bg-yellow-900 bg-opacity-75 text-powerYellow rounded-l-lg">
                  5 stars
                </span> */}
            </div>
            <div className="flex space-x-8 mt-2 items-center">
              <div className="flex flex-col items-center justify-center">
                <div className="flex  space-x-1">
                  <OfferIcon />
                  <p className="text-sm text-gray-400">Offer</p>
                </div>
                <p className="text-xs">LUSSO</p>
              </div>
              <div className="flex flex-col  justify-center">
                <div className="flex  space-x-1">
                  <OfferIcon />
                  <p className="text-sm text-gray-400">Reward</p>
                </div>
                <p className="text-xs">$1000/week</p>
              </div>
              <div className="flex flex-col  justify-center">
                <div className="flex  space-x-1">
                  <OfferIcon />
                  <p className="text-sm text-gray-400">Term Bond</p>
                </div>
                <p className="text-xs">3 months</p>
              </div>
            </div>
            <div className="pr-4 z-30">
              <div className="w-full bg-green-600 bg-opacity-30 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full"
                  style={{ width: '80%' }}
                ></div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <p>1 month left</p>
                  <p>15/04/2022</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col relative items-center mt-6">
            <div className="flex relative flex-col w-full h-36 bg-gradient-to-r from-blue-500 to-green-500 shadow-innerWhite rounded-xl pl-4 z-30 overflow-hidden">
              <img
                src={communityBond3}
                className="absolute top-0 right-0 z-10"
              />

              <div className="flex justify-between items-center ">
                <div className="w-full mt-2">
                  <div className="flex w-full items-center justify-between">
                    <p>@username</p>
                    <div>
                      <Switch
                        className="mr-2"
                        checked={switchChecked}
                        onChange={() => setSwitchChecked(!switchChecked)}
                        // onChange={this.handleChange}
                        // checked={this.state.checked}
                      />
                    </div>
                  </div>
                  <div className="flex w-full mt-1 items-center justify-between text-lg pr-4">
                    <p>$62,786</p>
                    <EyeIcon />
                  </div>
                  <div className="flex w-full justify-between items-center z-30 pr-2 mt-4 text-sm">
                    <button className="flex flex-[0.45] space-x-2 justify-center items-center bg-black rounded-lg px-2 py-2">
                      <p>Top up</p>
                      {/* <LoanIcon /> */}
                    </button>
                    <button className="flex flex-[0.45] space-x-2 justify-center items-center bg-black rounded-lg px-2 py-2 z-30">
                      <p>Withdraw</p>
                      {/* <LoanIcon /> */}
                    </button>
                  </div>
                </div>

                {/* <span className="px-2 py-1 bg-yellow-900 bg-opacity-75 text-powerYellow rounded-l-lg">
                  5 stars
                </span> */}
              </div>
            </div>
            <div className="flex absolute top-4 w-3/4 flex-col h-36 bg-gradient-to-r from-purple-600 to-pink-400 shadow-innerWhite rounded-xl pl-4 z-20 drop-shadow-lg">
              <img src={communityBond2} className="absolute bottom-0 left-0" />
            </div>
            <div className="flex absolute top-8 w-1/2 flex-col h-36 bg-gradient-to-r from-blue-500 to-green-500 shadow-innerWhite rounded-xl pl-4 z-10 drop-shadow-lg">
              <img
                src={communityBond3}
                className="absolute bottom-0 right-0 "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DHS;
