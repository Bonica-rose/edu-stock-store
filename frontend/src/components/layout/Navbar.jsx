import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaCog, FaBars, FaChevronDown, FaKey } from "react-icons/fa";
import {
    MdMenu,
    MdPerson,
    MdLogout,
} from "react-icons/md";
import { LuGitBranch } from "react-icons/lu";
import { Link } from "react-router-dom";
import {
    toggleSidebar,
    toggleMobileSidebar,
} from "../../features/ui/uiSlice";
import { NAV_ROUTES } from "../../constants/navRoutes";
import roles from "../../mock/roles.json";
import branches from "../../mock/branches.json";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { sidebarCollapsed, mobileSidebarOpen, } = useSelector((state) => state.ui);
    const [openDropdown, setOpenDropdown] = useState(false);

    // Later must take redux state roles
    const loggedRoleName =
        roles.find(
            (role) => role.id === user.role_id
        );
    
    // Later must take redux state roles
    const loggedUserBranch =
        branches.find(
            (branch) => branch.id === user.branch_id
        );

    return (
        // <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
        //     <h1 className="text-lg font-semibold">
        //         Dashboard
        //     </h1>

        //     <div className="flex items-center gap-4">
        //         <span className="text-sm text-gray-600">
        //             Super Admin
        //         </span>

        //         <div className="w-10 h-10 rounded-full bg-gray-300" />
        //     </div>
        // </header>

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
            <div className="flex items-center gap-4">
                {/* Branch */} 
                <div className="relative hidden sm:block">
                   {/* Icon */}
                    <LuGitBranch
                        className="
                            absolute left-3 top-1/2
                            -translate-y-1/2
                            text-slate-500
                        "
                        size={18}
                    />
                    <span
                        className="
                            appearance-none rounded-xl
                            border border-slate-200
                            bg-white py-2 pl-10 pr-10
                            text-sm font-medium text-slate-700
                            shadow-sm outline-none
                            transition-all duration-200


                            hover:border-blue-400
                            focus:border-blue-600
                            focus:ring-2 focus:ring-blue-100
                        "
                    >
                        {loggedUserBranch?.name}
                    </span>
                </div>

                {/* Settings */}
                <Link to={NAV_ROUTES.SETTINGS} className="relative rounded-full bg-slate-100 p-2 text-blue-900 hover:bg-slate-200 hidden sm:block">
                    <FaCog />
                </Link>
            </div>

            {/* User Dropdown */}
            <div className="relative"> 
                <button
                    onClick={() => setOpenDropdown(!openDropdown)}
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg"
                >
                    <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
                        {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-semibold">
                            {user?.username || "User Name"}
                        </p>

                        <p className="text-xs text-slate-500">
                            {loggedRoleName?.name || "N/A"}
                        </p>
                    </div>
                    <FaChevronDown size={16} className="text-xs text-slate-500" />
                </button>

                {/* Dropdown */}
                {openDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">

                        <Link to={NAV_ROUTES.USER_PROFILE}
                            className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-[15.4px]">
                            <MdPerson size={20} />
                            Profile
                        </Link>

                        <Link to={NAV_ROUTES.FORCE_CHANGE_PASSWORD} className='w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-[15.4px]'>
                            <FaKey size={15} />
                            Change password
                        </Link>

                        <div className="border-t"></div>

                        <Link to={NAV_ROUTES.LOGOUT} className="w-full px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3 text-[15.4px] font-semibold">
                            <MdLogout size={20} />
                            Logout
                        </Link>
                    </div>
                )}
            </div>

        </header>
    );
};

export default Navbar;