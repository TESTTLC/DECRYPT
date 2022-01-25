import { useEffect, useState } from "react";

import BridgeBSC from "../contracts/BridgeBSC.json";

import { ethers, Contract, utils } from "ethers";
import { useGlobalContext } from "../utils/context";
import { BSCBridgeContractAddress } from "../utils/globals";

export const useBridgeContracts = (coinTag: string) => {
  const { provider, account } = useGlobalContext();
  const [bridgeContract, setBridgeContract] = useState<
    ethers.Contract | undefined
  >();

  const [alreadyConnectedToContracts, setAlreadyConnectedToContracts] =
    useState(false);

  useEffect(() => {
    // setBridgeContracts()
  }, [coinTag]);

  const connectToContracts = async () => {
    try {
      if (provider) {
        // console.log("tokenAddress: ", tokenAddress);
        // console.log("stakeAddress: ", stakeAddress);
        // console.log("Provider is: ", provider);
        const contractB = new ethers.Contract(
          BSCBridgeContractAddress,
          BridgeBSC.abi,
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
    if (
      provider &&
      account &&
      //   tokenAbi &&

      !alreadyConnectedToContracts
    ) {
      //   connectToContracts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, account]);

  return { provider, bridgeContract };
};
