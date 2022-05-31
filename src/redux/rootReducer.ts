import { combineReducers } from '@reduxjs/toolkit';

import accountReducer from './modules/account/accountSlice';
import { collectionsApi } from './modules/collections/queries';
import globalReducer from './modules/globals/globalsSlice';
import bridgeReducer from './modules/bridge/bridgeSlice';
import { nftsApi } from './modules/nfts/queries';
import { likesApi } from './modules/likes/queries';

export default combineReducers({
  account: accountReducer,
  globals: globalReducer,
  bridge: bridgeReducer,
  [collectionsApi.reducerPath]: collectionsApi.reducer,
  [nftsApi.reducerPath]: nftsApi.reducer,
  [likesApi.reducerPath]: likesApi.reducer,
});
