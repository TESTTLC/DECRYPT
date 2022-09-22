import { ReactElement } from 'react';

export interface ListingProperties {
  // address of the contract the asset you want to list is on
  assetContractAddress: string;
  // token ID of the asset you want to list
  tokenId: string;
  // in how many seconds will the listing open up
  startTimeInSeconds: number;
  // how long the listing will be open for
  listingDurationInSeconds: number;
  // how many of the asset you want to list
  quantity: number;
  // address of the currency contract that will be used to pay for the listing
  currencyContractAddress: string;
  // how much the asset will be sold for
  buyoutPricePerToken: string;
}

export enum StackingDuration {
  ONE_MONTH = 0,
  THREE_MONTHS = 1,
  SIX_MONTHS = 2,
  ONE_YEAR = 3,
  THREE_YEARS = 4,
}

export interface Stake {
  since: string;
  amount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  period: any;
}

export interface LaunchpadProject {
  id: number;
  title: string;
  coinTag: string;
  description: string;
  about: string;
  imageSource: string;
  moreDetails: ReactElement;
  website: string;
}

export interface AssetTokenizationProject {
  id: number;
  title: string;
  coinTag: string;
  description: string;
  about: string;
  imageSource: string;
  moreDetails: ReactElement;
  website: string;
}

export interface SaleResult {
  id: number;
  type: string;
  txHash: string;
  from: string;
  to: string;
  contractAddress: string;
  value: number;
  lister: string;
  buyer: string;
  listingId: number;
}

export interface Activity {
  recentSales: SaleResult[];
  recentBuys: SaleResult[];
}

//ENUMS
export enum CoinTags {}

export type Project = {
  // name: "The Luxury Bank" | "The Luxury Coin" | "Luxanida" | "Beez";
  // tag: "TLX" | "TLC" | "LSO" | "BEEZ";
  name: string;
  tag: string;
  image: string;
  iconBackground?: string;
  value?: number;
  address?: string;
};

export enum ChainsIds {
  BSC = '0x38',
  BSC_TESTNET = '0x61', //97
  TLC = '0x1439',
  FTM = '0xfa',
  AVAX = '0xa86a',
  MATIC = '0x89',
}

export const defaultPowers = {
  // all values are represented as percentage
  TLX: [0.1, 0.3, 0.5, 0.7, 1],
  TLC: [0.01, 0.03, 0.05, 0.07, 0.1],
  LSO: [0.01, 0.03, 0.05, 0.07, 0.1],
  CSY: [0.01, 0.03, 0.05, 0.07, 0.1],
};

export const stakeRewards = {
  // all values are represented as percentage
  TLX: [15.34, 21.25, 29.68, 40.56, 112],
  TLC: [11.25, 15.56, 18.8, 19.26, 63.58],
  LSO: [12.19, 17.32, 19.27, 51.25, 112],
  CSY: [12.19, 17.32, 19.27, 51.25, 112],
};

export enum ProfileCategories {
  COLLECTED = 'Collected',
  //   CREATE = 'Create',
  ACTIVITY = 'Activity',
  //   OFFERS = 'Offers',
  COLLECTIONS = 'Collections',
  LIKED = 'Liked',
}
