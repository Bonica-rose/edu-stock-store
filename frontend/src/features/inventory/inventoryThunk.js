import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProductsAPI,
    getProductByIdAPI,
    createProductAPI,
    updateProductAPI,
    deleteProductAPI,
    updateProductStatusAPI,
    updateAssetStatusAPI,
} from "./services/inventoryAPI";

/* FETCH PRODUCTS */
export const fetchProductsThunk = createAsyncThunk(
    "inventory/fetchProducts",
    async (_, thunkAPI) => {
        try {
            return await getProductsAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* FETCH PRODUCT BY ID */
export const fetchProductByIdThunk = createAsyncThunk(
    "inventory/fetchProductById",
    async (id, thunkAPI) => {
        try {
            return await getProductByIdAPI(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* CREATE PRODUCT */
export const createProductThunk = createAsyncThunk(
    "inventory/createProduct",
    async (data, thunkAPI) => {
        try {
            return await createProductAPI(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* UPDATE PRODUCT */
export const updateProductThunk = createAsyncThunk(
    "inventory/updateProduct",
    async ({ id, data }, thunkAPI) => {
        try {
            return await updateProductAPI(id, data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* DELETE PRODUCT */
export const deleteProductThunk = createAsyncThunk(
    "inventory/deleteProduct",
    async (id, thunkAPI) => {
        try {
            await deleteProductAPI(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* UPDATE PRODUCT STATUS */
export const updateProductStatusThunk = createAsyncThunk(
    "inventory/updateProductStatus",
    async (payload, thunkAPI) => {
        try {
            return await updateProductStatusAPI(payload);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* UPDATE ASSET STATUS */
export const updateAssetStatusThunk = createAsyncThunk(
    "inventory/updateAssetStatus",
    async (payload, thunkAPI) => {
        try {
            return await updateAssetStatusAPI(payload);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
