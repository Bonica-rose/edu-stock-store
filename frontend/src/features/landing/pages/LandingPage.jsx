import { Link } from "react-router-dom";
import { NAV_ROUTES } from "../../../constants/navRoutes";
import logoImage from '../../../assets/logo.png';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-blue-50">
            {/* Header */}
            <header className="flex flex-col sm:flex-row gap-4 items-center justify-between px-6 py-4 bg-blue-950 shadow-sm">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                    <img
                        src={logoImage}
                        alt="Logo"
                        className="h-9 w-9 object-contain shrink-0"
                    />
                    <h1 className="text-xl sm:text-xl font-bold text-white leading-tight text-center sm:text-left">
                        Edu <span className="inline sm:inline">Stock&Store</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end"> 
                    <Link
                        to={NAV_ROUTES.LOGIN}
                        className="px-4 py-2 text-sm font-medium transition bg-white text-blue-950 rounded-lg hover:bg-blue-100"
                    >
                        Login
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center px-4 py-12 text-center min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-80px)]">
                <h2 className="max-w-4xl text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                    Manage Inventory & Assets Easily
                </h2>

                <p className="max-w-2xl mt-6 text-base sm:text-lg text-gray-600">
                    Track inventory, manage assets, monitor stock,
                    and streamline operations from one platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-5 w-full sm:w-auto max-w-xs sm:max-w-none">
                    <Link
                        to={NAV_ROUTES.LOGIN}
                        className="px-6 py-3 font-semibold text-cente rounded-xl bg-amber-200 text-amber-900"
                    >
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
};


export default LandingPage;