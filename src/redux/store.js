import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import loadingReducer from './redducers/loading';
import sidebar from './redducers/sidebar';
import userReucer from './redducers/user';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReucer,
    sidebar: sidebar,
  },
  middleware: [logger],
  devTools: process.env.NODE_ENV !== 'production',
});
