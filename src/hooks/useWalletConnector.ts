import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDeviceInfo } from "./useDeviceInfo";
import { useWindowSize } from "./useWindowSize";

import { ethers } from "ethers";
import { useGlobalContext } from "../utils/context";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useWalletConnector = () => {
  const { provider, setProvider, setAccount, account } = useGlobalContext();
  const { isMobileDevice } = useDeviceInfo();
  const { isMobileSize } = useWindowSize();

  // https://metamask.app.link/dapp/decryption.com
  // https://metamask.app.link/dapp/localhost:3000

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  useEffect(() => {
    if (account) {
      // onAddressChanged(account)
    }
  }, [account]);

  const checkIfWalletConnected = async () => {
    if (window.ethereum && localStorage.getItem("account")) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAccount(accounts[0]);
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
      }
      // if (isMobileDevice) {
      //   await connectWallet();
      // }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Get metamask!");

      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(web3Provider);
    localStorage.setItem("account", accounts[0]);
  };

  const disconnectWallet = async () => {
    if (localStorage.getItem("account")) {
      localStorage.removeItem("account");
    }
    setAccount(undefined);
    setProvider(undefined);
  };

  return {
    isMobileDevice,
    isMobileSize,
    account,
    connectWallet,
    disconnectWallet,
    provider,
  };
};
