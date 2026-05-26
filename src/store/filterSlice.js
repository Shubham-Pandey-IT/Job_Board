import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    type: "",
    role: "",
    search: "",
  },
  reducers: {
    setAiFilter: (state, action) => {
      state.type = action.payload.type;
      state.role = action.payload.role;
      state.search = action.payload.search;
    },
    resetFilter: (state) => {
      state.type = "";
      state.role = "";
      state.search = "";
    },
  },
});

export const { setAiFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;