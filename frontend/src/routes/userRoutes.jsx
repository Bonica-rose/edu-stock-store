import PermissionRoute
    from "./guards/PermissionRoute";

import { ROUTES }
    from "./routeConfig";

// USER PAGES
import UsersPage
    from "../features/users/pages/UsersPage";

import UserCreatePage
    from "../features/users/pages/UserCreatePage";

import UserEditPage
    from "../features/users/pages/UserEditPage";

const userRoutes = [

    // =========================================
    // USERS MANAGEMENT
    // =========================================
    {
        path: ROUTES.USERS,

        element: (
            <PermissionRoute permission="view_users" />
        ),

        children: [

            {
                index: true,
                element: <UsersPage />,
            },

            {
                path: "create",

                element: (
                    <PermissionRoute permission="create_user">
                        <UserCreatePage />
                    </PermissionRoute>
                ),
            },

            {
                path: ":id/edit",

                element: (
                    <PermissionRoute permission="update_user">
                        <UserEditPage />
                    </PermissionRoute>
                ),
            },
        ],
    },
];

export default userRoutes;