import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
