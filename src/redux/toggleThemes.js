import { createSlice } from "@reduxjs/toolkit";
import { getThemeColor, setThemeColor } from "../helpers/handleLocalStorage.js";
const initialState = {
  value: getThemeColor() || "dark",
};

export const toggleThemes = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = state.value === "dark" ? "light" : "dark";
      setThemeColor(state.value);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = toggleThemes.actions;

export default toggleThemes.reducer;
