import { useAuth0 } from '@auth0/auth0-react';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAccountData,
  setIsLoggedIn,
  setWalletAddress,
} from 'src/redux/modules/account/actions';
import {
  openSidebar,
  setIsLoading,
  setProvider,
} from 'src/redux/modules/globals/actions';
import { getLSOLaunchpadRegistrationThunk } from 'src/redux/modules/launchpad/actions';
import {
  isUserInLocalStorage,
  addUserInLocalStorage,
} from 'src/utils/functions/LocalStorage';
import { StoreState } from 'src/utils/storeTypes';

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

  if (walletAddress) {
    dispatch(getLSOLaunchpadRegistrationThunk({ walletAddress }));
  }

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
      const foundUser = JSON.parse(user);
      dispatch(setAccountData({ ...foundUser }));
    } else {
      window.localStorage.clear();
    }
  }, [dispatch]);

  // const loadUserInfo = async () => {
  //   if (isUserInLocalStorage()) {
  //     dispatch(setIsLoggedIn(true));
  //   } else {
  //     dispatch(setIsLoggedIn(false));
  //   }
  //   dispatch(setIsLoading(false));
  // };

  // const updateUser = useCallback(() => {
  //   if (user) {
  //     const storageUser = {
  //       name: user.name,
  //       email: user.email,
  //       profilePic: user.profile,
  //     };
  //     addUserInLocalStorage(storageUser);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   updateUser();
  // }, [updateUser, user]);

  // useEffect(() => {
  //   loadUserInfo();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated]);

  return { isLoading, isLoggedIn, dispatch };
};
