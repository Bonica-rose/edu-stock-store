import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { NAV_ROUTES } from "../../../constants/navRoutes";

import { logout } from "../../features/auth/authSlice";
import { clearAuthStorage } from "../../utils/clearAuthStorage";

const LogoutPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());

        clearAuthStorage();
    }, [dispatch]);

    return <Navigate to={NAV_ROUTES.LOGIN} replace />;
};

export default LogoutPage;