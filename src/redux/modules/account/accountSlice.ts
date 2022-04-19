import { createSlice } from '@reduxjs/toolkit';
import { AccountState, ApiStatus } from 'src/utils/storeTypes';
import { isErrorPayload } from 'src/utils/typeGuards';
import { addUserInLocalStorage } from 'src/utils/functions/LocalStorage';

import {
  login,
  register,
  setAccountData,
  setIsLoggedIn,
  setRequestError,
  setTotalPower,
  setWalletAddress,
  updateUser,
  getUser,
  activateAccount,
  setIsActivated,
  logout,
  updatePassword,
  setPasswordError,
} from './actions';

const initialState: AccountState = {
  id: 0,
  firstName: undefined,
  lastName: undefined,
  username: undefined,
  walletAddress: undefined,
  totalPower: 0,
  email: '',
  isLoggedIn: false,
  isLoading: false,
  apiStatus: ApiStatus.Idle,
  error: undefined,
  passwordError: undefined,
  bio: undefined,
  coverImageUri: undefined,
  profileImageUri: undefined,
  isActivated: false,
  facebook: undefined,
  twitter: undefined,
  instagram: undefined,
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
    builder.addCase(setIsActivated, (state, action) => {
      return { ...state, isLoggedIn: action.payload };
    });
    builder.addCase(logout, () => {
      return { ...initialState };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        error: undefined,
        ...action.payload,
      };
    });
    builder.addCase(login.pending, (state, action) => {
      return { ...state, isLoading: true, email: action.meta.arg.email };
    });
    builder.addCase(login.rejected, (state, action) => {
      let error;
      if (isErrorPayload(action.payload)) {
        const { message } = action.payload;
        if (message.includes('401') || message.includes('404')) {
          error = 'Incorrect email or password';
        } else if (message.includes('500')) {
          error = 'Something went wrong';
        }
      }

      return { ...state, isLoading: false, error };
    });

    builder.addCase(register.fulfilled, (state, action) => {
      return {
        ...state,
        // isLoggedIn: true,
        isLoading: false,
        error: undefined,
        ...action.payload,
      };
    });
    builder.addCase(register.pending, (state, action) => {
      return { ...state, isLoading: true, email: action.meta.arg.email };
    });
    builder.addCase(register.rejected, (state, action) => {
      let error;
      if (isErrorPayload(action.payload)) {
        const { message } = action.payload;
        if (message.includes('409')) {
          error = 'Email already exists';
        }
      }
      return {
        ...state,
        isLoading: false,
        error,
        email: action.meta.arg.email,
      };
    });

    builder.addCase(setRequestError, (state, action) => {
      return { ...state, error: action.payload };
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const user = action.payload;
      addUserInLocalStorage({ ...state, ...user, password: undefined });
      return { ...state, ...user, password: '', isLoading: false };
    });
    builder.addCase(updateUser.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(updateUser.rejected, (state) => {
      return { ...state, isLoading: false };
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      return { ...state, isPasswordUpdating: false, passwordError: undefined };
    });
    builder.addCase(updatePassword.pending, (state) => {
      return { ...state, isPasswordUpdating: true, passwordError: undefined };
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      let passwordError;
      if (isErrorPayload(action.payload)) {
        const { message } = action.payload;
        if (message.includes('401')) {
          passwordError = 'Unauthorized';
        } else {
          passwordError = 'Something went wrong. Please try again!';
        }
      }
      return { ...state, isPasswordUpdating: false, passwordError };
    });
    builder.addCase(setPasswordError, (state, action) => {
      return { ...state, passwordError: action.payload };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      const user = action.payload;
      return { ...state, ...user, password: '' };
    });
    builder.addCase(getUser.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getUser.rejected, (state) => {
      return { ...state, isLoading: false };
    });
    builder.addCase(activateAccount.fulfilled, (state) => {
      return { ...state, isLoading: false, error: undefined };
    });
    builder.addCase(activateAccount.pending, (state) => {
      return { ...state, isLoading: true, error: undefined };
    });
    builder.addCase(activateAccount.rejected, (state, action) => {
      let error;
      if (isErrorPayload(action.payload)) {
        const { message } = action.payload;
        if (message.includes('401')) {
          error = 'Wrong activation code';
        } else if (message.includes('500')) {
          error = 'Something went wrong. Please try again!';
        }
      }
      return { ...state, isLoading: false, error };
    });
  },
});

export default accountSlice.reducer;
