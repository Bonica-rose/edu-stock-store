import { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import {useNavigate, useParams,  Link,} from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import UserForm from "../components/UserForm";
import {
    fetchUserByIdThunk,
    updateUserThunk,
} from "../userThunk";
import { clearSelectedUser } from "../userSlice";
import roles from "../../../mock/roles.json";
import branches from "../../../mock/branches.json";
import Loader from "../../../components/ui/Loader";
import { NAV_ROUTES } from "../../../constants/navRoutes";

const UserEditPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

  const { selectedUser, loading, } = useSelector((state) => state.users);

    // ROLES
    const dbRoles = (roles || []).map(
        (role) => ({
            value: role.id,
            label: role.label,
            name: role.name,
        })
    );

    // BRANCHES
    const dbBranches = (
        branches || []
    ).map((branch) => ({
        value: branch.id,
        label: branch.name,
        name: branch.name,
    }));

    // FETCH USER
  useEffect(() => {
        dispatch(fetchUserByIdThunk(id));  
        return () => {
            dispatch(clearSelectedUser());
        };
    }, [dispatch, id]);
    
    const handleUpdateUser = async (data) => {
        try {
            await dispatch(updateUserThunk({id,data,})).unwrap();
            toast.success("User updated successfully");
            navigate(NAV_ROUTES.USERS);
        } catch (error) {
            toast.error(error?.message ||"User update failed");
        }
    };

    // LOADING
    if (loading ||!selectedUser ) {
        return <Loader />;
    }

    return (
        <div className="max-w-5xl me-auto bg-white rounded-lg p-5 shadow-sm">
            <Link
                to={NAV_ROUTES.USERS}
                className="inline-flex items-center gap-2 text-gray-500 mb-4"
            >
                <IoArrowBack />
                Back to Users
            </Link>

            <h1 className="text-xl border-b border-slate-100 font-bold pb-2 mb-4">Edit User</h1>

            <UserForm
                onSubmit={
                    handleUpdateUser
                }
                branches={
                    dbBranches
                }
                roles={dbRoles}
                loading={loading}
                defaultValues={
                    selectedUser
                }
            />
        </div>
    );
};

export default UserEditPage;