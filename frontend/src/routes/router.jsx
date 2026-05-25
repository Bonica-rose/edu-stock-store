import { createBrowserRouter, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import EduLayout from "../layouts/EduLayout";

import InitialSetupRoute from "./guards/InitialSetupRoute";
import PublicRoute from "./guards/PublicRoute";
import ProtectedRoute from "./guards/ProtectedRoute";
import PermissionRoute from "./guards/PermissionRoute";
import ForcePasswordChangeRoute from "./guards/ForcePasswordChangeRoute";

import ErrorBoundary from "./ErrorBoundary";
import ServerError from "./errors/pages/ServerError"; // 500
import Unauthorized from "./errors/pages/Unauthorized"; // 401
import Forbidden from "./errors/pages/Forbidden"; // 403
import NotFound from "./errors/pages/NotFound"; // 404

import LandingPage from "../features/landing/pages/LandingPage";
import SetupSuperAdminPage from "../features/auth/pages/SetupSuperAdminPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ForceChangePasswordPage from "../features/auth/pages/ForceChangePasswordPage"; 
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import UsersPage from "../features/users/pages/UsersPage";
import UserCreatePage from "../features/users/pages/UserCreatePage";
import UserEditPage from "../features/users/pages/UserEditPage";

// INVENTORY IMPORTS
import ProductListPage from "../features/inventory/pages/products/ProductListPage";
import ProductCreatePage from "../features/inventory/pages/products/ProductCreatePage";
import ProductEditPage from "../features/inventory/pages/products/ProductEditPage";
import AssetListPage from "../features/inventory/pages/assets/AssetListPage";
import AssetDetailsPage from "../features/inventory/pages/assets/AssetDetailsPage";

import { ROUTES } from "./routeConfig";

const router = createBrowserRouter([  
    // Public Routes
    {
        element: <PublicRoute />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: ROUTES.HOME,
                element: <PublicLayout />,
                children: [
                    { index: true, element: <LandingPage /> },
                ],
            },
            {
                path: "/auth",
                element: <AuthLayout />,
                children: [
                    {
                        element: <InitialSetupRoute />,
                        children: [
                            { path: ROUTES.LOGIN, element: <LoginPage /> },
                            { path: ROUTES.REGISTER, element: <RegisterPage /> },
                            { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
                        ]
                    }
                ],
            },
        ],
    },
    // Protected Routes
    {
        element: <ProtectedRoute />,
        errorElement: <ErrorBoundary />,
        children: [            
            {
                path: "/edu",
                element: <EduLayout />,
                children: [
                    { path: ROUTES.FORCE_CHANGE_PASSWORD, element: <ForceChangePasswordPage /> },
                ],
            },
            {
                element: <ForcePasswordChangeRoute />,
                children: [
                    {                        
                        path: "/edu",
                        element: <EduLayout />,
                        children: [
                            { path: ROUTES.DASHBOARD, element: <DashboardPage /> },                            
                            
                            // USERS MANAGEMENT
                            {
                                path: ROUTES.USERS,                                
                                element: <PermissionRoute permission="view_users"/>,
                                children: [
                                    { index: true, element: <UsersPage /> },
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
                                ]
                            },

                            // PRODUCTS MANAGEMENT
                            {
                                path: ROUTES.PRODUCTS,
                                element: <PermissionRoute permission="view_products" />,
                                children: [
                                    { index: true, element: <ProductListPage /> },
                                    {
                                        path: "create",
                                        element: (
                                            <PermissionRoute permission="create_product">
                                                <ProductCreatePage />
                                            </PermissionRoute>
                                        ),
                                    },
                                    {
                                        path: ":id/edit",
                                        element: (
                                            <PermissionRoute permission="update_product">
                                                <ProductEditPage />
                                            </PermissionRoute>
                                        ),
                                    },
                                ]
                            },

                            // ASSETS MANAGEMENT & TRACKING
                            {
                                path: ROUTES.ASSETS,
                                element: <PermissionRoute permission="view_assets" />,
                                children: [
                                    { index: true, element: <AssetListPage /> },
                                    {
                                        path: ":id/tracking",
                                        element: (
                                            <PermissionRoute permission="view_assets">
                                                <AssetDetailsPage />
                                            </PermissionRoute>
                                        ),
                                    },
                                ]
                            },
                        ]
                    }
                ],
            },
        ],
    },
    // Fallback Error Routing
    { path: ROUTES.UNAUTHORIZED, element: <Unauthorized /> },
    { path: ROUTES.FORBIDDEN, element: <Forbidden /> },
    { path: ROUTES.SERVER_ERROR, element: <ServerError /> },
    { path: "*", element: <NotFound /> }
]);

export default router;
