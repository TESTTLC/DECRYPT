import { useEffect } from 'react';
import Web3Modal, { IProviderOptions } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { setWalletAddress } from 'src/redux/modules/account/actions';
import { setProvider } from 'src/redux/modules/globals/actions';
import { StoreState } from 'src/utils/storeTypes';

import { useWindowSize } from './useWindowSize';

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        5177: 'https://mainnet-rpc.tlxscan.com/',
      },
    },
  },
};

export const useWalletConnector = () => {
  const dispatch = useDispatch();

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const { isMobileSize } = useWindowSize();
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
    theme: 'dark',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribeProvider = async (providerConnection: any) => {
    if (providerConnection) {
      providerConnection.on('accountsChanged', (accounts: string[]) => {
        console.log('1: ', accounts);
      });

      // Subscribe to chainId change
      providerConnection.on('chainChanged', (chainId: number) => {
        console.log('Chain changed: ', chainId);
      });

      // Subscribe to p connection
      providerConnection.on('connect', (info: { chainId: number }) => {
        console.log('Info 3: ', info);
      });
      // Subscribe to p disconnection
      providerConnection.on(
        'disconnect',
        (error: { code: number; message: string }) => {
          web3Modal.clearCachedProvider();
          dispatch(setWalletAddress(undefined));
          console.log('Error: ', error);
        },
      );
    }
  };

  const connectWallet = async () => {
    const connection = await web3Modal.connect();

    subscribeProvider(connection);
    const p = new ethers.providers.Web3Provider(connection);
    dispatch(setProvider(p));
    const signer = p.getSigner();
    const accountAddress = await signer.getAddress();
    dispatch(setWalletAddress(accountAddress));
    localStorage.setItem('account', accountAddress);
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    dispatch(setWalletAddress(undefined));
    console.log('disconnected');
    localStorage.removeItem('account');
  };

  const enableWindowEthereum = async () => {
    if (window.ethereum) {
      try {
        //@ts-ignore
        const ethAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (ethAccounts && web3Modal.cachedProvider) {
          const connection = await web3Modal.connect();
          const p = new ethers.providers.Web3Provider(connection);
          dispatch(setProvider(p));
          dispatch(setWalletAddress(ethAccounts[0]));
          localStorage.setItem('account', ethAccounts[0]);
          return true;
        }
      } catch (err) {
        console.log('user did not add account...', err);
      }
    }
    return false;
  };

  const initialize = async () => {
    const localStorageAccount = localStorage.getItem('account');

    if (isMobileSize) {
      if (web3Modal.cachedProvider && localStorageAccount) {
        const connection = await web3Modal.connect();
        const p = new ethers.providers.Web3Provider(connection);
        dispatch(setProvider(p));
        const signer = p.getSigner();
        const userAccountAddress = await signer.getAddress();
        dispatch(setWalletAddress(userAccountAddress));
      }
    } else {
      const ethEnabled = await enableWindowEthereum();
      if (ethEnabled) {
        const connection = await web3Modal.connect();
        const p = new ethers.providers.Web3Provider(connection);
        dispatch(setProvider(p));
      }
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isMobileSize,
    web3Modal,
    walletAddress,
    connectWallet,
    disconnectWallet,
    cachedProvider: web3Modal.cachedProvider,
  };
};
