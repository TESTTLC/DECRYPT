import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useLocation } from 'react-router-dom';

import * as contracts from '../utils/functions/Contracts';
import { useContracts } from '../hooks/useContracts';
import SNXStatBackground from '../assets/svg/snx-stat-background.svg';

interface Props {
  coinTag: 'TLX' | 'TLC' | 'LSO' | 'CSY' | 'OldLSO' | 'OldCSY' | 'OldTLX';
  totalRewards: number;
}

const Stats: React.FC<Props> = ({ coinTag, totalRewards }) => {
  const location = useLocation();

  const { stakeContract, tokenContract } = useContracts(coinTag);
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const [totalStaked, setTotalStaked] = useState(0);
  const [balance, setBalance] = useState<number>();

  const getUserTLCBalance = async () => {
    if (walletAddress) {
      let chain: 'new' | 'old' = 'new';
      if (location.pathname.includes('/old')) {
        chain = 'old';
      }
      const TLCBalance = await contracts.getTLCBalance(walletAddress, chain);
      setBalance(TLCBalance);
    }
  };

  useEffect(() => {
    if (coinTag === 'TLC') {
      getUserTLCBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, coinTag]);

  const getTotalStaked = async () => {
    try {
      if (stakeContract) {
        const total = await contracts.getTotalValueLocked(stakeContract);
        const rewards = await stakeContract.getTotalRewards();
        console.log('Rewards: ', formatEther(rewards.toString()));
        setTotalStaked(total);
      }
    } catch (error) {}
  };

  const getUserTLXBalance = useCallback(async () => {
    if (walletAddress && coinTag !== 'TLC') {
      const result =
        coinTag === 'LSO' ||
        coinTag === 'CSY' ||
        coinTag === 'OldLSO' ||
        coinTag === 'OldCSY'
          ? await contracts.getBalance(tokenContract, walletAddress)
          : await contracts.getActualBalanceOf(tokenContract, walletAddress);
      setBalance(result);
    }
  }, [coinTag, tokenContract, walletAddress]);

  const calculateStakeRewards = useCallback(async () => {
    if (stakeContract) {
      // const stakes = await contracts.getUserStakes(stakeContract);
      // const rewards = await contracts.calculateStakeRewards(
      //   stakeContract,
      //   stakes
      // );
      // setUserRewards(rewards);
    }
  }, [stakeContract]);

  useEffect(() => {
    getTotalStaked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeContract]);

  useEffect(() => {
    calculateStakeRewards();
    if (stakeContract) {
      contracts.getTotalValueLocked(stakeContract);
    }
  }, [calculateStakeRewards, stakeContract]);

  useEffect(() => {
    if (tokenContract) {
      getUserTLXBalance();
    }
  }, [getUserTLXBalance, tokenContract]);

  return (
    <div className="grid grid-cols-3 w-full my-20 justify-center items-center ">
      <div className="flex flex-col justify-center items-center">
        <div
          className="absolute bg-cover h-24 w-32 opacity-0 "
          style={{ backgroundImage: `url(${SNXStatBackground})` }}
        ></div>

        <p className="text-white text-center text-sm font-oswald uppercase">
          Total Value locked
        </p>
        <div>
          <p className="text-white font-bold text-lg drop-shadow-2xl shadow-white">
            {walletAddress ? totalStaked : '-'} {coinTag}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div
          className="absolute bg-cover h-32 w-48 opacity-0 "
          style={{ backgroundImage: `url(${SNXStatBackground})` }}
        ></div>
        <p className="text-white text-center text-sm font-oswald uppercase">
          Your Total Rewards
        </p>
        <p className="text-white font-bold text-lg drop-shadow-2xl shadow-white">
          {walletAddress ? totalRewards : '-'} {coinTag}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div
          className="absolute bg-cover h-24 w-32 opacity-0 "
          style={{ backgroundImage: `url(${SNXStatBackground})` }}
        ></div>
        <p className="text-white text-center text-sm font-oswald uppercase">
          Your Balance
        </p>
        <p className="text-white font-bold text-lg drop-shadow-2xl shadow-white">
          {walletAddress ? balance : '-'} {coinTag}
        </p>
      </div>
    </div>
  );
};

export default Stats;
