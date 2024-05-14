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
  },
});


// export reducers
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

// export default reducer
export default userSlice.reducer;