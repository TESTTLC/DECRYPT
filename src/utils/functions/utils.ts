import { keccak256 } from 'ethers/lib/utils';
import MerkleTree from 'merkletreejs';

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
  console.log('Return future date with seconds: ', epochSeconds);
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
