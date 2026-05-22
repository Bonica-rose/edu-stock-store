import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    permissions: [],
    isAuthenticated: false,

    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.permissions = action.payload.permissions || [];
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.permissions = [];
            state.isAuthenticated = false;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },

        clearAuthError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setCredentials,
    logout,
    clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;