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

    // Inventory
    INVENTORY: "/inventory",
    INVENTORY_CREATE: "/inventory/create",
    INVENTORY_EDIT: "/inventory/:id/edit",

    // Assets
    ASSETS: "/assets",
    ASSET_CREATE: "/assets/create",
    ASSET_EDIT: "/assets/:id/edit",
    ASSET_DETAILS: "/assets/:id",

    // Purchases
    PURCHASES: "/purchases",
    PURCHASE_CREATE: "/purchases/create",

    // Maintenance
    // MAINTENANCE: "/maintenance",

    // Reports
    REPORTS: "/reports",

    // Audit Logs
    // AUDIT_LOGS: "/audit-logs",

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