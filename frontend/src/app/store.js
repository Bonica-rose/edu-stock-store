import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/ui/uiSlice";
import userReducer from "../features/users/userSlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import assetReducer from "../features/inventory/assetSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        users: userReducer,
        inventory: inventoryReducer,
        asset: assetReducer,
    },
});