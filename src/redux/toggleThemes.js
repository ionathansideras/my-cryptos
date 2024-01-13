import { createSlice } from "@reduxjs/toolkit";
import { getThemeColor, setThemeColor } from "../helpers/handleLocalStorage.js";

// we need to create a slice to be able to use the reducer and actions
export const toggleThemes = createSlice({
    name: "theme",
    // we need to set the initial state of the reducer and it should be the same as the one in the local storage
    // else it will be set to the default value to be dark
    initialState: getThemeColor() || "dark",
    // creating mini reducers to be able to change the state
    reducers: {
        // when we refer to state it refers to the current state of the reducer not the whole store
        changeTheme: (state) => {
            // we need to get the current state and change it to the opposite
            let newState = state === "dark" ? "light" : "dark";
            // we need to save the new state in the local storage
            setThemeColor(newState);
            // we need to return the new state so the state can be updated
            // since we don't direclty mutate the state
            return newState;
        },
    },
});

// we need to export the actions to be able to use them,
// actions are the functions that are going to change the state with the dispatch
// this basically returns the action object witch it looks like this
// { type: "theme/changeTheme", payload: 'something in here'}
export const { changeTheme } = toggleThemes.actions;
// we need to export the reducer as well to be able to use it in the store
export default toggleThemes;
