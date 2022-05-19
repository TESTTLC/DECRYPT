import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import { Web3Provider } from '@ethersproject/providers';
import { StoreState } from 'src/utils/storeTypes';
import { getBridgeAddresses } from 'src/utils/functions/Contracts';

import MainBridge from '../contracts/MainBridge.json';
import ChildBridge from '../contracts/ChildBridge.json';
import {
  bridgeAddresses,
  BSCBridgeContractAddress,
  BSCChildBridgeContractAddress,
} from '../utils/globals';

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

  const [childBridgeContract, setChildBridgeContract] = useState<
    ethers.Contract | undefined
  >();

  const [alreadyConnectedToContracts, setAlreadyConnectedToContracts] =
    useState(false);

  const [mainBridgeAddress, setMainBridgeAddress] = useState(
    bridgeAddresses.LSO.main.address,
  );
  const [childBridgeAddress, setChildBridgeAddress] = useState(
    bridgeAddresses.LSO.child.BSC.address,
  );

  const getAddresses = useCallback(() => {
    const { mainBridgeAddress: mainAddr, childBridgeAddress: childAddr } =
      getBridgeAddresses(coinTag, fromChain, toChain);

    setMainBridgeAddress(mainAddr);
    setChildBridgeAddress(childAddr);
  }, [coinTag, fromChain, toChain]);

  useEffect(() => {
    connectToContracts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinTag, mainBridgeAddress, childBridgeAddress]);

  const connectToContracts = async () => {
    try {
      if (provider) {
        const mainContract = new ethers.Contract(
          mainBridgeAddress,
          MainBridge.abi,
          provider.getSigner(),
        );
        console.log('here????: ', childBridgeAddress);
        const childContract = new ethers.Contract(
          childBridgeAddress,
          ChildBridge.abi,
          provider.getSigner(),
        );

        setMainBridgeContract(mainContract);
        setChildBridgeContract(childContract);
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
  }, [coinTag, fromChain, getAddresses, toChain]);

  return {
    provider,
    mainBridgeContract,
    childBridgeContract,
  };
};
