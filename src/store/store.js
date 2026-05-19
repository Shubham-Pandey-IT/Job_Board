import { configureStore } from "@reduxjs/toolkit";
import savedReducer from "./savedSlice";
import trackerReducer from "./trackerSlice";

const store = configureStore({
  reducer: {
    saved: savedReducer,
    tracker: trackerReducer,
  },
});

export default store;