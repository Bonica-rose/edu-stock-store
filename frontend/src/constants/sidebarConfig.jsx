import {
    FaUsers,
    FaUserShield,
    FaKey,
    FaBuilding,
    FaTachometerAlt,
    FaChevronDown,
} from "react-icons/fa";

const SIDEBAR_LINKS = [
    {
        label: "Dashboard",
        path: "/edu/dashboard",
        icon: <FaTachometerAlt />,
        permissions: ["dashboard.view"],
    },

    {
        label: "Manage",
        icon: <FaUsers />,

        permissions: [
            "users.view",
            "roles.view",
            "permissions.view",
            "branches.view",
        ],

        children: [
            {
                label: "Users",
                path: "/edu/users",
                icon: <FaUsers />,
                permissions: ["users.view"],
            },

            {
                label: "Roles",
                path: "/edu/roles",
                icon: <FaUserShield />,
                permissions: ["roles.view"],
            },

            {
                label: "Permissions",
                path: "/edu/permissions",
                icon: <FaKey />,
                permissions: ["permissions.view"],
            },

            {
                label: "Branches",
                path: "/edu/branches",
                icon: <FaBuilding />,
                permissions: ["branches.view"],
            },
        ],
    },
];

export default SIDEBAR_LINKS;