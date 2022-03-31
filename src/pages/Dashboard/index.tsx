/* eslint-disable no-nested-ternary */
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { joinLaunchpadApi } from 'src/api';
import BatteryStatus from 'src/components/BatteryStatus';
import { StoreState } from 'src/utils/storeTypes';
import dotenv from 'dotenv';
import { changeChain } from 'src/utils/functions/MetaMask';

import { useContracts } from '../../hooks/useContracts';
import {
  determinePowerForStake,
  getUserStakes,
} from '../../utils/functions/Contracts';
import { ChainsIds, Stake } from '../../utils/types';

dotenv.config();

const Dashboard: React.FC = () => {
  const { state } = useLocation();
  const { stakeContract: TLXStakeContract } = useContracts('TLX');
  const { stakeContract: TLCStakeContract } = useContracts('TLC');
  const navigate = useNavigate();
  const walletAddress = useSelector<StoreState, string | undefined>(
    (reduxState) => reduxState.account.walletAddress,
  );
  const [showLaunchpadRegistration, setShowLaunchpadRegistration] =
    useState(false);

  const [powerColor, setPowerColor] = useState('red-400');
  const [TLXPower, setTLXPower] = useState(0);
  const [TLCPower, setTLCPower] = useState(0);
  const [totalTLXStaked, setTotalTLXStaked] = useState(0);
  const [totalTLCStaked, setTotalTLCStaked] = useState(0);
  const [power, setPower] = useState(0);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [chainErrorMessage, setChainErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [launchpadRegistrationPower, setLaunchpadRegistrationPower] =
    useState(0);

  const [currentChainId, setCurrentChainId] = useState(
    //@ts-ignore
    window.ethereum?.networkVersion
      ? //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
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
        setTotalTLXStaked(parseFloat(currentAmout.toFixed(3)));
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
        setTotalTLCStaked(parseFloat(currentAmout.toFixed(3)));
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
            tlcStake: totalTLCStaked,
            tlxStake: totalTLXStaked,
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

  useEffect(() => {
    if (window.ethereum) {
      //@ts-ignore
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
        // window.location.reload();
      });

      //@ts-ignore
      if (window.ethereum?.networkVersion) {
        setCurrentChainId(
          //@ts-ignore
          ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    //@ts-ignore
  }, [window.ethereum?.networkVersion]);

  return (
    <div className="px-2 w-full flex flex-col justify-center">
      <p className="text-white font-bold text-2xl mb-4">Dashboard</p>
      <div className="flex flex-col items-center w-full">
        {chainErrorMessage && (
          <p className="mb-2 text-red-400 text-lg">{chainErrorMessage}</p>
        )}

        <div className="w-full grid gap-y-4 2xl:gap-x-8 xl:gap-x-8 lg:gap-x-8 grid-cols-7 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1">
          <div className="flex w-full col-span-2 flex-col h-96 bg-black opacity-70 justify-center items-center">
            <p className="text-white font-poppins font-bold text-2xl mb-4">
              1 Project
            </p>
            <p className="text-white font-poppins font-bold text-2xl mb-4">
              {totalTLCStaked > 0 && totalTLXStaked > 0
                ? '2'
                : totalTLXStaked > 0 || totalTLCStaked > 0
                ? '1'
                : '0'}{' '}
              Tokens
            </p>
          </div>

          <div className="w-full relative flex justify-center items-center col-start-3 col-span-5 md:col-span-1 sm:col-span-1 xs:col-span-1 h-96 bg-black opacity-70 px-2">
            <div className="absolute right-4 top-4">
              <BatteryStatus power={power} powerColor={powerColor} />
            </div>
            <div className="w-full grid grid-cols-3">
              <div className="text-center text-white text-2xl font-semibold font-poppins">
                You staked{' '}
                <p style={{ color: powerColor }}>{totalTLXStaked} TLX</p>
              </div>
              <div className="flex flex-col justify-center text-center text-white text-2xl font-semibold font-poppins">
                Total power <p style={{ color: powerColor }}>{power}%</p>
              </div>
              <div className="text-center text-white text-2xl font-semibold font-poppins">
                You staked{' '}
                <p style={{ color: powerColor }}>{totalTLCStaked} TLC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLaunchpadRegistration && currentChainId === ChainsIds.TLC && (
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <div className="relative self-center flex flex-col items-center justify-center w-[36rem] xs:w-[22rem] min-h-20 px-8 xs:px-2 sm:px-4 py-4 rounded-lg bg-black bg-opacity-60 text-white text-center my-1">
            <span className="text-sm w-full text-center">
              A single registration is required for access to the Decryption
              Launchpad. TLX or TLC must be staked in order to utilize
              Decryption Power. If you do not have one or two assets staked,{' '}
              <span
                className="underline text-green-500 cursor-pointer"
                onClick={() => navigate('/dex')}
              >
                click here
              </span>{' '}
              to purchase TLC, stake your coins, and return to Launchpad.
            </span>
            {alreadyJoined && (
              <span className="text-md w-full text-center text-green-500 mt-4">
                You joined the launchpad with {launchpadRegistrationPower}%
                power
              </span>
            )}

            <div className="relative self-center flex items-center justify-center w-full min-h-20 px-2 xs:px-2 sm:px-4 py-4 text-center my-1">
              <div className="flex flex-col items-center justify-center text-sm flex-[0.5]">
                {/* <span>$1.434.241</span> */}
                <button
                  className="flex w-full h-10 mt-2 text-sm items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                  onClick={() => navigate('/staking')}
                >
                  Stake
                </button>
              </div>
              {!alreadyJoined && (
                <>
                  <div className="w-[1px] bg-gray-400 h-16 mx-3"></div>
                  <div className="flex flex-col items-center justify-center text-sm flex-[0.5]">
                    <button
                      className="flex  w-full h-10 mt-2 text-sm items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                      onClick={joinLaunchpad}
                    >
                      Join the Launchpad
                    </button>
                    {/* <span>1 TLC = $0.0625</span>
              <span>Market Cap: $1.240.062</span>
              <span>Est. Weekly Rewards: $25.254</span> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
