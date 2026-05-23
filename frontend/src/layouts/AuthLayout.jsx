import { Link, Outlet } from "react-router-dom";
import { NAV_ROUTES } from "../constants/navRoutes";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-blue-100 px-4 py-10">

            {/* Container */}
            <div className="max-w-md mx-auto flex flex-col items-center">

                {/* Branding */}
                <Link to={NAV_ROUTES.HOME} className="text-center mb-10">
                    <h1 className="text-4xl text-blue-950 font-bold tracking-tight">Edu Stock&Store</h1>
                    <p className="text-slate-500">Inventory & Asset Management System</p>
                </Link>

                {/* Auth Card */}
                <div className="w-full">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;