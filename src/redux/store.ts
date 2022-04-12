import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import { collectionsApi } from './modules/collections/queries';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
};

// export const transformCircular = createTransform(
//   (inboundState, key) => Flatted.stringify(inboundState),
//   (outboundState, key) => Flatted.parse(outboundState),
// )

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = rootReducer;

const logger = createLogger({
  collapsed: true,
  logger: console,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
  middleware: [logger, thunk, collectionsApi.middleware],
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
setupListeners(store.dispatch);

export default store;
