import { createSlice } from "@reduxjs/toolkit";
import {
    fetchProductsThunk,
    createProductThunk,
    updateProductThunk,
    deleteProductThunk,
    updateProductStatusThunk,
    updateAssetStatusThunk,
} from "./inventoryThunk";

import {
    stockMovementThunk,
    fetchStockMovementsThunk,
} from "./stockThunk";

const initialState = {
    products: [],
    selectedProduct: null,
    stockMovements: [],
    loading: false,
    error: null,
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
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
            })
        
            // STOCK MOVEMENT
            .addCase(stockMovementThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(stockMovementThunk.fulfilled, (state, action) => {
                state.loading = false;

                const { product, movement } = action.payload;

                // update product
                const index = state.products.findIndex(
                    (p) => p.id === product.id
                );

                if (index !== -1) {
                    state.products[index] = product;
                }

                // add movement
                state.stockMovements.unshift(movement);
            })

            .addCase(stockMovementThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        
        .addCase(fetchStockMovementsThunk.fulfilled,(state, action) => {
            state.stockMovements = action.payload;
        })
    },
});

export const { setSelectedProduct } = inventorySlice.actions;
export default inventorySlice.reducer;
