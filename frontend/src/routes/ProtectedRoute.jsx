import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "./routeConfig";

const ProtectedRoute = () => {
    const { isAuthenticated } = useSelector(
        (state) => state.auth
    );

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.LOGIN} replace />
    );
};

export default ProtectedRoute;