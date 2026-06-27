import { createSlice } from '@reduxjs/toolkit';

const initialState = null; // null artinya "Semua kategori"

const activeCategorySlice = createSlice({
  name: 'activeCategory',
  initialState,
  reducers: {
    setActiveCategory: (_state, action) => action.payload,
  },
});

export const { setActiveCategory } = activeCategorySlice.actions;
export default activeCategorySlice.reducer;
