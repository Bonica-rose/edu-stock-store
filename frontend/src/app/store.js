import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/ui/uiSlice";
import userReducer from "../features/users/userSlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import assetReducer from "../features/inventory/assetSlice";
import dashboardReducer from "../features/dashboard/redux/dashboardSlice";
import vendorReducer from "../features/purchases/vendors/redux/vendorSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        users: userReducer,
        inventory: inventoryReducer,
        asset: assetReducer,
        dashboard: dashboardReducer,
        vendors: vendorReducer,
    },
});