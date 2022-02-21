import { ReactElement } from 'react';

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
export enum CoinTags {}

export type Project = {
  // name: "The Luxury Bank" | "The Luxury Coin" | "Luxanida" | "Beez";
  // tag: "TLX" | "TLC" | "LSO" | "BEEZ";
  name: string;
  tag: string;
  image: string;
  iconBackground?: string;
};

export enum ChainsIds {
  BSC = '0x38',
  BSC_TESTNET = '0x61', //97
  TLC = '0x1439',
}

export const defaultPowers = {
  // all values are represented as percentage
  TLX: [0.1, 0.3, 0.5, 0.7, 1],
  TLC: [0.01, 0.03, 0.05, 0.07, 0.1],
  LSO: [0.01, 0.03, 0.05, 0.07, 0.1],
};

export const stakeRewards = {
  // all values are represented as percentage
  TLX: [15.34, 21.25, 29.68, 40.56, 86.12],
  TLC: [11.25, 15.56, 18.8, 19.26, 63.58],
  LSO: [12.19, 17.32, 19.27, 51.25, 112],
};
