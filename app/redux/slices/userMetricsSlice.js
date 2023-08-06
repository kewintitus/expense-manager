const { createSlice } = require('@reduxjs/toolkit');

const initialState = {};

const metricsSlice = createSlice({
  name: 'userMetrics',
  initialState,
  reducers: {
    setUserMetrics(state, action) {
      state = action.payload;
      return action.payload;
    },
  },
});

export const selectUserMetrics = (state) => {
  return state;
};

export const { setUserMetrics } = metricsSlice.actions;
export default metricsSlice.reducer;
