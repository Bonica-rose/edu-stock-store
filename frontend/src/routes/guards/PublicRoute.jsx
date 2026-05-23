import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { NAV_ROUTES } from "../../constants/navRoutes";

const PublicRoute = () => {
    const { isAuthenticated } = useSelector(
        (state) => state.auth
    );

    return isAuthenticated ? (
        <Navigate to={NAV_ROUTES.DASHBOARD} replace />
    ) : (
        <Outlet />
    );
};

export default PublicRoute;