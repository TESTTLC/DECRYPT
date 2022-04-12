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
  }, [dispatch, window.localStorage]);

  // const checkUserData = () => {
  //   try {
  //     const localStorageUserItem = window.localStorage.getItem('user');
  //     const headerPayloadCookie = cookies.get(headerPayloadName);
  //     const headerpayloadDecoded: { user: Partial<BaseUser> } =
  //       jwtDecode(headerPayloadCookie);
  //     console.log('HeaderPayloadDecoded: ', headerpayloadDecoded);
  //     const headerpayloadUser = headerpayloadDecoded.user;
  //     const localStorageUser = JSON.parse(localStorageUserItem || '{}');
  //     if (
  //       localStorageUser &&
  //       headerpayloadUser &&
  //       localStorageUser.id === headerpayloadUser.id
  //     ) {
  //       dispatch(setAccountData({ ...localStorageUser }));
  //     } else {
  //       window.localStorage.clear();
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   checkUserData();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cookies, dispatch, localStorage]);

  return { isLoading, isActivated, isLoggedIn, dispatch };
};
