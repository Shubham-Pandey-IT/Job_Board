import { configureStore } from "@reduxjs/toolkit";
import savedReducer from "./savedSlice";
import trackerReducer from "./trackerSlice";
import darkReducer from "./darkSlice";

const store = configureStore({
  reducer: {
    saved: savedReducer,
    tracker: trackerReducer,
    dark: darkReducer,
  },
});

export default store;