import { useEffect,} from "react";
import { useDispatch, useSelector,} from "react-redux";
import { fetchUsersThunk, deleteUserThunk, updateUserStatusThunk } from "../userThunk";
import toast from "react-hot-toast";
import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";
import { FaPlus, } from "react-icons/fa";
import { NAV_ROUTES } from "../../../constants/navRoutes";
import Loader from "../../../components/ui/Loader";
import hasPermission from "../../../utils/hasPermission";

const UserListPage = () => {
    const dispatch = useDispatch();
    const { users, loading} = useSelector((state) => state.users);
    const { permissions } = useSelector((state) => state.auth);      

    useEffect(() => {
        dispatch(fetchUsersThunk());
    }, [dispatch]);

    const toggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            const result = await dispatch(updateUserStatusThunk({ id, status: newStatus })).unwrap();
            if (result.id); {
                toast.success("User status updated!")
            }
        }catch(err) {
            toast.error(err || "User status updation failed!");
        }        
    };

    const handleDelete = async (id ) => {
        try {
            const confirmDelete = window.confirm("Delete this user?");
            if (confirmDelete) {
                await dispatch(deleteUserThunk(id)).unwrap();
                toast.success("User deleted!")
            }
        } catch (error) {
            console.log(error);            
            toast.error(error || "User status deletion failed!");
            
        }  
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-3 md:p-5 font-sans antialiased text-slate-900">
            {/* HEADING SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-0.5">
                <div>
                    <h1 className="text-[24px] md:text-[28px] font-extrabold tracking-tight text-slate-900">
                        Users
                    </h1>
                    <p className="text-sm text-slate-500">
                        Manage your organization's users.
                    </p>
                </div>

                {
                    hasPermission(
                        permissions,
                        "create_user"
                    ) && (
                        <Link
                            to={NAV_ROUTES.USER_CREATE}
                            className="inline-flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-medium text-sm px-3 py-2.5 rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-200 self-start sm:self-auto"
                        >
                            <FaPlus className="text-sm" />
                            <span>Add User</span>
                        </Link>
                    )
                }

                
            </div>

            {/* CONTENT SECTION (CARD WRAPPER) */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-4">
                <UserTable
                    users={users}
                    onDelete={handleDelete}
                    toggleStatus={toggleStatus}
                    authPermissions={permissions}
                />
            </div>
        </div>

    );
};

export default UserListPage;