'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import storage from './customStorage';
import { globalApi } from '../api';
import { GLOBAL_API_REDUCER_PATH } from '../constants/appConstants';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [GLOBAL_API_REDUCER_PATH],
};

const rootReducer = combineReducers({
  [globalApi.reducerPath]: globalApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const concatMiddleWare = [globalApi.middleware];

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
