import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {
    setLeaderboards: (_state, action) => action.payload,
  },
});

export const { setLeaderboards } = leaderboardsSlice.actions;
export default leaderboardsSlice.reducer;
