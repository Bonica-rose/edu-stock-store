import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import PermissionRoute from "./PermissionRoute";
import ForcePasswordChangeRoute from "./ForcePasswordChangeRoute";

import Unauthorized from "./Unauthorized";
import NotFound from "./NotFound";
import ErrorBoundary from "./ErrorBoundary";

import LandingPage from "../features/landing/pages/LandingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ForceChangePasswordPage from "../features/auth/pages/ForceChangePasswordPage";

import { ROUTES } from "./routeConfig";

const router = createBrowserRouter([
    /**
     * PUBLIC WEBSITE
     */
    {
        element: <PublicLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: ROUTES.HOME,
                element: <LandingPage />,
            },
        ],
    },

    /**
     * AUTH ROUTES
     */
    {
        element: <PublicRoute />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: ROUTES.LOGIN,
                        element: <LoginPage />,
                    },

                    {
                        path: ROUTES.REGISTER,
                        element: <RegisterPage />,
                    },
                ],
            },
        ],
    },

    /**
     * FORCE PASSWORD CHANGE
     */
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <ForcePasswordChangeRoute />,
                children: [
                    {
                        path: ROUTES.FORCE_CHANGE_PASSWORD,
                        element: <AuthLayout />,
                        children: [
                            {
                                index: true,
                                element:
                                    <ForceChangePasswordPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    /**
     * PROTECTED ROUTES
     */
    {
        element: <ProtectedRoute />,
        children: [
            {
                element:
                    <ForcePasswordChangeRoute />,
                children: [
                    {
                        element: <DashboardLayout />,
                        errorElement:
                            <ErrorBoundary />,

                        children: [
                            {
                                path:
                                    ROUTES.DASHBOARD,

                                element:
                                    <DashboardPage />,
                            },

                            /**
                             * USERS MODULE
                             */
                            {
                                element: (
                                    <PermissionRoute
                                        permission="view_users"
                                    />
                                ),

                                children: [
                                    {
                                        path:
                                            ROUTES.USERS,

                                        element: (
                                            <div>Users Page</div>
                                        ),
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },

    /**
     * UNAUTHORIZED
     */
    {
        path: ROUTES.UNAUTHORIZED,
        element: <Unauthorized />,
    },

    /**
     * NOT FOUND
     */
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;