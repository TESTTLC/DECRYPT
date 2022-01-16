import { useEffect, useRef, useState } from "react";
import TheLuxuryStake from "../contracts/TheLuxuryStake.json";
import TheLuxuryOriginal from "../contracts/TheLuxuryOriginal.json";
import { ethers, Contract, utils } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useGlobalContext } from "../utils/context";
import {
  TLXStakeContractAddress,
  TLXTokenContractAddress,
} from "../utils/globals";

export const useTLXContracts = () => {
  const { provider, account } = useGlobalContext();

  const [tokenContract, setTokenContract] = useState<any | undefined>();
  const [stakeContract, setStakeContract] = useState<Contract | undefined>();

  const connectToContracts = async () => {
    if (provider) {
      const contractT = new ethers.Contract(
        TLXTokenContractAddress,
        TheLuxuryOriginal.abi,
        provider.getSigner()
      );
      const contractS = new ethers.Contract(
        TLXStakeContractAddress,
        TheLuxuryStake.abi,
        provider.getSigner()
      );

      setTokenContract(contractT);
      setStakeContract(contractS);
    }
  };

  useEffect(() => {
    if (provider && account) {
      connectToContracts();
    }
  }, []);

  useEffect(() => {
    if (provider && account) {
      connectToContracts();
    }
  }, [provider, account]);

  return { provider, stakeContract, tokenContract };
};
