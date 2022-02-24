import { combineReducers } from '@reduxjs/toolkit';

import accountReducer from './modules/account/accountSlice';
import globalReducer from './modules/globals/globalsSlice';
// import launchpadReducer from './modules/globals/launchpadSlice';

export default combineReducers({
  globals: globalReducer,
  account: accountReducer,
  // launchpad: launchpadReducer,
});

// export const register = createAsyncThunk<
//   UserAuthResponse,
//   {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     role: RoleType;
//   },
//   ThunkApi
// >('user/register', async (args, thunkAPI) => {
//   const state = thunkAPI.getState();
//   if (isStoreState(state)) {
//     try {
//       const result = (await registerAPI(args)).data;
//       const {user, token, type} = result;

//       addTokenToSecureStore(token);

//       return {user, token, type};
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   } else {
//     return thunkAPI.rejectWithValue('No store found!');
//   }
// });
