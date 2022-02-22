import { createSlice } from '@reduxjs/toolkit';
import { AccountState } from 'src/utils/storeTypes';

import { setTotalPower, setWalletAddress } from './actions';
// import {isErrorPayload} from '@utils/typeGuards';
// import {ApiStatus, ProfileState} from 'types/store';

const initialState: AccountState = {
  id: 0,
  firstName: '',
  lastName: '',
  walletAddress: undefined,
  totalPower: 0,
  email: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setWalletAddress, (state, action) => {
      return { ...state, walletAddress: action.payload };
    });
    builder.addCase(setTotalPower, (state, action) => {
      return { ...state, totalPower: action.payload };
    });
  },
});

export default accountSlice.reducer;