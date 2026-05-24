import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import UserForm from "../components/UserForm";
import { createUserThunk } from "../userThunk";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import roles from "../../../mock/roles.json";
import branches from "../../../mock/branches.json";
import { NAV_ROUTES } from "../../../constants/navRoutes";

const UserCreatePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.users);

    // Get mock data, later get it from redux store
    const dbRoles = (roles|| []).map(
        (role) => ({
            value: role.id,
            label: role.label,
            name: role.name,
        })
    );
    const dbBranches = (branches || []).map(
        (branch) => ({
            value: branch.id,
            label: branch.name,
            name: branch.name,
        })
    );

    const handleCreateUser = async (data) => {
        try {
            await dispatch(createUserThunk(data)).unwrap();
            toast.success("User creation successful");
            navigate(NAV_ROUTES.USERS);
        } catch (error) {
            toast.error(error?.message || "User creation failed");
        }
    };    

    return (
        <div className="max-w-5xl me-auto bg-white rounded-lg p-5 shadow-sm">
            <Link
                to={NAV_ROUTES.USERS}
                className="inline-flex items-center gap-2 text-gray-500 mb-4"
            >
                <IoArrowBack />
                Back to Users
            </Link>
            <h1 className="text-xl border-b border-slate-100 font-bold pb-2 mb-4">Create User</h1>

            <UserForm
                onSubmit={handleCreateUser}
                branches={dbBranches}
                roles={dbRoles}
                loading={loading}
            />
        </div>
    );
};

export default UserCreatePage;