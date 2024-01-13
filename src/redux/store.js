import { configureStore } from "@reduxjs/toolkit";
import toggleThemes from "./toggleThemes.js";

// creating the store and passing the reducer
// this store is going to be passed to the provider in the main.jsx file
// so the whole app can access all the reducers
export const store = configureStore({
  // we need to pass an object with all of our slices reducers
  reducer: {
    // we named the reducer theme so we can access it like this state.theme
    // we can name it anything we want, and we pass the reducer from the toggleThemes.js file
    theme: toggleThemes.reducer,
  },
});
