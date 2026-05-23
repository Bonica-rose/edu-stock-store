import { createSlice } from "@reduxjs/toolkit";
import { registerUserThunk, loginUserThunk } from "./authThunk";
import { STORAGE_KEYS } from "../../constants/storageKeys";
import { setStorage } from "../../utils/storage";
import { initializeAuth } from "../../utils/initializeAuth";

const auth = initializeAuth();

const initialState = {
    // user: null,
    // token: null,
    // permissions: [],
    // isAuthenticated: false,

    user: auth.user,
    token: auth.token,
    permissions: auth.permissions,
    isAuthenticated: auth.isAuthenticated,

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
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        clearAuthError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        // REGISTER
        builder
            .addCase(registerUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(registerUserThunk.fulfilled, (state) => {
                state.loading = false;
            }
            )
            .addCase(registerUserThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
        
        // LOGIN
        builder
            .addCase( loginUserThunk.pending,(state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(loginUserThunk.fulfilled,(state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.permissions = action.payload.permissions;
                    state.isAuthenticated = true;
                
                    setStorage(STORAGE_KEYS.TOKEN, action.payload.token);
                    setStorage(STORAGE_KEYS.USER, action.payload.user);
                }
            )
            .addCase(loginUserThunk.rejected,(state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
        
},
});

export const {
    setCredentials,
    logout,
    setLoading,
    setError,
    clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;