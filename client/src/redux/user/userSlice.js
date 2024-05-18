import { createSlice } from "@reduxjs/toolkit";
// initial state
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

// slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login
    signInStart: (state) => {
      //state:login functionality active
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      //sign in functionality - completed success
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      //sign in functionality - completed failure
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

// export reducers
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions;

// export default reducer
export default userSlice.reducer;
