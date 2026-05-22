import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "./routeConfig";

const ForcePasswordChangeRoute = () => {
    const { user } = useSelector(
        (state) => state.auth
    );

    if (user?.must_change_password) {
        return (
            <Navigate
                to={ROUTES.FORCE_CHANGE_PASSWORD}
                replace
            />
        );
    }

    return <Outlet />;
};

export default ForcePasswordChangeRoute;