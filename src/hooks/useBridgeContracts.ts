import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import { Web3Provider } from '@ethersproject/providers';
import { StoreState } from 'src/utils/storeTypes';
import {
  getBridgeAddresses,
  getTokenAddress,
} from 'src/utils/functions/Contracts';

import MainBridge from '../contracts/MainBridge.json';
import MainBridgeMainToken from '../contracts/MainBridgeMainToken.json';
import MainBridgeTLCToEGLD from '../contracts/MainBridgeTLCToEGLD.json';
import SideBridge from '../contracts/SideBridge.json';
import TokenErc721 from '../contracts/LuxandiaToken.json';
import { bridgeAddresses, LussoTokenContractAddress } from '../utils/globals';

export const useBridgeContracts = (
  coinTag: string,
  fromChain: string,
  toChain: string,
) => {
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const [mainBridgeContract, setMainBridgeContract] = useState<
    ethers.Contract | undefined
  >();

  const [sideBridgeContract, setSideBridgeContract] = useState<
    ethers.Contract | undefined
  >();

  const [tokenContract, setTokenContract] = useState<
    ethers.Contract | undefined
  >();

  const [alreadyConnectedToContracts, setAlreadyConnectedToContracts] =
    useState(false);

  const [mainBridgeAddress, setMainBridgeAddress] = useState(
    bridgeAddresses.LSO.main.address,
  );
  const [sideBridgeAddress, setSideBridgeAddress] = useState(
    bridgeAddresses.LSO.child.BSC.address,
  );
  const [tokenAddress, setTokenAddress] = useState(LussoTokenContractAddress);

  const getTokenContractAddress = useCallback(() => {
    const address = getTokenAddress(coinTag, fromChain);
    setTokenAddress(address);
  }, [coinTag, fromChain]);

  const getAddresses = useCallback(() => {
    const { mainBridgeAddress: mainAddr, sideBridgeAddress: childAddr } =
      getBridgeAddresses(coinTag, fromChain, toChain);
    getTokenContractAddress();
    setMainBridgeAddress(mainAddr);
    setSideBridgeAddress(childAddr);
  }, [coinTag, fromChain, getTokenContractAddress, toChain]);

  useEffect(() => {
    connectToContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinTag, mainBridgeAddress, sideBridgeAddress, tokenAddress]);

  const connectToContracts = async () => {
    let selectedBridgeAbi = MainBridge.abi;
    if (coinTag === 'TLC') {
      if (toChain === 'TLC') {
        selectedBridgeAbi = MainBridge.abi;
      } else {
        selectedBridgeAbi = MainBridgeMainToken.abi;
      }
    }
    try {
      if (provider) {
        let mainContract;
        if (toChain === 'ELROND' && coinTag === 'TLC') {
          mainContract = new ethers.Contract(
            mainBridgeAddress,
            MainBridgeTLCToEGLD,
            provider.getSigner(),
          );
        } else {
          mainContract = new ethers.Contract(
            mainBridgeAddress,
            selectedBridgeAbi,
            provider.getSigner(),
          );
        }

        console.log('mainBridgeAddress: ', mainBridgeAddress);
        console.log('SideBridgeAddress: ', sideBridgeAddress);
        console.log('tokenAddress', tokenAddress);

        const sideContract = new ethers.Contract(
          sideBridgeAddress,
          SideBridge.abi,
          //   SideBridge.abi,
          provider.getSigner(),
        );
        const tknContract = new ethers.Contract(
          tokenAddress,
          TokenErc721.abi,
          provider.getSigner(),
        );

        setMainBridgeContract(mainContract);
        setSideBridgeContract(sideContract);
        setTokenContract(tknContract);
        setAlreadyConnectedToContracts(true);
      }
    } catch (error) {
      console.log('Error on connectToContracts: ', error);
    }
  };

  useEffect(() => {
    if (provider && walletAddress && !alreadyConnectedToContracts) {
      connectToContracts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, walletAddress]);

  useEffect(() => {
    getAddresses();
    // getTokenContractAddress();
  }, [coinTag, fromChain, getAddresses, getTokenContractAddress, toChain]);

  return {
    provider,
    mainBridgeContract,
    sideBridgeContract,
    tokenContract,
  };
};
