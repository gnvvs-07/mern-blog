// complete dark mode and light mode functionality

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
}; //initial theme/state

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;