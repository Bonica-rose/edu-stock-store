import { Outlet } from "react-router-dom";
import { getUsers } from "../../features/auth/services/authAPI";
import SetupSuperAdminPage from "../../features/auth/pages/SetupSuperAdminPage";

const InitialSetupRoute = () => {
    const users = getUsers();
    const initialized = users.length > 0;

    return initialized
        ? <Outlet />
        : <SetupSuperAdminPage />;
};

export default InitialSetupRoute;