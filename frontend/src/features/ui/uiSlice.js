import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarOpen: true,
    theme: "light",
};

const uiSlice = createSlice({
    name: "ui",
    initialState,

    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },

        closeSidebar: (state) => {
            state.sidebarOpen = false;
        },

        openSidebar: (state) => {
            state.sidebarOpen = true;
        },

        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const {
    toggleSidebar,
    closeSidebar,
    openSidebar,
    setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;