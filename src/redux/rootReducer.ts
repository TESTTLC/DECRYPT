import { combineReducers } from '@reduxjs/toolkit';

import accountReducer from './modules/account/accountSlice';
import { collectionsApi } from './modules/collections/queries';
import globalReducer from './modules/globals/globalsSlice';

export default combineReducers({
  account: accountReducer,
  globals: globalReducer,
  [collectionsApi.reducerPath]: collectionsApi.reducer,
});
