import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const appSlice = createSlice({
  name: "gitusers",
  initialState,
  reducers: {
    set: (state, action) => {
      return [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { set } = appSlice.actions;

export default appSlice.reducer;
