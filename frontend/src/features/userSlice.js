import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.status = "loading";
    },
    fetchUserSuccess: (state, action) => {
      state.status = "success";
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.user = "";
    },
    fetchUserLogout: (state) => {
      state.status = "idle";
      state.user = "";
      state.error = "";
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  fetchUserLogout,
} = userSlice.actions;
export default userSlice.reducer;
