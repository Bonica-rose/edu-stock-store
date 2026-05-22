import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
                <h1 className="text-2xl font-bold text-blue-600">
                    Inventory & Asset Management
                </h1>

                <div className="flex items-center gap-3">
                    <Link
                        to={ROUTES.LOGIN}
                        className="px-4 py-2 text-sm font-medium text-gray-700 transition border rounded-lg hover:bg-gray-100"
                    >
                        Login
                    </Link>

                    <Link
                        to={ROUTES.REGISTER}
                        className="px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Register
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="flex flex-col items-center justify-center px-6 text-center min-h-[calc(100vh-80px)]">
                <h2 className="max-w-4xl text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                    Manage Inventory & Assets Easily
                </h2>

                <p className="max-w-2xl mt-6 text-lg text-gray-600">
                    Track inventory, manage assets, monitor stock,
                    and streamline operations from one platform.
                </p>

                <div className="flex gap-4 mt-10">
                    <Link
                        to={ROUTES.LOGIN}
                        className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                        Login
                    </Link>

                    <Link
                        to={ROUTES.REGISTER}
                        className="px-6 py-3 font-semibold text-blue-600 bg-white border border-blue-600 rounded-xl hover:bg-blue-50"
                    >
                        Register
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;