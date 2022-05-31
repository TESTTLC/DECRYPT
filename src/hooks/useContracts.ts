import { useEffect, useState } from 'react';
import { ethers, Contract } from 'ethers';
import { useSelector } from 'react-redux';
import { Web3Provider } from '@ethersproject/providers';
import { StoreState } from 'src/utils/storeTypes';

import TheLuxuryBankStake from '../contracts/TheLuxuryBankStake.json';
import TheLuxuryBankToken from '../contracts/TheLuxuryBankToken.json';
import TheLuxuryCoinStake from '../contracts/TheLuxuryCoinStake.json';
import TheLuxuryCoinToken from '../contracts/TheLuxuryCoinToken.json';
import LuxandiaToken from '../contracts/LuxandiaToken.json';
import LuxandiaStake from '../contracts/LuxandiaStake.json';
import LuxandiaFreeze from '../contracts/LuxandiaFreeze.json';
import TheLuxuryLiquidityPoolToken from '../contracts/TheLuxuryLiquidityPoolToken.json';
import TheLuxuryLiquidityPoolStake from '../contracts/TheLuxuryLiquidityPoolStake.json';
import TheLuxuryNFT from '../contracts/TheLuxuryNFT.json';
import TTXToken from '../contracts/TTX.json';
import OldTLXToken from '../contracts/OldTLXToken.json';
import {
  LussoStakeContractAddress,
  LussoTokenContractAddress,
  TLXStakeContractAddress,
  TLXTokenContractAddress,
  TLCStakeContractAddress,
  TLCTokenContractAddress,
  OldTLXTokenContractAddress,
  LussoFreezeContractAddress,
  TLLPTokenContractAddress,
  TLLPStakeContractAddress,
  TLNFTTokenContractAddress,
  TTXTokenContractAddress,
  WEGLD_TLC_ChildTokenContractAddress,
} from '../utils/globals';

export const useContracts = (coinTag: string, currentChainId?: string) => {
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tokenContract, setTokenContract] = useState<any | undefined>();
  const [stakeContract, setStakeContract] = useState<Contract | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [freezeContract, setFreezeContract] = useState<any | undefined>();

  const [tokenAddress, setTokenAddress] = useState('');
  const [stakeAddress, setStakeAddress] = useState('');
  const [freezeAddress, setFreezeAddress] = useState('');
  const [alreadyConnectedToContracts, setAlreadyConnectedToContracts] =
    useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tokenAbi, setTokenAbi] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stakeAbi, setStakeAbi] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [freezeAbi, setFreezeAbi] = useState<any>();

  useEffect(() => {
    if (coinTag === 'TLX') {
      setTokenAddress(TLXTokenContractAddress);
      setStakeAddress(TLXStakeContractAddress);
      setTokenAbi(TheLuxuryBankToken.abi);
      setStakeAbi(TheLuxuryBankStake.abi);
    } else if (coinTag === 'LSO') {
      setTokenAddress(LussoTokenContractAddress);
      setStakeAddress(LussoStakeContractAddress);
      setFreezeAddress(LussoFreezeContractAddress);
      setTokenAbi(LuxandiaToken.abi);
      setStakeAbi(LuxandiaStake.abi);
      setFreezeAbi(LuxandiaFreeze.abi);
    } else if (coinTag === 'TLC') {
      setTokenAddress(TLCTokenContractAddress);
      setStakeAddress(TLCStakeContractAddress);
      setTokenAbi(TheLuxuryCoinToken.abi);
      setStakeAbi(TheLuxuryCoinStake.abi);
    } else if (coinTag === 'OldTLX') {
      setTokenAddress(OldTLXTokenContractAddress);
      setStakeAddress(TLXStakeContractAddress);
      setTokenAbi(OldTLXToken.abi);
      setStakeAbi(TheLuxuryBankStake.abi);
    } else if (coinTag === 'TLLP') {
      setTokenAddress(TLLPTokenContractAddress);
      setStakeAddress(TLLPStakeContractAddress);
      setTokenAbi(TheLuxuryLiquidityPoolToken.abi);
      setStakeAbi(TheLuxuryLiquidityPoolStake.abi);
    } else if (coinTag === 'TLNFT') {
      setTokenAddress(TLNFTTokenContractAddress);
      setStakeAddress('-');
      setTokenAbi(TheLuxuryNFT.abi);
      setStakeAbi(TheLuxuryLiquidityPoolStake.abi); //to be removed
    } else if (coinTag === 'TTX') {
      setTokenAddress(TTXTokenContractAddress);
      setStakeAddress('-');
      setTokenAbi(TTXToken.abi);
      setStakeAbi(TheLuxuryLiquidityPoolStake.abi); //to be removed
    } else if (coinTag === 'EGLD') {
      setTokenAddress(WEGLD_TLC_ChildTokenContractAddress);
      setStakeAddress('-');
      setTokenAbi(TTXToken.abi);
      setStakeAbi(TheLuxuryLiquidityPoolStake.abi); //to be removed
    }
  }, [coinTag, currentChainId]);

  const connectToContracts = async () => {
    try {
      if (provider) {
        const contractT = new ethers.Contract(
          tokenAddress,
          tokenAbi,
          provider.getSigner(),
        );

        const contractS = new ethers.Contract(
          stakeAddress,
          stakeAbi,
          provider.getSigner(),
        );

        if (coinTag === 'LSO') {
          const contractF = new ethers.Contract(
            freezeAddress,
            freezeAbi,
            provider.getSigner(),
          );

          setFreezeContract(contractF);
        }

        setTokenContract(contractT);
        setStakeContract(contractS);
        setAlreadyConnectedToContracts(true);
      }
    } catch (error) {
      console.log('Error on connectToContracts: ', error);
    }
  };

  useEffect(() => {
    if (
      provider &&
      walletAddress &&
      tokenAbi &&
      stakeAbi &&
      tokenAddress &&
      stakeAddress &&
      !alreadyConnectedToContracts
    ) {
      console.log('got here');
      connectToContracts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, walletAddress, tokenAbi, stakeAbi, tokenAddress, stakeAddress]);

  return {
    provider,
    stakeContract,
    tokenContract,
    stakeAddress,
    freezeContract,
    freezeAddress,
  };
};
