import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { NAV_ROUTES } from "../../constants/navRoutes";

const ProtectedRoute = () => {
    const { isAuthenticated, initialized, } = useSelector((state) => state.auth);

    if (!initialized) {
        return null;
    }

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={NAV_ROUTES.LOGIN} replace />
    );
};

export default ProtectedRoute;