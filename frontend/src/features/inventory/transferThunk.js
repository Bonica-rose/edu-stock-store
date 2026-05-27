import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createBranchTransferAPI,
    getBranchTransfersAPI,
    getTransferByIdAPI,
} from "./services/transferAPI";

/* CREATE BRANCH TRANSFER */
export const createBranchTransferThunk =
    createAsyncThunk("inventory/createBranchTransfer",async (payload, thunkAPI) => {
        try {
            return await createBranchTransferAPI(payload);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

/* FETCH BRANCH TRANSFERS */
export const fetchBranchTransfersThunk =
    createAsyncThunk("inventory/fetchBranchTransfers",async (_, thunkAPI) => {
        try {
            return await getBranchTransfersAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const fetchTransferByIdThunk =
    createAsyncThunk("inventory/fetchTransferById", async (id, thunkAPI) => {
        try {
            return await getTransferByIdAPI(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);    