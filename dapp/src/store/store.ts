'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { unauthenticatedApi } from '@/api/auth';
import { campaignPaymentReducer } from '@/slices/campaignPaymentSlice';

import storage from './customStorage';
import { authApi, globalApi } from '../api';
import {
  CAMPAIGN_PAYMENT_REDUCER_PATH,
  GLOBAL_API_REDUCER_PATH,
} from '../constants/appConstants';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [
    GLOBAL_API_REDUCER_PATH,
    CAMPAIGN_PAYMENT_REDUCER_PATH,
    authApi.reducerPath,
    unauthenticatedApi.reducerPath,
  ],
};

const rootReducer = combineReducers({
  [globalApi.reducerPath]: globalApi.reducer,
  [unauthenticatedApi.reducerPath]: unauthenticatedApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [CAMPAIGN_PAYMENT_REDUCER_PATH]: campaignPaymentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const concatMiddleWare = [
  globalApi.middleware,
  authApi.middleware,
  unauthenticatedApi.middleware,
];

// if (!isProd) {
//   concatMiddleWare.push(logger);
// }

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(concatMiddleWare),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
