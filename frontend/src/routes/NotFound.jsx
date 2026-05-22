import { Link } from "react-router-dom";
import { ROUTES } from "./routeConfig";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">
                    404
                </h1>

                <h2 className="text-2xl font-semibold mb-3">
                    Page Not Found
                </h2>

                <p className="text-gray-600 mb-6">
                    The page you are looking for
                    does not exist.
                </p>

                <Link
                    to={ROUTES.HOME}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;