import { createSlice } from "@reduxjs/toolkit";
import {
    assignAssetThunk,
    moveAssetBranchThunk,
    maintenanceThunk,
    updateAssetStatusThunk,
    fetchAssetHistoryThunk,
} from "./assetThunk";

const initialState = {
    assetHistory: [],
    selectedAsset: null,

    loading: false,
    actionLoading: false,
    error: null,
};

const assetSlice = createSlice({
    name: "asset",
    initialState,
    reducers: {
        clearAssetState: (state) => {
            state.assetHistory = [];
            state.selectedAsset = null;
            state.error = null;
        },

        setSelectedAsset: (state, action) => {
            state.selectedAsset = action.payload;
        },
    },

    extraReducers: (builder) => {

        // FETCH ASSET HISTORY
        builder
            .addCase(fetchAssetHistoryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchAssetHistoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.assetHistory = action.payload;
            })

            .addCase(fetchAssetHistoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // ASSIGN ASSET 
        builder
            .addCase(assignAssetThunk.pending, (state) => {
                state.actionLoading = true;
            })

            .addCase(assignAssetThunk.fulfilled, (state, action) => {
                state.actionLoading = false;

                state.assetHistory.unshift(action.payload);
            })

            .addCase(assignAssetThunk.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.error.message;
            });

        // MOVE BRANCH
        builder
            .addCase(
                moveAssetBranchThunk.pending,
                (state) => {
                    state.actionLoading = true;
                }
            )

            .addCase(
                moveAssetBranchThunk.fulfilled,
                (state, action) => {
                    state.actionLoading = false;

                    state.assetHistory.push(
                        action.payload
                    );
                }
            )

            .addCase(
                moveAssetBranchThunk.rejected,
                (state, action) => {
                    state.actionLoading = false;
                    state.error = action.payload;
                }
            )

        // MAINTENANCE
        builder
            .addCase(maintenanceThunk.fulfilled, (state, action) => {
                state.assetHistory.unshift(action.payload);
            });

        // STATUS CHANGE
        builder
            .addCase(updateAssetStatusThunk.fulfilled, (state, action) => {
                state.assetHistory.unshift(action.payload);
            });
    },
});

export const {
    clearAssetState,
    setSelectedAsset,
} = assetSlice.actions;

export default assetSlice.reducer;