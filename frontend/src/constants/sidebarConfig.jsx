import {
    FaTachometerAlt,
    FaUsers,
    FaUserShield,
    FaBuilding,
    FaBoxes,
    FaWarehouse,
    FaLaptop,
    FaTruck,
    FaShoppingCart,
    FaChartBar,
    FaCog,
    FaList,
    FaExchangeAlt,
} from "react-icons/fa";

const SIDEBAR_LINKS = [
    // DASHBOARD
    {
        label: "Dashboard",
        path: "/edu/dashboard",
        icon: FaTachometerAlt,
        permissions: [
            "view_dashboard",
        ],
    },

    // MANAGEMENT
    {
        label: "Management",
        icon: FaUsers,

        permissions: [
            "view_users",
            "view_roles",
            "view_branches",
        ],

        children: [
            {
                label: "Users",
                path: "/edu/users",
                icon: FaUsers,
                permissions: [
                    "view_users",
                ],
            },

            {
                label: "Roles",
                path: "/edu/roles",
                icon: FaUserShield,
                permissions: [
                    "view_roles",
                ],
            },

            {
                label: "Branches",
                path: "/edu/branches",
                icon: FaBuilding,
                permissions: [
                    "view_branches",
                ],
            },
        ],
    },

    // INVENTORY
    {
        label: "Inventory",
        icon: FaWarehouse,

        permissions: [
            "view_products",
            "view_inventory",
            "view_assets",
            "view_branch_transfers",
        ],

        children: [
            {
                label: "Products",
                path: "/edu/products",
                icon: FaBoxes,
                permissions: [
                    "view_products",
                ],
            },

            {
                label: "Inventory Stock",
                path: "/edu/inventory",
                icon: FaWarehouse,
                permissions: [
                    "view_inventory",
                ],
            },

            {
                label: "Branch Transfers",
                path: "/edu/transfers",
                icon: FaExchangeAlt,
                permissions: [
                    "view_branch_transfers",
                ],
            },
        ],
    },

    // ASSETS
    {
        label: "Assets",
        path: "/edu/assets",
        icon: FaLaptop,
        permissions: [
            "view_assets",
        ],
        children: [
            {
                label: "Asset List",
                path: "/edu/assets",
                icon: FaList,
                permissions: [
                    "view_assets",
                ],
            },            
        ],
    },

    // PURCHASES
    {
        label: "Purchases",
        icon: FaShoppingCart,

        permissions: [
            "view_vendors",
            "view_purchases",
        ],

        children: [
            {
                label: "Vendors",
                path: "/edu/vendors",
                icon: FaTruck,
                permissions: [
                    "view_vendors",
                ],
            },

            {
                label: "Purchases",
                path: "/edu/purchases",
                icon: FaShoppingCart,
                permissions: [
                    "view_purchases",
                ],
            },
        ],
    },

    // REPORTS
    {
        label: "Reports",
        path: "/edu/reports",
        icon: FaChartBar,
        permissions: [
            "view_reports",
        ],
    },

    // SETTINGS
    {
        label: "Settings",
        path: "/edu/settings",
        icon: FaCog,
        permissions: [
            "manage_settings",
        ],
    },
];

export default SIDEBAR_LINKS;