import {FaEdit,FaTrash,} from "react-icons/fa";
import ToggleCell from "../../../components/tables/ui/ToggleCell";
import { Link } from "react-router-dom";
import roles from "../../../mock/roles.json";
import branches from "../../../mock/branches.json";
import hasPermission from "../../../utils/hasPermission";

const getRoleName = (roleId) => {
    const role = roles.find(
        (r) => r.id === roleId
    );

    return role?.label || '-';
};

const getBranchName = (branchId) => {
    const branch = branches.find(
        (b) => b.id === branchId
    );

    return branch?.name || '-';
};

export const userColumns = (toggleStatus, onDelete, authPermissions) => [
    {
        accessorKey: "username",
        header: "Username",
        enableSorting: true,
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "status",
        header: "Status",

        cell: ({ row }) => {
            const { id, status } = row.original;

            const canUpdate =
                hasPermission(
                    authPermissions,
                    "update_user"
                );

            return canUpdate ? (
                <ToggleCell
                    value={status}
                    onChange={() =>
                        toggleStatus(id, status)
                    }
                />
            ) : (
                <span
                    className="
                        px-2 py-1 rounded text-sm
                        bg-slate-100 text-slate-600
                    "
                >
                    {status}
                </span>
            );
        },
    },
    {
        id: "role",
        header: "Role",
        accessorFn: (row) => getRoleName(row.role_id),
        cell: ({ getValue }) => getValue(),
    },
    {
        id: "branch",
        header: "Branch",
        accessorFn: (row) => getBranchName(row.branch_id),
        cell: ({ getValue }) => getValue(),
    },
    {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex items-center gap-2">

                {hasPermission(authPermissions,"update_user"
                    ) && (
                        <Link
                            to={`/edu/users/${row.original.id}/edit`}
                            className="px-3 py-2 rounded bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                        >
                            <FaEdit />
                        </Link>
                    )
                }

                {hasPermission(authPermissions,"delete_user"
                    ) && (
                        <button
                            onClick={() => onDelete(row.original.id)}
                            className="px-3 py-2 bg-red-200 text-red-600 rounded hover:bg-red-200 cursor-pointer"
                        >
                            <FaTrash />
                        </button>
                    )
                }             

                
            </div>
        ),
    },
];