import { useEffect, useRef, useState } from "react";
import TheLuxuryBankStake from "../contracts/TheLuxuryBankStake.json";
import TheLuxuryBankToken from "../contracts/TheLuxuryBankToken.json";
import TheLuxuryCoinStake from "../contracts/TheLuxuryCoinStake.json";
import TheLuxuryCoinToken from "../contracts/TheLuxuryCoinToken.json";
import LuxandiaToken from "../contracts/LuxandiaToken.json";
import LuxandiaStake from "../contracts/LuxandiaStake.json";
import OldTLXToken from "../contracts/OldTLXToken.json";

import { ethers, Contract, utils } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useGlobalContext } from "../utils/context";
import {
  LussoStakeContractAddress,
  LussoTokenContractAddress,
  TLXStakeContractAddress,
  TLXTokenContractAddress,
  TLCStakeContractAddress,
  TLCTokenContractAddress,
  OldTLXTokenContractAddress,
} from "../utils/globals";

export const useContracts = (coinTag: string) => {
  const { provider, account } = useGlobalContext();

  const [tokenContract, setTokenContract] = useState<any | undefined>();
  const [stakeContract, setStakeContract] = useState<Contract | undefined>();
  const [tokenAddress, setTokenAddress] = useState("");
  const [stakeAddress, setStakeAddress] = useState("");
  // const [tokenAddress, setTokenAddress] = useState(TLXTokenContractAddress);
  // const [stakeAddress, setStakeAddress] = useState(TLXStakeContractAddress);
  const [alreadyConnectedToContracts, setAlreadyConnectedToContracts] =
    useState(false);
  const [tokenAbi, setTokenAbi] = useState<any>();
  const [stakeAbi, setStakeAbi] = useState<any>();

  useEffect(() => {
    if (coinTag === "TLX") {
      setTokenAddress(TLXTokenContractAddress);
      setStakeAddress(TLXStakeContractAddress);
      setTokenAbi(TheLuxuryBankToken.abi);
      setStakeAbi(TheLuxuryBankStake.abi);
    } else if (coinTag === "LSO") {
      setTokenAddress(LussoTokenContractAddress);
      setStakeAddress(LussoStakeContractAddress);
      setTokenAbi(LuxandiaToken.abi);
      setStakeAbi(LuxandiaStake.abi);
    } else if (coinTag === "TLC") {
      setTokenAddress(TLCTokenContractAddress);
      setStakeAddress(TLCStakeContractAddress);
      setTokenAbi(TheLuxuryCoinToken.abi);
      setStakeAbi(TheLuxuryCoinStake.abi);
    } else if (coinTag === "OldTLX") {
      setTokenAddress(OldTLXTokenContractAddress);
      setStakeAddress(TLXStakeContractAddress);
      setTokenAbi(OldTLXToken.abi);
      setStakeAbi(TheLuxuryBankStake.abi);
    }
  }, [coinTag]);

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
      tokenAbi &&
      stakeAbi &&
      tokenAddress &&
      stakeAddress &&
      !alreadyConnectedToContracts
    ) {
      connectToContracts();
    }
  }, [provider, account, tokenAbi, stakeAbi, tokenAddress, stakeAddress]);

  return { provider, stakeContract, tokenContract, stakeAddress };
};
