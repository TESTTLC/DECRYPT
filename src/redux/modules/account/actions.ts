import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI } from 'src/api/auth';
import { getHeaderPayloadFromCookies } from 'src/utils/functions/Cookies';
import { addHeaderPayloadToLocalStorageWithExpiry } from 'src/utils/functions/LocalStorage';
import { addMinutesToCurrentDateTime } from 'src/utils/functions/utils';
import { AccountState, BaseUser, ThunkApi } from 'src/utils/storeTypes';
import { isStoreState } from 'src/utils/typeGuards';

export const setWalletAddress = createAction<string | undefined>(
  'account/setWalletAddress',
);

export const setTotalPower = createAction<number>('account/setTotalPower');

export const setAccountData = createAction<Partial<AccountState>>(
  'account/setAccountData',
);

export const setIsLoggedIn = createAction<boolean>('account/setIsLoggedIn');

export const login = createAsyncThunk<
  BaseUser,
  {
    email: string;
    password: string;
  },
  ThunkApi
>('account/login', async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  if (isStoreState(state)) {
    try {
      const { email, password } = args;
      // const result = (await registerAPI(args)).data;
      const result = await loginAPI(email, password);

      if (!result) {
        return thunkAPI.rejectWithValue(`No result (error on API request) `);
      }
      const headerPayloadCookie = await getHeaderPayloadFromCookies();
      const expiryDate = addMinutesToCurrentDateTime(30);
      addHeaderPayloadToLocalStorageWithExpiry(headerPayloadCookie, expiryDate);

      localStorage.setItem('user', JSON.stringify(result.data.user));
      return result.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  } else {
    return thunkAPI.rejectWithValue('No store found!');
  }
});

export const register = createAsyncThunk<
  BaseUser,
  {
    email: string;
    password: string;
  },
  ThunkApi
>('account/register', async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  if (isStoreState(state)) {
    try {
      const { email, password } = args;
      const result = await registerAPI(email, password);

      if (!result) {
        return thunkAPI.rejectWithValue(`No result (error on API request) `);
      }
      const headerPayloadCookie = await getHeaderPayloadFromCookies();
      const expiryDate = addMinutesToCurrentDateTime(30);
      addHeaderPayloadToLocalStorageWithExpiry(headerPayloadCookie, expiryDate);

      localStorage.setItem('user', JSON.stringify(result.data.user));
      return result.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  } else {
    return thunkAPI.rejectWithValue('No store found!');
  }
});
