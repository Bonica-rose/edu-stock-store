import { createAsyncThunk } from "@reduxjs/toolkit";

import mockDashboardAPI
    from "../services/dashboardAPI";

export const fetchDashboardThunk =
    createAsyncThunk(
        "dashboard/fetchDashboard",
        async (_, thunkAPI) => {

            try {

                const response =
                    await mockDashboardAPI();

                return response;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );