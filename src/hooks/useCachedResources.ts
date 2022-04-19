import { useAuth0 } from '@auth0/auth0-react';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAccountData,
  setIsLoggedIn,
  setWalletAddress,
} from 'src/redux/modules/account/actions';
import { getLSOLaunchpadRegistrationThunk } from 'src/redux/modules/launchpad/actions';
import { headerPayloadName } from 'src/utils/globals';
import { BaseUser, StoreState } from 'src/utils/storeTypes';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import { useDeviceInfo } from './useDeviceInfo';
import { useWalletConnector } from './useWalletConnector';

export const useCachedResources = () => {
  useWalletConnector();
  const dispatch = useDispatch();
  const walletAddress = useSelector<StoreState, string | undefined>(
    (reduxState) => reduxState.account.walletAddress,
  );
  const isLoggedIn = useSelector<StoreState, boolean>(
    (reduxState) => reduxState.account.isLoggedIn,
  );
  const isLoading = useSelector<StoreState, boolean>(
    (reduxState) => reduxState.globals.isLoading,
  );
  const isActivated = useSelector<StoreState, boolean>(
    (reduxState) => reduxState.account.isActivated,
  );

  if (walletAddress) {
    dispatch(getLSOLaunchpadRegistrationThunk({ walletAddress }));
  }

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
      const foundUser = JSON.parse(user);
      dispatch(
        setAccountData({ ...foundUser, isLoading: false, isLoggedIn: true }),
      );
    } else {
      window.localStorage.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, window.localStorage]);

  return { isLoading, isActivated, isLoggedIn, dispatch };
};
