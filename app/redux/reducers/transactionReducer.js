const initialState = [];

const transactionReducer = (state = initialState, action) => {
  console.log('Updating....');
  console.log(action);
  if (action.type === 'updateUserTransactions') {
    return action.data;
  }
  return state;
};

export const transactionSlice = (state) => {
  return state;
};

// export default transactionReducer;
