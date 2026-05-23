import { Link } from "react-router-dom";
import { ROUTES } from "../../routeConfig";

const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 text-center">
            
            <h1 className="text-8xl font-bold text-red-700">
                404
            </h1>

            <h2 className="mt-4 text-2xl font-semibold text-slate-800">
                Page Not Found
            </h2>

            <p className="mt-2 text-slate-500">
                The page you are looking for does not exist.
            </p>

            <Link
                to={ROUTES.HOME}
                className="mt-6 rounded-lg bg-blue-950 px-5 py-3 text-white hover:bg-blue-900"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;