import { Link } from "react-router-dom";

const Forbidden = () => {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
            
            <h1 className="text-7xl font-bold text-red-700">
                403
            </h1>

            <h2 className="mt-4 text-2xl font-semibold text-slate-800">
                Access Forbidden
            </h2>

            <p className="mt-2 text-slate-500">
                You do not have permission to access this page.
            </p>

            <Link
                to="/edu/dashboard"
                className="mt-6 rounded-lg bg-blue-950 px-5 py-3 text-white hover:bg-blue-900"
            >
                Back to Dashboard
            </Link>
        </div>
    );
};

export default Forbidden;