import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { NAV_ROUTES } from "../../constants/navRoutes";

const ForcePasswordChangeRoute = () => {
    const { user } = useSelector(
        (state) => state.auth
    );

    if (user?.must_change_password) {
        return (
            <Navigate
                to={NAV_ROUTES.FORCE_CHANGE_PASSWORD}
                replace
            />
        );
    }

    return <Outlet />;
};

export default ForcePasswordChangeRoute;