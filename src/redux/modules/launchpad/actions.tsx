import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getLSOLaunchpadRegistration } from 'src/api/launchpad';
import { ThunkApi } from 'src/utils/storeTypes';
import { isStoreState } from 'src/utils/typeGuards';

export const setIsRegisteredInLSOLaunchpad = createAction<boolean>(
  'launchpad/setIsRegisteredInLSOLaunchpad',
);

export const getLSOLaunchpadRegistrationThunk = createAsyncThunk<
  // { walletAddress: string; LSOLaunchpadRegistrationPower: number },
  boolean,
  {
    walletAddress: string;
  },
  ThunkApi
>('launchpad/getLSOLaunchpadRegistration', async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  if (isStoreState(state)) {
    console.log('got here');
    try {
      // const result = (await registerAPI(args)).data;
      console.log('got here2');
      const result = await getLSOLaunchpadRegistration(args.walletAddress);
      if (result) {
        console.log('true');
        return true;
      }
      console.log('false');
      return false;

      // return thunkAPI.rejectWithValue('No result (error on API request)');
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  } else {
    return thunkAPI.rejectWithValue('No store found!');
  }
});
