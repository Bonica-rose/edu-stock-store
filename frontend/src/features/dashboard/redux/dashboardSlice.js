import { createSlice } from "@reduxjs/toolkit";

import {
    fetchDashboardThunk,
} from "./dashboardThunk";

const initialState = {

    // stats: [],   

    stats: {
        total_products: 0,
        total_assets: 0,
        low_stock_count: 0,
        total_branches: 0,
    },

    inventoryOverview: [],
    assetStatusOverview: [],

    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                fetchDashboardThunk.pending,
                (state) => {

                    state.loading = true;
                }
            )

            .addCase(
                fetchDashboardThunk.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.stats =
                        action.payload.stats;

                    state.inventoryOverview =
                        action.payload.inventory_overview;

                    state.assetStatusOverview =
                        action.payload.asset_status_overview;
                }
            )

            .addCase(
                fetchDashboardThunk.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            );
    },
});

export default dashboardSlice.reducer;