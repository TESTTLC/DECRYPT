import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPower } from 'src/redux/modules/account/actions';
import { getLSOLaunchpadRegistrationThunk } from 'src/redux/modules/launchpad/actions';
import {
  determinePowerForStake,
  getUserStakes,
} from 'src/utils/functions/Contracts';
import { StoreState } from 'src/utils/storeTypes';

import { Stake } from '../utils/types';

import { useContracts } from './useContracts';

export const useCachedResources = () => {
  const dispatch = useDispatch();

  const walletAddress = useSelector<StoreState, string | undefined>(
    (reduxState) => reduxState.account.walletAddress,
  );
  if (walletAddress) {
    dispatch(getLSOLaunchpadRegistrationThunk({ walletAddress }));
  }
};
