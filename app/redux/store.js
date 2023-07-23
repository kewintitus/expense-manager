import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice';
// import transactionReducer from './reducers/transactionReducer';

export const store = configureStore({
  reducer: {
    transactionReducer: transactionReducer,
  },
});
