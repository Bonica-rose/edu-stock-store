import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoImage from '../../assets/logo.png';
import SIDEBAR_LINKS  from "../../constants/sidebarConfig";
import hasPermission  from "../../utils/hasPermission";
import { useDispatch, useSelector } from "react-redux";
import { closeMobileSidebar, } from "../../features/ui/uiSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation(); 
    const [openMenus, setOpenMenus] = useState({});
    const { permissions } = useSelector((state) => state.auth);  
    const { sidebarCollapsed, mobileSidebarOpen, } = useSelector((state) => state.ui);

    useEffect(() => {
        dispatch(closeMobileSidebar());
    }, [location.pathname]);

    const toggleMenu = (label) => {
        setOpenMenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };
    console.log('Permissions: ',permissions);

    const filteredLinks = SIDEBAR_LINKS.filter((link) =>
        hasPermission(
            permissions,
            link.permissions
        )
    );
    console.log(SIDEBAR_LINKS);
    

    // const filteredLinks = SIDEBAR_LINKS.filter(
    //     (link) =>
    //         hasPermission(
    //             user?.role.name,
    //             link.permission.module,
    //             link.permission.action
    //         )
    // );

    return (
        <>
            {/* Overlay */}
            {mobileSidebarOpen && (
                <div
                    onClick={() => dispatch(closeMobileSidebar())}
                    className="
                        fixed inset-0 z-40 bg-black/40
                        lg:hidden
                    "
                />
            )}
            
            <aside
                className={`fixed left-0 top-0 z-50 h-screen overflow-hidden bg-blue-950 text-white transition-all duration-300
                    ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}
                    ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}                    
                    w-64 lg:translate-x-0
                `}
            >
                
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-slate-700 px-4">
                    {sidebarCollapsed ? (
                        <img
                            src={logoImage}
                            alt="Logo"
                            className="h-8 w-8 object-contain"
                        />
                    ) : (

                        <div className="flex items-center gap-3">
                            <img
                                src={logoImage}
                                alt="Logo"
                                className="h-8 w-8 object-contain"
                            />

                            <h1
                                className={`origin-left whitespace-nowrap text-lg font-bold tracking-wide transition-all duration-300 ${sidebarCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
                                `}
                            >
                            Edu Stock&Store
                            </h1>
                        </div>
                    )}
                </div>

                {/* Nav Links */}
                <nav className="space-y-2 p-4">
                    {filteredLinks.map((link) => {
                        const hasChildren = Array.isArray(link.children);
                        // Parent Menu
                        if (hasChildren) {
                            const visibleChildren =
                                link.children.filter((child) =>
                                    hasPermission(permissions, child.permissions)
                                );

                            // Hide parent if no child visible
                            if (!visibleChildren.length) {
                                return null;
                            }

                            return (
                                <div key={link.label}>
                                    <button
                                        onClick={() => toggleMenu(link.label)}
                                        className="
                                            w-full
                                            flex items-center justify-between
                                            rounded-lg px-3 py-2
                                            text-slate-200
                                            hover:bg-slate-700
                                        "
                                    >
                                        <div className="flex items-center gap-3">
                                            {link.icon}
                                            <span>
                                                {link.label}
                                            </span>
                                        </div>

                                        <FaChevronDown
                                            className={`
                                                transition-transform
                                                ${openMenus[link.label]? "rotate-180": ""}
                                            `}
                                        />
                                    </button>

                                    {/* Submenu */}
                                    {openMenus[link.label] && (
                                        <div className="ml-6 mt-2 space-y-1">
                                            {visibleChildren.map((child) => (
                                                <NavLink
                                                    key={child.path}
                                                    to={child.path}
                                                    className={({ isActive }) =>
                                                        `
                                                        flex items-center gap-3
                                                        rounded-lg px-3 py-2
                                                        text-sm
                                                        transition-all

                                                        ${
                                                            isActive
                                                                ? "bg-blue-800 text-white"
                                                                : "text-slate-300 hover:bg-slate-700"
                                                        }
                                                        `
                                                    }
                                                >
                                                    {child.icon}
                                                    <span>
                                                        {child.label}
                                                    </span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // Single Menu
                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `
                                    flex items-center gap-3
                                    rounded-lg px-3 py-2
                                    transition-all

                                    ${
                                        isActive
                                            ? "bg-blue-800 text-white"
                                            : "text-slate-300 hover:bg-slate-700"
                                    }
                                    `
                                }
                            >
                                {link.icon}

                                <span>
                                    {link.label}
                                </span>
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;