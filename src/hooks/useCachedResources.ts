import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPower } from 'src/redux/modules/account/actions';
import {
  determinePowerForStake,
  getUserStakes,
  webStake,
} from 'src/utils/functions/Contracts';
import { StoreState } from 'src/utils/storeTypes';

import { Stake } from '../utils/types';

import { useContracts } from './useContracts';

export const useCachedResources = () => {
  const [TLXPower, setTLXPower] = useState(0);
  const [TLCPower, setTLCPower] = useState(0);
  const dispatch = useDispatch();
  const [power, setPower] = useState(0);

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const totalPower = useSelector<StoreState, number>(
    (state) => state.account.totalPower,
  );

  const { stakeContract: TLXStakeContract } = useContracts('TLX');
  const { stakeContract: TLCStakeContract } = useContracts('TLC');

  const getStakes = async (powerCoin: 'TLX' | 'TLC') => {
    // let currentAmout = 0;
    let currentPower = 0;
    let usedStakeContract;
    if (powerCoin === 'TLX' && TLXStakeContract) {
      usedStakeContract = TLXStakeContract;
    } else if (powerCoin === 'TLC' && TLCStakeContract) {
      usedStakeContract = TLCStakeContract;
    }
    if (usedStakeContract) {
      const stakes = (await getUserStakes(usedStakeContract)) || [];
      stakes.forEach((stake: Stake) => {
        // currentAmout += parseFloat(ethers.utils.formatEther(stake.amount));
        currentPower += determinePowerForStake(
          parseFloat(ethers.utils.formatEther(stake.amount)),
          stake.period.toNumber(),
          powerCoin,
        );
      });

      if (powerCoin === 'TLX') {
        setTLXPower(currentPower);
      } else if (powerCoin === 'TLC') {
        setTLCPower(currentPower);
      }
    }
  };

  useEffect(() => {
    let p = TLXPower + TLCPower;
    if (p > 100) {
      p = 100;
    }
    setPower(parseFloat(p.toFixed(4)));
    if (parseFloat(p.toFixed(4)) !== totalPower) {
      dispatch(setTotalPower(parseFloat(p.toFixed(4))));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TLXPower, TLCPower]);

  useEffect(() => {
    if (TLXPower === 0) {
      getStakes('TLX');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TLXStakeContract]);

  useEffect(() => {
    if (TLCPower === 0) {
      getStakes('TLC');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TLCStakeContract]);

  useEffect(() => {
    // dispatch(getUserInfo)
  });
};
