import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarCollapsed: false,
    mobileSidebarOpen: false,
    theme: "light",
};

const uiSlice = createSlice({
    name: "ui",
    initialState,

    reducers: {
        toggleSidebar: (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
        },

        openMobileSidebar: (state) => {
            state.mobileSidebarOpen = true;
        },

        closeMobileSidebar: (state) => {
            state.mobileSidebarOpen = false;
        },

        toggleMobileSidebar: (state) => {
            state.mobileSidebarOpen = !state.mobileSidebarOpen;
        },

        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const {
    toggleSidebar,
    openMobileSidebar,
    closeMobileSidebar,
    toggleMobileSidebar,
    setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;