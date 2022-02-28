import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./modules/account/accountSlice";
import globalReducer from "./modules/globals/globalsSlice";

export default combineReducers({
  account: accountReducer,
  globals: globalReducer,
});
