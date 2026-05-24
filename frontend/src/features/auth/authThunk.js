import { createAsyncThunk } from "@reduxjs/toolkit";

// import { registerAPI, loginAPI } from "./services/authAPI";
import { loginUser, registerUser, forceChangePassword } from "./services/authAPI";

export const registerUserThunk =
    createAsyncThunk(
        "auth/registerUser",
        async (userData,thunkAPI) => {
            try {
                return await registerUser(userData);
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    );

export const loginUserThunk =
    createAsyncThunk(
        "auth/loginUser",
        async (data, thunkAPI) => {
            try {
                return await loginUser(data);
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    );    

export const changePasswordThunk = createAsyncThunk(
    "auth/changePassword",
    async ({userId, mailId, newPassword}, thunkAPI) => {
        try {
            return await forceChangePassword({userId, mailId, newPassword});
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);    