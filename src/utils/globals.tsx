import ftmBridgeImage from '../assets/images/ftm-bridge.png';
import ethBridgeImage from '../assets/images/eth-bridge.png';
import bscBridgeImage from '../assets/images/bsc-bridge.png';
import solBridgeImage from '../assets/images/sol-bridge.png';
import tlcBridgeImage from '../assets/images/tlc-bridge.png';
import maticBridgeImage from '../assets/images/matic-bridge.png';

import { Project } from './types';

// /** Mainnet */
export const TLXTokenContractAddress =
  '0xB8B538C5dD46d8D691f0A972754365be8c9DC20b';
export const TLXStakeContractAddress =
  '0x492eeF5e03024879444E46F3c57A5fBe5F793d32';

export const LussoTokenContractAddress =
  '0xD62052Cea41E22fb2B97835b53f41190Fe219001';
export const LussoStakeContractAddress =
  '0xe1A6E5f4BcFB9bC39c8f68B2b84BA41ca5681B36';
export const LussoFreezeContractAddress =
  '0x92542Ad9eb7bd1da030E45962Bc492D7BEC265cc';

export const TLCTokenContractAddress =
  '0xb058f92410181368138279f13948b7ded15b0d4f';
export const TLCStakeContractAddress =
  '0xf71147E5cD6AB7b3d2Ae43256733Dff24231e832';

export const USDTContractAddress = '0x55d398326f99059fF775485246999027B3197955';

export const ownerAddress = '0x21C710cACAFfD5d885094cD13988ee08700D26BD';

/** Bridge */
export const BSCBridgeContractAddress =
  '0x8Ef7f7480F9c892E570cF655Ec678C47703e3d37';

/** Mainnet */
// export const OldTLXTokenContractAddress =
//   "0xea255909e46a54d54255219468991c69ca0e659d";
/** Testnet */
export const OldTLXTokenContractAddress =
  '0xea255909e46a54d54255219468991c69ca0e659d';
// export const TLCStakeContractAddress =
//   "0xb4628fFdb9D2E4a13827dfb473B8d6c0419DC2Ad";

export const modalTokens: Project[] = [
  {
    name: 'Binance Smart Chain',
    tag: 'BSC',
    image: bscBridgeImage,
  },
  {
    name: 'Ethereum',
    tag: 'ETH',
    image: ethBridgeImage,
  },
  {
    name: 'Fantom',
    tag: 'FTM',
    image: ftmBridgeImage,
  },
  {
    name: 'Polygon',
    tag: 'MATIC',
    image: maticBridgeImage,
  },
  {
    name: 'Solana',
    tag: 'SOL',
    image: solBridgeImage,
  },
  {
    name: 'TLChain',
    tag: 'TLC',
    image: tlcBridgeImage,
  },
];

export const stakingRewards = {
  TLX: {
    one_month: '15.34% APY for - 1 months',
    three_months: '21.25% APY - 3 months ',
    six_months: '29.68% APY - 6 months ',
    one_year: '40.56% APY - 12 months ',
    three_years: '112% APY - 36 months ',
  },
  LSO: {
    one_month: '12.19% APY - 1 months ',
    three_months: '17.32% APY - 3 months ',
    six_months: '19.27% APY - 6 months ',
    one_year: '51.25% APY - 12 months ',
    three_years: '112% APY - 36 months ',
  },
  TLC: {
    one_month: '11.25% APY - 1 months ',
    three_months: '15.56% APY - 3 months ',
    six_months: '18.80% APY - 6 months ',
    one_year: '19.26% APY - 12 months ',
    three_years: '63.58% APY - 36 months ',
  },
  DEFAULT: {
    one_month: '',
    three_months: '',
    six_months: '',
    one_year: '',
    three_years: '',
  },
};

export const prices = {
  TLC: '0.16',
  LSO: '0.07',
  TLX: 'Listing starts with $50',
};

export const headerPayloadName = '_sec_hpload';
