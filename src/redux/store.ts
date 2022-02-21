import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const logger = createLogger({
  collapsed: true,
  logger: console,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, thunk],
});

const listener = () => {
  // const storeData = store.getState();
  /* To add after login/register functionality
   if (storeData.profile.jwt) {
     api.defaults.headers.common.Authorization = `Bearer ${storeData.profile.jwt}`;
   }
   */
};

store.subscribe(listener);

export default store;
