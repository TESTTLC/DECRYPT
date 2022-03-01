import { combineReducers } from '@reduxjs/toolkit';

import accountReducer from './modules/account/accountSlice';
import globalReducer from './modules/globals/globalsSlice';
import launchpadReducer from './modules/launchpad/launchpadSlice';

export default combineReducers({
  globals: globalReducer,
  account: accountReducer,
  launchpad: launchpadReducer,
});
