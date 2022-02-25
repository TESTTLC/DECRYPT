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
export type AccountState = BaseUser;

export interface GlobalState {
  provider?: Web3Provider;
  isSidebarOpen: boolean;
}

export interface LaunchpadState {
  isRegisteredInLSOLaunchpad: boolean;
}

export type AppDispatch = ThunkDispatch<StoreState, unknown, AnyAction>;

export type ThunkApi = {
  state?: StoreState;
  dispatch?: AppDispatch;
};

export type StoreState = {
  account: AccountState;
  globals: GlobalState;
  launchpad: LaunchpadState;
};

export enum ApiStatus {
  Done = 'DONE',
  Loading = 'LOADING',
  Error = 'ERROR',
}

export type ResponseType = 'success' | 'error';

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
