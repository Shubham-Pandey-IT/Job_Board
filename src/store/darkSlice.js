import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
  name: "dark",
  initialState: {
    isDark: false,
  },
  reducers: {
    toggleDark: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleDark } = darkSlice.actions;
export default darkSlice.reducer;