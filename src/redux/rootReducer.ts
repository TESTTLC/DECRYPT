import { combineReducers } from '@reduxjs/toolkit';

import accountReducer from './modules/account/accountSlice';
import { collectionsApi } from './modules/collections/queries';
import globalReducer from './modules/globals/globalsSlice';
import bridgeReducer from './modules/bridge/bridgeSlice';

export default combineReducers({
  account: accountReducer,
  globals: globalReducer,
  bridge: bridgeReducer,
  [collectionsApi.reducerPath]: collectionsApi.reducer,
});
