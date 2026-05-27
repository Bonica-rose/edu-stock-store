import {
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getAllVendorsAPI,
    getVendorByIdAPI,
    createVendorAPI,
    updateVendorAPI,
    deleteVendorAPI,
} from "../services/vendorAPI";

// =========================================
// FETCH ALL VENDORS
// =========================================
export const fetchVendorsThunk =
    createAsyncThunk(
        "vendors/fetchVendors",

        async (_, thunkAPI) => {

            try {

                return await getAllVendorsAPI();

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );

// =========================================
// FETCH VENDOR BY ID
// =========================================
export const fetchVendorByIdThunk =
    createAsyncThunk(
        "vendors/fetchVendorById",

        async (id, thunkAPI) => {

            try {

                return await getVendorByIdAPI(id);

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );

// =========================================
// CREATE VENDOR
// =========================================
export const createVendorThunk =
    createAsyncThunk(
        "vendors/createVendor",

        async (
            vendorData,
            thunkAPI
        ) => {

            try {

                return await createVendorAPI(
                    vendorData
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );

// =========================================
// UPDATE VENDOR
// =========================================
export const updateVendorThunk =
    createAsyncThunk(
        "vendors/updateVendor",

        async (
            {
                id,
                vendorData,
            },
            thunkAPI
        ) => {

            try {

                return await updateVendorAPI(
                    id,
                    vendorData
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );

// =========================================
// DELETE VENDOR
// =========================================
export const deleteVendorThunk =
    createAsyncThunk(
        "vendors/deleteVendor",

        async (id, thunkAPI) => {

            try {

                await deleteVendorAPI(id);

                return id;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.message
                );
            }
        }
    );