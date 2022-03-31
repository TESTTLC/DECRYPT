/* eslint-disable @typescript-eslint/no-explicit-any */
import { Web3Provider } from '@ethersproject/providers';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export interface BaseUser {
  id: number;
  walletAddress?: string;
  firstName?: string;
  lastName?: string;
  totalPower: number;
  email: string;
}

export interface GlobalState {
  provider?: Web3Provider;
  isSidebarOpen: boolean;
  isLoading: boolean;
}

export interface LaunchpadState {
  isRegisteredInLSOLaunchpad: boolean;
}

export interface AccountState extends BaseUser {
  isLoggedIn: boolean;
  isLoading: boolean;
  apiStatus: ApiStatus;
}

export interface Category {
  name: string;
  description: string;
}

interface ContractCollection {
  symbol?: any;
  description?: any;
  image?: any;
  seller_fee_basis_points?: any;
  fee_recipient?: any;
  external_link?: any;
  name: string;
}
export interface Collection extends ContractCollection {
  id?: number;
  name: string;
  description?: string;
  itemsById?: number[];
  logoImageUri: string;
  bannerImageUri?: string;
  featuredImageUri?: string;
  nftsById?: NFT[];
  category?: Category;
  contractAddress: string;
  ownerAddress: string;
}

export enum SaleType {
  AUCTION = 'auction',
  SALE = 'sale',
}
export interface NFT {
  id: number;
  name: string;
  description: string;
  collectionId?: number;
  ownerAddress: string;
  imageUri: string;
  price: number;
  saleType: SaleType;
  auctionDuration?: number; //in days
}

export type AppDispatch = ThunkDispatch<StoreState, unknown, AnyAction>;

export type ThunkApi = {
  state?: StoreState;
  dispatch?: AppDispatch;
};

export type StoreState = {
  account: AccountState;
  globals: GlobalState;
};

export enum ApiStatus {
  Done = 'DONE',
  Loading = 'LOADING',
  Error = 'ERROR',
  Idle = 'Idle',
}
