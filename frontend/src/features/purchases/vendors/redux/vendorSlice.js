import {
    createSlice,
} from "@reduxjs/toolkit";

import {
    fetchVendorsThunk,
    fetchVendorByIdThunk,
    createVendorThunk,
    updateVendorThunk,
    deleteVendorThunk,
} from "./vendorThunk";

const initialState = {
    vendors: [],
    selectedVendor: null,
    loading: false,
    error: null,
};

const vendorSlice = createSlice({
    name: "vendors",
    initialState,
    reducers: {

        clearSelectedVendor:
            (state) => {
                state.selectedVendor =
                    null;
            },
    },

    extraReducers: (builder) => {

        builder

            // =========================================
            // FETCH ALL
            // =========================================
            .addCase(
                fetchVendorsThunk.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )

            .addCase(
                fetchVendorsThunk.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.vendors =
                        action.payload;
                }
            )

            .addCase(
                fetchVendorsThunk.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )

            // =========================================
            // FETCH BY ID
            // =========================================
            .addCase(
                fetchVendorByIdThunk.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )

            .addCase(
                fetchVendorByIdThunk.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.selectedVendor =
                        action.payload;
                }
            )

            .addCase(
                fetchVendorByIdThunk.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )

            // =========================================
            // CREATE
            // =========================================
            .addCase(
                createVendorThunk.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )

            .addCase(
                createVendorThunk.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.vendors.unshift(
                        action.payload
                    );
                }
            )

            .addCase(
                createVendorThunk.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )

            // =========================================
            // UPDATE
            // =========================================
            .addCase(
                updateVendorThunk.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )

            .addCase(
                updateVendorThunk.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.vendors =
                        state.vendors.map(
                            (vendor) => {

                                if (
                                    vendor.id ===
                                    action.payload.id
                                ) {

                                    return action.payload;
                                }

                                return vendor;
                            }
                        );

                    state.selectedVendor =
                        action.payload;
                }
            )

            .addCase(
                updateVendorThunk.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )

            // =========================================
            // DELETE
            // =========================================
            .addCase(
                deleteVendorThunk.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;
                }
            )

            .addCase(
                deleteVendorThunk.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.vendors =
                        state.vendors.filter(
                            (vendor) =>
                                String(vendor.id) !==
                                String(action.payload)
                        );
                }
            )

            .addCase(
                deleteVendorThunk.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            );
    },
});

export const {
    clearSelectedVendor,
} = vendorSlice.actions;

export default vendorSlice.reducer;