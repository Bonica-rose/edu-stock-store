import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import hasPermission from "../../utils/hasPermission";
import {NAV_ROUTES} from "../../constants/navRoutes";

const PermissionRoute = ({permission, children}) => {
    const {isAuthenticated, permissions = [],} = useSelector((state) => state.auth);
    const allowed = hasPermission(permissions, permission);
    
    if (!isAuthenticated) {
        return (
            <Navigate to={NAV_ROUTES.LOGIN} replace />
        );
    }

    if (!allowed) {
        return (
            <Navigate to={NAV_ROUTES.FORBIDDEN} replace />
        );
    }

    return children ? children : <Outlet />;
};

export default PermissionRoute;