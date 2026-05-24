import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../components/layout/navbar/Navbar";
import Sidebar from "../components/layout/Sidebar";

const EduLayout = () => {
    const { sidebarCollapsed } = useSelector((state) => state.ui);

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Sidebar (fixed) */}
            <Sidebar />

            {/* Main wrapper (IMPORTANT FIX HERE) */}
            <div
                className={`
                    min-h-screen
                    transition-all duration-300

                    ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}
                `}
            >
                {/* Navbar */}
                <Navbar />

                {/* Page content */}
                <main className="mt-16 p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default EduLayout;