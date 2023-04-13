import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import loadingReducer from './redducers/loading';
import userReucer from './redducers/user';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReucer,
  },
  middleware: [logger],
  devTools: process.env.NODE_ENV !== 'production',
});
