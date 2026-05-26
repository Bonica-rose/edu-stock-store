import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    markAssetDamagedAPI,
    returnFromMaintenanceAPI,
    sendToMaintenanceAPI,
    moveAssetBranchAPI,
    assignAssetAPI,
    getAssetHistoryAPI,
    updateAssetStatusAPI,
} from "./services/assetAPI";

export const fetchAssetHistoryThunk = createAsyncThunk("asset/fetchHistory",async (asset_id, thunkAPI) => {
    try {
        return await getAssetHistoryAPI(asset_id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const assignAssetThunk = createAsyncThunk("asset/assign",async (payload, thunkAPI) => {
    try {
        return await assignAssetAPI(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
}); 

export const moveAssetBranchThunk = createAsyncThunk("asset/moveBranch",async (data, thunkAPI) => {
    try {
        return await moveAssetBranchAPI(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
}); 
    
export const maintenanceThunk = createAsyncThunk("asset/maintenance",async (payload, thunkAPI) => {
    try {
        return await sendToMaintenanceAPI(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});   

export const returnFromMaintenanceThunk = createAsyncThunk("asset/returnMaintenance",async (data, thunkAPI) => {
    try {
        return await returnFromMaintenanceAPI(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});  
    
export const markAssetDamagedThunk = createAsyncThunk("asset/markDamaged", async (data, thunkAPI) => {
    try {
        return await markAssetDamagedAPI(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
}); 

export const updateAssetStatusThunk = createAsyncThunk("asset/statusChange",async (payload, thunkAPI) => {
    try {
        return await updateAssetStatusAPI(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
}); 