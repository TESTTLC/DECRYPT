import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { activateAccountAPI, loginAPI, registerAPI } from 'src/api/auth';
import { getUserAPI, updatePasswordAPI, updateUserAPI } from 'src/api/user';
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
export const setIsActivated = createAction<boolean>('account/setIsActivated');

export const logout = createAction('account/logout');

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
      console.log('Result: ', result);
      if (!result) {
        return thunkAPI.rejectWithValue(`No result (error on API request) `);
      }

      const headerPayloadCookie = await getHeaderPayloadFromCookies();
      const expiryDate = addMinutesToCurrentDateTime(30);
      addHeaderPayloadToLocalStorageWithExpiry(headerPayloadCookie, expiryDate);

      localStorage.setItem('user', JSON.stringify(result.data.user));
      return result.data.user;
    } catch (error) {
      console.log('Err: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  } else {
    return thunkAPI.rejectWithValue('No store found!');
  }
});

export const updateUser = createAsyncThunk<BaseUser, FormData, ThunkApi>(
  'account/update',
  async (args, thunkAPI) => {
    const state = thunkAPI.getState();
    if (isStoreState(state)) {
      try {
        const result = await updateUserAPI(args, state.account.id);
        console.log('Result: ', result);
        if (!result) {
          return thunkAPI.rejectWithValue(`No result (error on API request) `);
        }
        console.log('Result is: ', result);
        return result.data.user as BaseUser;
      } catch (error) {
        console.log('Err: ', error);
        return thunkAPI.rejectWithValue(error);
      }
    } else {
      return thunkAPI.rejectWithValue('No store found!');
    }
  },
);

export const updatePassword = createAsyncThunk<void, string, ThunkApi>(
  'account/updatePassword',
  async (password, thunkAPI) => {
    const state = thunkAPI.getState();
    if (isStoreState(state)) {
      try {
        await updatePasswordAPI(password, state.account.id);
      } catch (error) {
        console.log('Err: ', error);
        return thunkAPI.rejectWithValue(error);
      }
    } else {
      return thunkAPI.rejectWithValue('No store found!');
    }
  },
);

export const getUser = createAsyncThunk<BaseUser, number, ThunkApi>(
  'account/get',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    if (isStoreState(state)) {
      try {
        const result = await getUserAPI(id);
        console.log('Result: ', result);
        if (!result) {
          return thunkAPI.rejectWithValue(`No result (error on API request) `);
        }
        localStorage.setItem('user', JSON.stringify(result.data.user));
        return result.data.user as BaseUser;
      } catch (error) {
        console.log('Err: ', error);
        return thunkAPI.rejectWithValue(error);
      }
    } else {
      return thunkAPI.rejectWithValue('No store found!');
    }
  },
);

export const activateAccount = createAsyncThunk<
  void,
  { email: string; activationCode: number },
  ThunkApi
>('account/activate', async ({ email, activationCode }, thunkAPI) => {
  const state = thunkAPI.getState();
  if (isStoreState(state)) {
    try {
      const result = await activateAccountAPI(email, activationCode);
      console.log('Result: ', result);
      if (!result) {
        return thunkAPI.rejectWithValue(`No result (error on API request) `);
      }
    } catch (error) {
      console.log('Err: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  } else {
    return thunkAPI.rejectWithValue('No store found!');
  }
});

export const setRequestError = createAction<string | undefined>(
  'account/setRequestError',
);
