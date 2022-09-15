import BigNumber from 'bignumber.js/bignumber.js';
import { keccak256 } from 'ethers/lib/utils';
import MerkleTree from 'merkletreejs';

import { stableCoins } from '../globals';

export const addMinutesToCurrentDateTime = (minutes: number) => {
  const now = new Date();
  return now.getTime() + minutes * 60 * 1000;
};

export const resolveIpfsUrl = (url: string) => {
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return url;
};

export const epochToDate = (epochSeconds: number | string, type?: string) => {
  const date = new Date(0);
  if (typeof epochSeconds === 'string') {
    date.setUTCSeconds(parseInt(epochSeconds, 10));
  } else {
    date.setUTCSeconds(epochSeconds);
  }

  if (type && type === 'localeString') {
    return date.toLocaleString();
  }

  return date.toUTCString();
};

export const dateToTimestamp = (strDate: string) => {
  return Date.parse(strDate);
};

export const addHours = (h: number) => {
  return new Date().getTime() + h * 60 * 60 * 1000;
};

export const ellipsizeAddress = (str: string, maxLength: number) => {
  if (str && str.length > maxLength) {
    return str.slice(0, maxLength / 2) + '...' + str.slice(-maxLength / 2);
  }

  return str;
};

export const ellipsizeText = (str: string, maxLength: number) => {
  if (str && str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }

  return str + '...';
};

export const createMerkleTree = (whitelistAddresses: string[]) => {
  console.log('whitelistAddresses: ', whitelistAddresses);
  const leafNodes = whitelistAddresses.map((addr: string) => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, {
    sortPairs: true,
  });
  const rootHash = merkleTree.getRoot();

  return rootHash.toString();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertWeiToEsdt = (v: any, decimals = 18, precision = 2) => {
  // conversion for BigNumber operation
  if (typeof v != typeof BigNumber) v = new BigNumber(v);

  const number = v.dividedBy(new BigNumber(Math.pow(10, decimals))).toNumber();
  const factor = Math.pow(10, precision);
  return Math.floor(number * factor) / factor;
};

export const convertEsdtToWei = (v: number, decimals = 18) => {
  const factor = Math.pow(10, decimals);
  return new BigNumber(v).multipliedBy(factor);
};

export const isStableCoin = (coinTag: string) => {
  return stableCoins.includes(coinTag);
};
