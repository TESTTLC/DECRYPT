import { Web3Provider } from "@ethersproject/providers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "src/utils/storeTypes";
import { closeSidebar, openSidebar, setProvider } from "./actions";

const initialState: GlobalState = {
  isSidebarOpen: true,
  provider: undefined,
};

const globalsSlice = createSlice({
  name: "globals",
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
  },
});

export default globalsSlice.reducer;
