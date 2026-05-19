import { createSlice } from "@reduxjs/toolkit";

const trackerSlice = createSlice({
  name: "tracker",
  initialState: {
    trackerJobs: [],
  },
  reducers: {
    addTracker: (state, action) => {
      state.trackerJobs.push(action.payload);
    },
    removeTracker: (state, action) => {
      state.trackerJobs = state.trackerJobs.filter((j) => j.id !== action.payload);
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const job = state.trackerJobs.find((j) => j.id === id);
      if (job) job.status = status;
    },
  },
});

export const { addTracker, removeTracker, updateStatus } = trackerSlice.actions;
export default trackerSlice.reducer;