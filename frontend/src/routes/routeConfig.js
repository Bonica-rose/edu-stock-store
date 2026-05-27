export const ROUTES = {
    // Public
    HOME: "/",
    LOGIN: "login",
    REGISTER: "register",
    FORGOT_PASSWORD: "forgot-password",

    // Dashboard
    DASHBOARD: "dashboard",
    FORCE_CHANGE_PASSWORD: "change-password",

    // Users
    USERS: "users",
    USER_CREATE: "users/create",
    USER_EDIT: "users/:id/edit",
    USER_DETAILS: "users/:id",

    // Branches
    BRANCHES: "branches",
    BRANCH_CREATE: "branches/create",
    BRANCH_EDIT: "branches/:id/edit",
    BRANCH_DETAILS: "branches/:id",

    // PRODUCTS
    PRODUCTS: "products",
    PRODUCT_CREATE: "products/create",
    PRODUCT_EDIT: "products/:id/edit",

    // Assets
    ASSETS: "assets",
    ASSET_CREATE: "assets/create",
    ASSET_EDIT: "assets/:id/edit",
    ASSET_DETAILS: "assets/:id",

    // Inventory
    INVENTORY: "inventory",
    INVENTORY_CREATE: "inventory/create",
    INVENTORY_EDIT: "inventory/:id/edit", 
    
    //Branch Transfer
    BRANCH_TRANSFERS: "transfers",
    BRANCH_TRANSFER_CREATE: "transfers/create",

    // Purchases
    PURCHASES: "purchases",
    PURCHASE_CREATE: "purchases/create",

    // Maintenance
    MAINTENANCE: "maintenance",

    // Reports
    REPORTS: "reports",

    // Audit Logs
    AUDIT_LOGS: "audit-logs",

    // Settings
    SETTINGS: "settings",
    
    UNAUTHORIZED: "401",
    FORBIDDEN: "/edu/403",
    NOT_FOUND: "*", // 404
    SERVER_ERROR: "500",    
};