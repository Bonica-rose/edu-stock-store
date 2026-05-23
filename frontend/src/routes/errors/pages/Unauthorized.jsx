import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
            
            <h1 className="text-7xl font-bold text-red-700">
                401
            </h1>

            <h2 className="mt-4 text-2xl font-semibold text-slate-800">
                Unauthorized
            </h2>

            <p className="mt-2 text-slate-500">
                Your session is invalid or expired.
            </p>

            <Link
                to="/auth/login"
                className="mt-6 rounded-lg bg-blue-950 px-5 py-3 text-white hover:bg-blue-900"
            >
                Login Again
            </Link>
        </div>
    );
};

export default Unauthorized;