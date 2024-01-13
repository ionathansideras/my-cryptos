import { createSlice } from "@reduxjs/toolkit";
import { getThemeColor, setThemeColor } from "../helpers/handleLocalStorage.js";

export const toggleThemes = createSlice({
  name: "theme",
  initialState:  getThemeColor() || "dark",
  reducers: {
    changeTheme: (state) => {
      let newState = state === "dark" ? "light" : "dark";
      setThemeColor(newState);
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = toggleThemes.actions;

export default toggleThemes;