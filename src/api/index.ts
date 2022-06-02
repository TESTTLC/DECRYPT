import dotenv from 'dotenv';
import axios from 'axios';

import { api } from './api';

dotenv.config();
// axios.defaults.baseURL = "";

export const getTransaction = async (walletAddress: string) => {
  try {
    const result = await api.get(`/transactions/get/${walletAddress}`);
    return result.data.transaction;
  } catch (error) {
    return;
  }
};

export const initialize = async (walletAddress: string) => {
  try {
    const result = await api.post('/transactions/initialize', {
      walletAddress,
    });

    return result.data.transaction;
  } catch (error) {
    return;
  }
};

export const mintNewTokens = async (walletAddress: string) => {
  try {
    const result = await api.post('/transactions/mint', {
      walletAddress,
    });
    return result.data.status;
  } catch (error) {
    return;
    // console.log("Error on api initialize: ", error);
  }
};

export const updateTransaction = async (
  walletAddress: string,
  burnStatus: 'idle' | 'started' | 'success' | 'failed',
) => {
  try {
    const result = await api.post('/transactions/update', {
      walletAddress,
      burnStatus,
    });
    return result.data.status;
  } catch (error) {
    return;
  }
};

export const claimTLC = async (
  walletAddress: string,
  amount: number,
  txHash: string,
) => {
  try {
    const result = await api.post('/claims/', {
      walletAddress,
      amount,
      txHash,
    });
    console.log('Result: ', result);
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const joinLaunchpadApi = async (
  walletAddress: string,
  tlxStake: number,
  tlcStake: number,
  totalPower: number,
) => {
  const launchpadApi = axios.create({
    baseURL: process.env.REACT_APP_JOIN_LAUNCHPAD_API,
  });
  console.log('launchpadApi: ', process.env.REACT_APP_JOIN_LAUNCHPAD_API);
  try {
    const result = await launchpadApi.post('/', {
      walletAddress,
      tlxStake,
      tlcStake,
      totalPower,
    });
    console.log('Result: ', result);
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const sendTxHashToBackend = async (
  txHash: string,
  walletAddress: string,
) => {
  const ip = 'http://159.65.10.226:3100';
  //   const tlcElrondBackendAPI = axios.create({
  //     baseURL: `${ip}/api/checkTransactionHash?`,
  //   });

  try {
    console.log('Sending txHash to backend: ', txHash);
    console.log('WalletAddress: ', walletAddress);
    const formData = new FormData();
    formData.append('tx', txHash);
    formData.append('wallet', walletAddress);
    const result = await axios.post(`${ip}/api/checkTransactionHash`, formData);
    console.log('Result: ', result);
  } catch (error) {
    console.log('Error: ', error);
  }
};
