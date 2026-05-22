import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "./routeConfig";

const PublicRoute = () => {
    const { isAuthenticated } = useSelector(
        (state) => state.auth
    );

    return isAuthenticated ? (
        <Navigate to={ROUTES.DASHBOARD} replace />
    ) : (
        <Outlet />
    );
};

export default PublicRoute;