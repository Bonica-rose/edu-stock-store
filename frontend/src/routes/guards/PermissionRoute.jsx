import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import hasPermission from "../../utils/hasPermission";
import { NAV_ROUTES } from "../../constants/navRoutes";

const PermissionRoute = ({ permission }) => {
    const { permissions } = useSelector(
        (state) => state.auth
    );

    const allowed = hasPermission(
        permissions,
        permission
    );

    return allowed ? (
        <Outlet />
    ) : (
        <Navigate
            to={NAV_ROUTES.UNAUTHORIZED}
            replace
        />
    );
};

export default PermissionRoute;