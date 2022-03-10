import { createSlice } from '@reduxjs/toolkit';
import { LaunchpadState } from 'src/utils/storeTypes';

import { getLSOLaunchpadRegistrationThunk } from './actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: LaunchpadState = {
  isRegisteredInLSOLaunchpad: false,
};

const launchpadSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getLSOLaunchpadRegistrationThunk.fulfilled,
      (state, action) => {
        return {
          ...state,
          isRegisteredInLSOLaunchpad: action.payload,
        };
      },
    );
  },
});

export default launchpadSlice.reducer;
