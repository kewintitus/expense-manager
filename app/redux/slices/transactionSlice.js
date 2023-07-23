const { createSlice } = require('@reduxjs/toolkit');

const initialState = [];

const transactionSlice = createSlice({
  name: 'userTransactions',
  initialState,
  reducers: {
    setTransactions(state, action) {
      console.log(action.payload);
      state = action.payload;
      return action.payload;
    },
  },
});

export const selectTransactionData = (state) => {
  return state;
};

export const { setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
