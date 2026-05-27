import { createBrowserRouter } from "react-router-dom";

// LAYOUTS
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import EduLayout from "../layouts/EduLayout";

// GUARDS
import InitialSetupRoute from "./guards/InitialSetupRoute";
import PublicRoute from "./guards/PublicRoute";
import ProtectedRoute from "./guards/ProtectedRoute";
import ForcePasswordChangeRoute from "./guards/ForcePasswordChangeRoute";

// ERROR PAGES
import ErrorBoundary from "./ErrorBoundary";
import ServerError from "./errors/pages/ServerError";
import Unauthorized from "./errors/pages/Unauthorized";
import Forbidden from "./errors/pages/Forbidden";
import NotFound from "./errors/pages/NotFound";

// AUTH PAGES
import LandingPage from "../features/landing/pages/LandingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ForceChangePasswordPage from "../features/auth/pages/ForceChangePasswordPage";

// DASHBOARD
import DashboardPage from "../features/dashboard/pages/DashboardPage";

// USER ROUTES
import userRoutes from "./userRoutes";

// INVENTORY ROUTES
import inventoryRoutes from "./inventoryRoutes";

// PURCHASE ROUTES
import purchaseRoutes from "./purchaseRoutes";

// ROUTES CONFIG
import { ROUTES } from "./routeConfig";

const router = createBrowserRouter([
    // PUBLIC ROUTES
    {
        element: <PublicRoute />,
        errorElement: <ErrorBoundary />,
        children: [
        // LANDING
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

        // AUTH
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
                ],
            },
            ],
        },
        ],
    },

    // PROTECTED ROUTES
    {
        element: <ProtectedRoute />,
        errorElement: <ErrorBoundary />,
        children: [
        // BASIC PROTECTED ROUTES
        {
            path: "/edu",
            element: <EduLayout />,
            children: [
            {
                path: ROUTES.FORCE_CHANGE_PASSWORD,
                element: <ForceChangePasswordPage />,
            },
            {
                path: ROUTES.FORBIDDEN,
                element: <Forbidden />,
            },
            ],
        },

        // FORCE PASSWORD CHANGE AREA
        {
            element: <ForcePasswordChangeRoute />,
            children: [
            {
                path: "/edu",
                element: <EduLayout />,
                children: [
                // DASHBOARD
                {
                    path: ROUTES.DASHBOARD,
                    element: <DashboardPage />,
                },

                // USERS
                ...userRoutes,

                // INVENTORY
                ...inventoryRoutes,

                // PURCHASES
                ...purchaseRoutes,
                ],
            },
            ],
        },
        ],
    },

    // ERROR ROUTES
    {
        path: ROUTES.UNAUTHORIZED,
        element: <Unauthorized />,
    },
    {
        path: ROUTES.SERVER_ERROR,
        element: <ServerError />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
