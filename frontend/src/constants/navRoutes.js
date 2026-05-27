export const NAV_ROUTES = {
    // Public
    HOME: "/",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",

    // Dashboard
    DASHBOARD: "/edu/dashboard",
    FORCE_CHANGE_PASSWORD: "/edu/change-password",

    // User Profile
    USER_PROFILE: "/edu/user-profile",

    // Users
    USERS: "/edu/users",
    USER_CREATE: "/edu/users/create",
    USER_EDIT: "/edu/users/:id/edit",
    USER_DETAILS: "/edu/users/:id",

    // Branches
    BRANCHES: "/branches",
    BRANCH_CREATE: "/branches/create",
    BRANCH_EDIT: "/branches/:id/edit",
    BRANCH_DETAILS: "/branches/:id",

    // PRODUCTS
    PRODUCTS: "/edu/products",
    PRODUCT_CREATE: "/edu/products/create",
    PRODUCT_EDIT: "/edu/products/:id/edit",

    // Inventory
    INVENTORY: "/edu/inventory",
    INVENTORY_CREATE: "/edu/inventory/create",
    INVENTORY_EDIT: "/edu/inventory/:id/edit",

    // Assets
    ASSETS: "/edu/assets",
    ASSET_CREATE: "/edu/assets/create",
    ASSET_EDIT: "/edu/assets/:id/edit",
    ASSET_DETAILS: "/edu/assets/:id",

    // Purchases
    PURCHASES: "/edu/purchases",
    PURCHASE_CREATE: "/edu/purchases/create",

    // Maintenance
    // MAINTENANCE: "/edu/maintenance",

    // Reports
    REPORTS: "/edu/reports",

    // Audit Logs
    // AUDIT_LOGS: "/edu/audit-logs",

    // Settings
    SETTINGS: "/edu/settings",

    //Logout
    LOGOUT: "/edu/logout",

    UNAUTHORIZED: "/401",  
    // 404
    NOT_FOUND: "*",
    FORBIDDEN: "/edu/403",
    SERVER_ERROR: "/500",  
};

const ROUTES = {
    HOME: "/",

    LOGIN: "/auth/login",

    DASHBOARD: "/edu/dashboard",

    USERS: "/edu/users",

    //INVENTORY
    PRODUCTS: "/edu/products",    

    INVENTORY: "/edu/inventory",

    BRANCH_TRANSFERS: "/edu/branch-transfers",

    //ASSETS
    ASSETS: "/edu/assets",

    // PURCHASES
    VENDORS: "/edu/vendors",

    PURCHASE_REQUESTS: "/edu/purchase-requests",

    PURCHASE_ORDERS: "/edu/purchase-orders",

    GOODS_RECEIVED: "/edu/goods-received",
};