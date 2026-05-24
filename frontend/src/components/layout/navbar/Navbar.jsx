import { useDispatch, useSelector } from "react-redux";
import { FaCog, FaBars, } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
    toggleSidebar,
    toggleMobileSidebar,
} from "../../../features/ui/uiSlice";
import { NAV_ROUTES } from "../../../constants/navRoutes";
import UserDropdown from "../navbar/UserDropdown";
import BranchSwitcher from "../navbar/BranchSwitcher";


const Navbar = () => {
    const dispatch = useDispatch();
    const { permissions } = useSelector((state) => state.auth);
    const { sidebarCollapsed, } = useSelector((state) => state.ui);    
    const canManageSettings = permissions.includes("manage_settings"); 

    return (
        <header
            className={`
                fixed top-0 right-0 z-40
                flex h-16 items-center justify-between
                border-b border-slate-200 bg-white
                px-4 shadow-sm transition-all duration-300
                ${
                    sidebarCollapsed
                        ? "lg:left-20"
                        : "lg:left-64"
                }
                left-0
            `}
        >
            {/* Left */}
            <div className="flex items-center gap-3">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => {
                        if (window.innerWidth < 1024) {
                            dispatch(toggleMobileSidebar());
                        } else {
                            dispatch(toggleSidebar());
                        }
                    }}
                    className="text-xl text-slate-700 cursor-pointer"
                >
                    <FaBars />
                </button>
            </div>

            {/* Right */}
            <div className="ml-auto mr-3 flex items-center gap-4">

                {/* Branch */}                 
                <BranchSwitcher />                

                {/* Settings */}
                {canManageSettings && (
                    <Link to={NAV_ROUTES.SETTINGS} className="relative rounded-full bg-slate-100 p-2 text-blue-900 hover:bg-slate-200 hidden sm:block">
                        <FaCog />
                    </Link>
                )}
            </div>

            <UserDropdown />           

        </header>
    );
};

export default Navbar;