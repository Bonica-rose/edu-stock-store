import {
    isRouteErrorResponse,
    useRouteError,
    Link,
} from "react-router-dom";

import { ROUTES } from "./routeConfig";

const ErrorBoundary = () => {
    const error = useRouteError();

    let title = "Something went wrong";
    let message =
        "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        title = `${error.status}`;

        message =
            error.statusText ||
            "Route error occurred.";
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
                <h1 className="text-5xl font-bold text-red-500 mb-4">
                    {title}
                </h1>

                <p className="text-gray-600 mb-6">
                    {message}
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

export default ErrorBoundary;