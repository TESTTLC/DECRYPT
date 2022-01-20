// import { Provider, useEffect, useState } from "react";
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { ethers } from "ethers";
// import { Signer } from "crypto";
// import { useWindowSize } from "./useWindowSize";
// import { useGlobalContext } from "../utils/context";

// // export const providerOptions = {
// //   walletconnect: {
// //     package: WalletConnectProvider,
// //     options: {
// //       infuraId: "ecce1e30e55349abbac0be46d97dd143", // required
// //     },
// //   },
// // };

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider,

//     options: {
//       // rpc: {
//       //   97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
//       // },
//       // network: "binance-testnet",
//       provider: "metamask",
//       rpc: {
//         56: "https://bsc-dataseed.binance.org/",
//       },
//       network: "binance",
//     },
//   },
// };

// export const useWalletConnector = () => {
//   const { provider, setProvider, setAccount, account } = useGlobalContext();
//   const { isMobile } = useWindowSize();
//   const web3Modal = new Web3Modal({
//     network: "binance-testnet", // optional
//     cacheProvider: true, // optional
//     providerOptions, // required
//     theme: "dark",
//   });

//   const subscribeProvider = async (providerConnection: any) => {
//     if (providerConnection) {
//       providerConnection.on("accountsChanged", (accounts: string[]) => {
//         console.log("1: ", accounts);
//       });

//       // Subscribe to chainId change
//       providerConnection.on("chainChanged", (chainId: number) => {
//         console.log("2: ", chainId);
//       });

//       // Subscribe to p connection
//       providerConnection.on("connect", (info: { chainId: number }) => {
//         console.log("Info 3: ", info);
//       });
//       // Subscribe to p disconnection
//       providerConnection.on(
//         "disconnect",
//         (error: { code: number; message: string }) => {
//           web3Modal.clearCachedProvider();
//           setAccount(undefined);
//         }
//       );
//     }
//   };

//   const connectWallet = async () => {
//     const connection = await web3Modal.connect();

//     subscribeProvider(connection);
//     const p = new ethers.providers.Web3Provider(connection);
//     setProvider(p);
//     const signer = p.getSigner();
//     setAccount(await signer.getAddress());
//   };

//   const disconnectWallet = async () => {
//     await web3Modal.clearCachedProvider();
//     setAccount(undefined);
//     console.log("disconnected");
//   };

//   const enableWindowEthereum = async () => {
//     if (window.ethereum) {
//       try {
//         const ethAccounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         if (ethAccounts && web3Modal.cachedProvider) {
//           setAccount(ethAccounts[0]);
//         }
//       } catch (err) {
//         console.log("user did not add account...", err);
//       }
//     }
//   };

//   const tryLogin = async () => {
//     if (isMobile) {
//       if (web3Modal.cachedProvider) {
//         const connection = await web3Modal.connect();
//         subscribeProvider(connection);
//         const p = new ethers.providers.Web3Provider(connection);
//         setProvider(p);
//         const signer = p.getSigner();
//         const userAccountAddress = await signer.getAddress();
//         setAccount(userAccountAddress);
//       }
//     } else {
//       enableWindowEthereum();
//     }
//   };

//   const reSetProvider = async () => {
//     const connection = await web3Modal.connect();
//     subscribeProvider(connection);
//     const p = new ethers.providers.Web3Provider(connection);
//     setProvider(p);
//   };

//   useEffect(() => {
//     tryLogin();
//   }, []);

//   useEffect(() => {
//     if (!provider) {
//       reSetProvider();
//     }
//   }, [provider, account]);

//   useEffect(() => {
//     console.log("web3Modal.cachedProvider: ", web3Modal.cachedProvider);
//   }, [web3Modal.cachedProvider]);

//   return {
//     isMobile,
//     web3Modal,
//     account,
//     connectWallet,
//     disconnectWallet,
//     cachedProvider: web3Modal.cachedProvider,
//   };
// };

import { useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";
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
  const walletConnectProvider = new WalletConnectProvider({
    chainId: 5177,
    rpc: {
      5177: "https://mainnet-rpc.tlxscan.com",
    },
    infuraId: "ecce1e30e55349abbac0be46d97dd143",
  });
  // const web3Modal = new Web3Modal({
  //   cacheProvider: true, // optional
  //   providerOptions, // required
  //   theme: "dark",
  // });

  //  Enable session (triggers QR Code modal)

  const subscribeProvider = async (providerConnection: any) => {
    if (providerConnection) {
      providerConnection.on("accountsChanged", (accounts: string[]) => {
        console.log("1: ", accounts);
      });

      // Subscribe to chainId change
      providerConnection.on("chainChanged", (chainId: number) => {
        console.log("Chain changed: ", chainId);
      });

      // Subscribe to p connection
      providerConnection.on("connect", (info: { chainId: number }) => {
        console.log("Info 3: ", info);
      });
      // Subscribe to p disconnection
      providerConnection.on(
        "disconnect",
        (error: { code: number; message: string }) => {
          // web3Modal.clearCachedProvider();

          setAccount(undefined);
        }
      );
    }
  };

  const connectWallet = async () => {
    // const connection = await web3Modal.connect();
    await walletConnectProvider.enable();
    const web3Provider = new providers.Web3Provider(walletConnectProvider);

    subscribeProvider(walletConnectProvider);
    // const p = new ethers.providers.Web3Provider(connection);
    setProvider(web3Provider);
    const signer = web3Provider.getSigner();
    const accountAddress = await signer.getAddress();
    setAccount(accountAddress);
    localStorage.setItem("account", accountAddress);
  };

  const disconnectWallet = async () => {
    // await web3Modal.clearCachedProvider();
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
        if (ethAccounts) {
          // const connection = await web3Modal.connect();
          // const p = new ethers.providers.Web3Provider(connection);
          const web3Provider = new providers.Web3Provider(
            walletConnectProvider
          );
          await walletConnectProvider.enable();

          setProvider(web3Provider);
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
      if (localStorageAccount) {
        // const connection = await web3Modal.connect();
        await walletConnectProvider.enable();
        const web3Provider = new providers.Web3Provider(walletConnectProvider);
        setProvider(web3Provider);
        // subscribeProvider(p.connection);
        const signer = web3Provider.getSigner();
        const userAccountAddress = await signer.getAddress();
        setAccount(userAccountAddress);
      }
    } else {
      const ethEnabled = await enableWindowEthereum();
      if (ethEnabled) {
        await walletConnectProvider.enable();
        // const connection = await web3Modal.connect();
        walletConnectProvider.enable();
        // const p = new ethers.providers.Web3Provider(connection);
        const web3Provider = new walletConnectProvider.Web3Provider(provider);

        setProvider(web3Provider);
      }
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return {
    isMobile,
    // web3Modal,
    account,
    connectWallet,
    disconnectWallet,
    // cachedProvider: web3Modal.cachedProvider,
  };
};
