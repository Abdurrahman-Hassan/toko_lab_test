import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slice/appslice";
export const store = configureStore({
  reducer: {
    appslice: appSlice,
  },
});
