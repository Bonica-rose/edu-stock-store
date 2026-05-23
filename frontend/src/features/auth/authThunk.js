import { createAsyncThunk } from "@reduxjs/toolkit";

// import { registerAPI, loginAPI } from "./services/authAPI";
import { loginUser, registerUser } from "./services/authAPI";

export const registerUserThunk =
    createAsyncThunk(
        "auth/registerUser",
        async (userData,thunkAPI) => {
            try {
                const response = await registerUser(userData);
                return response;
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
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );    