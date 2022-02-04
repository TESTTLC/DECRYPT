import { useEffect, useState } from "react";

import BridgeTLC from "../contracts/BridgeTLC.json";

import { ethers, Contract, utils } from "ethers";
import { useGlobalContext } from "../utils/context";
import { BSCBridgeContractAddress } from "../utils/globals";
import Web3 from "web3";

export const useBridgeContracts = (coinTag: string) => {
  const { provider, account } = useGlobalContext();
  const [bridgeContract, setBridgeContract] = useState<
    ethers.Contract | undefined
  >();
  const [admin, setAdmin] = useState("");
  const web3TLC = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
  const { address: adminW } = web3TLC.eth.accounts.wallet.add(
    process.env.REACT_APP_W_KEY || ""
  );

  useEffect(() => {
    if (adminW) {
      setAdmin(adminW);
    }
  }, [adminW]);

  const [alreadyConnectedToContracts, setAlreadyConnectedToContracts] =
    useState(false);

  useEffect(() => {
    connectToContracts();
  }, [coinTag]);

  const connectToContracts = async () => {
    try {
      if (provider) {
        const contractB = new ethers.Contract(
          BSCBridgeContractAddress,
          BridgeTLC.abi,
          provider.getSigner()
        );

        setBridgeContract(contractB);
        setAlreadyConnectedToContracts(true);
      }
    } catch (error) {
      console.log("Error on connectToContracts: ", error);
    }
  };

  useEffect(() => {
    if (provider && account && !alreadyConnectedToContracts) {
      //   connectToContracts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, account]);

  return { provider, bridgeContract, admin };
};
