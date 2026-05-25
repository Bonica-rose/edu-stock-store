import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    assignAssetAPI,
    moveAssetBranchAPI,
    sendToMaintenanceAPI,
    updateAssetStatusAPI,
    getAssetHistoryAPI,
} from "./services/assetAPI";

export const fetchAssetHistoryThunk =
    createAsyncThunk(
        "asset/fetchHistory",
        async (asset_id, thunkAPI) => {
            try {
                const data =
                    await getAssetHistoryAPI(
                        asset_id
                    );

                return data;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );

export const assignAssetThunk =
    createAsyncThunk(
        "asset/assign",
        async (payload, thunkAPI) => {
            try {
                const data =
                    await assignAssetAPI(
                        payload
                    );

                return data;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );
    
export const moveAssetThunkk =
    createAsyncThunk(
        "asset/move",
        async (payload, thunkAPI) => {
            try {
                const data =
                    await moveAssetBranchAPI(
                        payload
                    );

                return data;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );

export const moveAssetBranchThunk =
    createAsyncThunk(
        "asset/moveBranch",

        async (data, thunkAPI) => {
            try {
                return await moveAssetBranchAPI(data);
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );    
    
export const maintenanceThunk =
    createAsyncThunk(
        "asset/maintenance",
        async (payload, thunkAPI) => {
            try {
                const data =
                    await sendToMaintenanceAPI(
                        payload
                    );

                return data;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );
    
export const updateAssetStatusThunk =
    createAsyncThunk(
        "asset/statusChange",
        async (payload, thunkAPI) => {
            try {
                const data =
                    await updateAssetStatusAPI(
                        payload
                    );

                return data;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );    