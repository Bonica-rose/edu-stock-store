import { createSlice } from "@reduxjs/toolkit";
import {
    fetchProductsThunk,
    createProductThunk,
    updateProductThunk,
    deleteProductThunk,
    updateProductStatusThunk,
    updateAssetStatusThunk,
} from "./inventoryThunk";

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* FETCH PRODUCTS */
            .addCase(fetchProductsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* CREATE PRODUCT */
            .addCase(createProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products.unshift(action.payload);
            })
            .addCase(createProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* UPDATE PRODUCT */
            .addCase(updateProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((product) =>
                    String(product.id) === String(action.payload.id) ? action.payload : product
                );
            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* DELETE PRODUCT */
            .addCase(deleteProductThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    (product) => String(product.id) !== String(action.payload)
                );
            })
            .addCase(deleteProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* PRODUCT STATUS MODIFICATION */
            .addCase(updateProductStatusThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductStatusThunk.fulfilled, (state, action) => {
                state.loading = false;
                const { id, status } = action.payload;
                const product = state.products.find((item) => String(item.id) === String(id));
                if (product) product.status = status;
            })
            .addCase(updateProductStatusThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ASSET STATUS MODIFICATION */
            .addCase(updateAssetStatusThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAssetStatusThunk.fulfilled, (state, action) => {
                state.loading = false;
                const { id, asset_status } = action.payload;
                const product = state.products.find((item) => String(item.id) === String(id));
                if (product) product.asset_status = asset_status;
            })
            .addCase(updateAssetStatusThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default inventorySlice.reducer;
