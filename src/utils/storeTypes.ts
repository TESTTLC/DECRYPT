import { Web3Provider } from '@ethersproject/providers';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

interface BaseUser {
  id?: number;
  walletAddress?: string;
  firstName?: string;
  lastName?: string;
  totalPower: number;
  email?: string;
}

export interface GlobalState {
  provider?: Web3Provider;
  isSidebarOpen: boolean;
}

export type AccountState = BaseUser;
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
}
