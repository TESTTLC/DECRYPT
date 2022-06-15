import { useEffect } from 'react';
import { ethers } from 'ethers';
import { setWalletAddress } from 'src/redux/modules/account/actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import { setProvider } from 'src/redux/modules/globals/actions';

import { useDeviceInfo } from './useDeviceInfo';
import { useWindowSize } from './useWindowSize';

export const useWalletConnector = () => {
  const dispatch = useDispatch();
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const { isMobileDevice } = useDeviceInfo();
  const { isMobileSize } = useWindowSize();

  useEffect(() => {
    checkIfWalletConnected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfWalletConnected = async () => {
    if (window.ethereum && localStorage.getItem('walletAddress')) {
      //@ts-ignore
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length) {
        dispatch(setWalletAddress(accounts[0]));
        //@ts-ignore
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        dispatch(setProvider(web3Provider));
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Get metamask!');

      return;
    }
    //@ts-ignore
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    dispatch(setWalletAddress(accounts[0]));

    //@ts-ignore
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

    dispatch(setProvider(web3Provider));
    localStorage.setItem('walletAddress', accounts[0]);
  };

  const disconnectWallet = async () => {
    if (localStorage.getItem('walletAddress')) {
      localStorage.removeItem('walletAddress');
    }

    dispatch(setWalletAddress(undefined));
    dispatch(setProvider(undefined));
  };

  return {
    isMobileDevice,
    isMobileSize,
    walletAddress,
    connectWallet,
    disconnectWallet,
    provider,
  };
};
