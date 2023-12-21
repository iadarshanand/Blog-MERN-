import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    // Add other slices or reducers as needed
  },
});

export default store;
