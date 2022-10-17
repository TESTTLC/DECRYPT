import { createSlice } from '@reduxjs/toolkit';
import { BridgeState } from 'src/utils/storeTypes';
import { modalChains } from 'src/utils/globals';

import { updateBridgeState } from './actions';

const initialState: BridgeState = {
  token: 'TLC',
  //   fromToken: 'LSO',
  //   toToken: 'LSO',
  fromChain: modalChains.TLC.tag,
  toChain: modalChains.BSC.tag,
};

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBridgeState, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export default bridgeSlice.reducer;
