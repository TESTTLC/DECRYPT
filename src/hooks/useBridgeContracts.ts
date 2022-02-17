import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import { useSelector } from "react-redux";
import { Web3Provider } from "@ethersproject/providers";
import { StoreState } from "src/utils/storeTypes";
import BridgeTLC from "../contracts/BridgeTLC.json";
import { BSCBridgeContractAddress } from "../utils/globals";

export const useBridgeContracts = (coinTag: string) => {
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress
  );
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (provider && walletAddress && !alreadyConnectedToContracts) {
      //   connectToContracts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, walletAddress]);

  return { provider, bridgeContract, admin };
};
