import { createSlice } from '@reduxjs/toolkit';
import { GlobalState } from 'src/utils/storeTypes';
import { isErrorPayload } from 'src/utils/typeGuards';

import { activateAccount, login, register } from '../account/actions';

import {
  closeSidebar,
  setIsLoading,
  openSidebar,
  setProvider,
} from './actions';

const initialState: GlobalState = {
  isSidebarOpen: true,
  provider: undefined,
  isLoading: false,
  showActivationForm: undefined,
};

const globalsSlice = createSlice({
  name: 'globals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setProvider, (state, action) => {
      return { ...state, provider: action.payload };
    });

    builder.addCase(openSidebar, (state) => {
      return { ...state, isSidebarOpen: true };
    });

    builder.addCase(closeSidebar, (state) => {
      return { ...state, isSidebarOpen: false };
    });

    builder.addCase(setIsLoading, (state, action) => {
      return { ...state, isLoading: action.payload };
    });

    builder.addCase(register.fulfilled, (state) => {
      return { ...state, showActivationForm: true };
    });

    builder.addCase(login.rejected, (state, action) => {
      let showActivationForm;
      if (isErrorPayload(action.payload)) {
        const { message } = action.payload;
        if (message.includes('403')) {
          showActivationForm = true;
        }
      }
      return { ...state, showActivationForm };
    });

    builder.addCase(activateAccount.fulfilled, (state) => {
      return { ...state, showActivationForm: false };
    });
  },
});

export default globalsSlice.reducer;
