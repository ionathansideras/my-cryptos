import { configureStore } from "@reduxjs/toolkit";
import toggleThemes from "./toggleThemes.js";

export const store = configureStore({
  reducer: {
    theme: toggleThemes.reducer,
  },
});
