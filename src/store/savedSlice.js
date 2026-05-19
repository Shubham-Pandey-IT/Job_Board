import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "saved",
  initialState: {
    savedJobs: [],
  },
  reducers: {
    addSaved: (state, action) => {
      state.savedJobs.push(action.payload);
    },
    removeSaved: (state, action) => {
      state.savedJobs = state.savedJobs.filter((j) => j.id !== action.payload);
    },
  },
});

export const { addSaved, removeSaved } = savedSlice.actions;
export default savedSlice.reducer;