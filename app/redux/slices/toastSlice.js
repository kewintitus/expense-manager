const { createSlice } = require('@reduxjs/toolkit');

const initialState = [];

const toastSlice = createSlice({
  name: 'toastNotification',
  initialState,
  reducers: {
    setToast(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const selectToast = (state) => {
  console.log(state);
  return state;
};

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
