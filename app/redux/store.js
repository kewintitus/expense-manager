import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice';
import userMetricsSlice from './slices/userMetricsSlice';
// import transactionReducer from './reducers/transactionReducer';

export const store = configureStore({
  reducer: {
    transactionReducer: transactionReducer,
    userMetricsReducer: userMetricsSlice,
  },
});
