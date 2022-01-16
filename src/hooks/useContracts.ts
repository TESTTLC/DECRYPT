import { useEffect, useRef, useState } from "react";
import TheLuxuryStake from "../contracts/TheLuxuryStake.json";
import TheLuxuryOriginal from "../contracts/TheLuxuryOriginal.json";
import { ethers, Contract, utils } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useGlobalContext } from "../utils/context";
import {
  LussoStakeContractAddress,
  LussoTokenContractAddress,
  TLXStakeContractAddress,
  TLXTokenContractAddress,
} from "../utils/globals";
import { AbiItem, AbiType } from "web3-utils";
import { AbiCoder } from "ethers/lib/utils";

export const useContracts = (coin: "TLX") => {
  const { provider, account } = useGlobalContext();

  const [tokenContract, setTokenContract] = useState<any | undefined>();
  const [stakeContract, setStakeContract] = useState<Contract | undefined>();
  const [tokenAddress, setTokenAddress] = useState(TLXTokenContractAddress);
  const [stakeAddress, setStakeAddress] = useState(TLXStakeContractAddress);
  const [tokenAbi, setTokenAbi] = useState<any>();
  const [stakeAbi, setStakeAbi] = useState<any>();

  useEffect(() => {
    if (coin === "TLX") {
      setTokenAddress(TLXTokenContractAddress);
      setStakeAddress(TLXStakeContractAddress);
      setTokenAbi(TheLuxuryOriginal.abi);
      setStakeAbi(TheLuxuryStake.abi);
    } else if (coin === "LUSSO") {
      setStakeAddress(LussoStakeContractAddress);
      setTokenAddress(LussoTokenContractAddress);
      // setAbi(TheLuxuryOriginal.abi);
    }
  }, [coin]);

  const connectToContracts = async () => {
    try {
      if (provider) {
        const contractT = new ethers.Contract(
          tokenAddress,
          tokenAbi,
          provider.getSigner()
        );
        const contractS = new ethers.Contract(
          stakeAddress,
          stakeAbi,
          provider.getSigner()
        );

        setTokenContract(contractT);
        setStakeContract(contractS);
      }
    } catch (error) {
      console.log("Error on connectToContracts: ", error);
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
