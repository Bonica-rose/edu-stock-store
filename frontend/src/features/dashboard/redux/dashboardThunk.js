import { createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardAPI } from "../services/dashboardAPI";

export const fetchDashboardThunk = createAsyncThunk(
    "dashboard/fetchDashboard",
    async (_, thunkAPI) => {
        try {
            const response = await dashboardAPI();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
