import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import roles from "../../../mock/roles.json";
import { FaChevronDown, FaKey } from "react-icons/fa";
import { NAV_ROUTES } from "../../../constants/navRoutes";
import { Link, useNavigate } from "react-router-dom";
import { MdPerson, MdLogout, } from "react-icons/md";
import { logout } from "../../../features/auth/authSlice";
import { clearAuthStorage } from "../../../utils/clearAuthStorage";

const UserDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState(false);
    const { user } = useSelector((state) => state.auth);
    // Later must take redux state roles
    const loggedRoleName =
        roles.find(
            (role) => role.id === user.role_id
        );
    const handleLogout = () => {
        dispatch(logout());
        clearAuthStorage();
        navigate(NAV_ROUTES.LOGIN, {
            replace: true,
        });
    };

    return (
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

                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3 text-[15.4px] font-semibold"
                    >
                        <MdLogout size={20} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserDropdown