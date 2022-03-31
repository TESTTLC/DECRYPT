import { createSlice } from '@reduxjs/toolkit';
import { GlobalState } from 'src/utils/storeTypes';

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
  },
});

export default globalsSlice.reducer;
