import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";

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

import { ROUTES } from "./routeConfig";

const testRouter = createBrowserRouter([  
    // Public Routes
    {
        element: <PublicRoute />,
        errorElement: <ErrorBoundary />,
        children: [
            // LANDING PAGE
            {
                path: ROUTES.HOME,
                element: <PublicLayout />,
                children: [
                    {
                        index: true,
                        element: <LandingPage />,
                    },
                ],
            },
            // AUTH PAGES
            {
                path: "/auth",
                element: <AuthLayout />,
                children: [
                    {
                        element: <InitialSetupRoute />,
                        children: [
                            {
                                path: ROUTES.LOGIN,
                                element: <LoginPage />,
                            },
                            {
                                path: ROUTES.REGISTER,
                                element: <RegisterPage />,
                            },
                            {
                                path: ROUTES.FORGOT_PASSWORD,
                                element: <ForgotPasswordPage />,
                            },
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
                element: <ForcePasswordChangeRoute />,
                children: [
                    {
                        path: "/edu",
                        element: <EduLayout />,
                        children: [
                            {
                                path: ROUTES.DASHBOARD,
                                element: <DashboardPage />,
                            },
                        ]
                    }
                ]
            }
        ]
    },

    // Global Routes
    {
        path: ROUTES.UNAUTHORIZED,
        element: <Unauthorized />,
    },
    {
        path: ROUTES.SERVER_ERROR,
        element: <ServerError />,
    },
    {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
    },

]);

export default testRouter;