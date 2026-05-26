import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createStockMovementAPI,
    getStockMovementsAPI
} from "./services/stockAPI";

/* STOCK IN / OUT SINGLE THUNK */
export const stockMovementThunk = createAsyncThunk(
    "inventory/stockMovement",
    async (payload, thunkAPI) => {
        try {
            return await createStockMovementAPI(payload);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchStockMovementsThunk =
    createAsyncThunk(
        "inventory/fetchStockMovements",
        async (_, thunkAPI) => {
            try {
                return await getStockMovementsAPI();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );