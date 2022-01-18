import { useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { useWindowSize } from "./useWindowSize";
import { useGlobalContext } from "../utils/context";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,

    options: {
      rpc: {
        5177: "https://mainnet-rpc.tlxscan.com",
      },
      infuraId: "ecce1e30e55349abbac0be46d97dd143",
    },
  },
};

export const useWalletConnector = () => {
  const { provider, setProvider, setAccount, account } = useGlobalContext();
  const { isMobile } = useWindowSize();
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
    theme: "dark",
  });

  const subscribeProvider = async (providerConnection: any) => {
    if (providerConnection) {
      providerConnection.on("accountsChanged", (accounts: string[]) => {
        console.log("1: ", accounts);
      });

      // Subscribe to chainId change
      providerConnection.on("chainChanged", (chainId: number) => {
        console.log("2: ", chainId);
      });

      // Subscribe to p connection
      providerConnection.on("connect", (info: { chainId: number }) => {
        console.log("Info 3: ", info);
      });
      // Subscribe to p disconnection
      providerConnection.on(
        "disconnect",
        (error: { code: number; message: string }) => {
          web3Modal.clearCachedProvider();
          setAccount(undefined);
        }
      );
    }
  };

  const connectWallet = async () => {
    const connection = await web3Modal.connect();

    subscribeProvider(connection);
    const p = new ethers.providers.Web3Provider(connection);
    setProvider(p);
    const signer = p.getSigner();
    const accountAddress = await signer.getAddress();
    setAccount(accountAddress);
    localStorage.setItem("account", accountAddress);
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    setAccount(undefined);
    console.log("disconnected");
    localStorage.removeItem("account");
  };

  const enableWindowEthereum = async () => {
    if (window.ethereum) {
      try {
        const ethAccounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (ethAccounts && web3Modal.cachedProvider) {
          const connection = await web3Modal.connect();
          const p = new ethers.providers.Web3Provider(connection);
          setProvider(p);
          setAccount(ethAccounts[0]);
          localStorage.setItem("account", ethAccounts[0]);
          return true;
        }
      } catch (err) {
        console.log("user did not add account...", err);
      }
    }
    return false;
  };

  const initialize = async () => {
    const localStorageAccount = localStorage.getItem("account");

    if (isMobile) {
      if (web3Modal.cachedProvider && localStorageAccount) {
        const connection = await web3Modal.connect();
        const p = new ethers.providers.Web3Provider(connection);
        setProvider(p);
        // subscribeProvider(p.connection);
        const signer = p.getSigner();
        const userAccountAddress = await signer.getAddress();
        setAccount(userAccountAddress);
      }
    } else {
      const ethEnabled = await enableWindowEthereum();
      if (ethEnabled) {
        const connection = await web3Modal.connect();
        const p = new ethers.providers.Web3Provider(connection);
        setProvider(p);
      }
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return {
    isMobile,
    web3Modal,
    account,
    connectWallet,
    disconnectWallet,
    cachedProvider: web3Modal.cachedProvider,
  };
};
