import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loadingBarSlice = createSlice({
  name: 'loadingBar',
  initialState,
  reducers: {
    showLoading: () => true,
    hideLoading: () => false,
  },
});

export const { showLoading, hideLoading } = loadingBarSlice.actions;
export default loadingBarSlice.reducer;
