import { createSlice } from '@reduxjs/toolkit';
import { AccountState, ApiStatus } from 'src/utils/storeTypes';

import {
  login,
  register,
  setAccountData,
  setIsLoggedIn,
  setTotalPower,
  setWalletAddress,
} from './actions';
// import {isErrorPayload} from '@utils/typeGuards';
// import {ApiStatus, ProfileState} from 'types/store';

const initialState: AccountState = {
  id: 0,
  firstName: '',
  lastName: '',
  walletAddress: undefined,
  totalPower: 0,
  email: '',
  isLoggedIn: false,
  isLoading: false,
  apiStatus: ApiStatus.Idle,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAccountData, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(setWalletAddress, (state, action) => {
      return { ...state, walletAddress: action.payload };
    });
    builder.addCase(setTotalPower, (state, action) => {
      return { ...state, totalPower: action.payload };
    });
    builder.addCase(setIsLoggedIn, (state, action) => {
      return { ...state, isLoggedIn: action.payload };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        ...action.payload,
      };
    });
    builder.addCase(login.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(login.rejected, (state) => {
      return { ...state, isLoading: false };
    });

    builder.addCase(register.fulfilled, (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        ...action.payload,
      };
    });
    builder.addCase(register.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(register.rejected, (state) => {
      return { ...state, isLoading: false };
    });
  },
});

export default accountSlice.reducer;
