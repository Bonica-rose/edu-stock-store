import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getUsersAPI,
    getActiveUsersAPI,
    createUserAPI,
    updateUserAPI,
    deleteUserAPI,
    getUserByIdAPI,
    updateUserStatusAPI,
} from "./services/userAPI";

export const fetchUsersThunk =
    createAsyncThunk(
        "users/fetchUsers",
        async (_, thunkAPI) => {
            try {
                return await getUsersAPI();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );

export const fetchActiveUsersThunk =
    createAsyncThunk(
        "users/fetchActiveUsers",
        async (_, thunkAPI) => {
            try {
                return await getActiveUsersAPI();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );    

export const fetchUserByIdThunk =
    createAsyncThunk(
        "users/fetchUserById",
        async (id, thunkAPI) => {
            try {
                return await getUserByIdAPI(id);
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );

export const createUserThunk =
    createAsyncThunk(
        "users/createUser",
        async (data, thunkAPI) => {
            try {
                return await createUserAPI(data);
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );

export const updateUserThunk =
    createAsyncThunk(
        "users/updateUser",
        async ({ id, data },thunkAPI) => {
            try {
                return await updateUserAPI(id,data);
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );   

export const updateUserStatusThunk = createAsyncThunk(
    "users/updateUserStatus",
    async ({ id, status }, thunkAPI) => {
        try {
            return await updateUserStatusAPI({ id, status });
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update status"
            );
        }
    }
);    

export const deleteUserThunk =
    createAsyncThunk(
        "users/deleteUser",
        async (id, thunkAPI) => {
            try {
                return await deleteUserAPI(id);
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );