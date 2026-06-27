import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser: (_state, action) => action.payload,
    unsetAuthUser: () => null,
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;
