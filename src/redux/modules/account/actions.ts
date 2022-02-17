import { Web3Provider } from "@ethersproject/providers";
import { createAction } from "@reduxjs/toolkit";
import { AccountState } from "src/utils/storeTypes";

export const setWalletAddress = createAction<string | undefined>(
  "account/setWalletAddress"
);

export const setTotalPower = createAction<number>("account/setTotalPower");

export const setAccountData = createAction<Partial<AccountState>>(
  "account/setAccountData"
);
