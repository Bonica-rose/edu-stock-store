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

export const userColumns = (toggleStatus, onDelete, authPermissions, authUserId) => {
    // 1. Define permissions flags
    const canUpdate = hasPermission(authPermissions, "update_user");
    const canDelete = hasPermission(authPermissions, "delete_user");

    // 2. Base columns definition
    const columns = [
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
                
                // Step 1: Check permissions
                const hasUpdatePermission = hasPermission(authPermissions, "update_user");
                
                // Step 2: Ensure the user is NOT targeting themselves
                const isSelf = id === authUserId;
                const canUpdate = hasUpdatePermission && !isSelf;

                return canUpdate ? (
                    <ToggleCell
                        value={status}
                        onChange={() => toggleStatus(id, status)}
                    />
                ) : (
                    <span
                        className={`
                            inline-flex items-center gap-1.5 px-2 py-1 rounded text-sm whitespace-nowrap
                            ${isSelf ? "border border-amber-200 bg-amber-50 text-amber-800" : "bg-slate-100 text-slate-600"}
                        `}
                        title={isSelf ? "You cannot change your own status" : ""}
                    >
                        {status} 
                        {isSelf && <span className="text-xs font-medium opacity-80">(You)</span>}
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
    ];

    // 3. Only push the Actions column if the user has permission to do SOMETHING
    if (canUpdate || canDelete) {
        columns.push({
            id: "actions",
            header: "Actions",
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {canUpdate && (
                        <Link
                            to={`/edu/users/${row.original.id}/edit`}
                            className="px-3 py-2 rounded bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                        >
                            <FaEdit />
                        </Link>
                    )}

                    {canDelete && (
                        <button
                            onClick={() => onDelete(row.original.id)}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 cursor-pointer"
                        >
                            <FaTrash />
                        </button>
                    )}
                </div>
            ),
        });
    }

    return columns;
};


// export const userColumns = (toggleStatus, onDelete, authPermissions) => [
//     {
//         accessorKey: "username",
//         header: "Username",
//         enableSorting: true,
//     },
//     {
//         accessorKey: "email",
//         header: "Email",
//     },
//     {
//         accessorKey: "status",
//         header: "Status",

//         cell: ({ row }) => {
//             const { id, status } = row.original;

//             const canUpdate =
//                 hasPermission(
//                     authPermissions,
//                     "update_user"
//                 );

//             return canUpdate ? (
//                 <ToggleCell
//                     value={status}
//                     onChange={() =>
//                         toggleStatus(id, status)
//                     }
//                 />
//             ) : (
//                 <span
//                     className="
//                         px-2 py-1 rounded text-sm
//                         bg-slate-100 text-slate-600
//                     "
//                 >
//                     {status}
//                 </span>
//             );
//         },
//     },
//     {
//         id: "role",
//         header: "Role",
//         accessorFn: (row) => getRoleName(row.role_id),
//         cell: ({ getValue }) => getValue(),
//     },
//     {
//         id: "branch",
//         header: "Branch",
//         accessorFn: (row) => getBranchName(row.branch_id),
//         cell: ({ getValue }) => getValue(),
//     },
//     {
//         id: "actions",
//         header: "Actions",
//         enableSorting: false,
//         cell: ({ row }) => (
//             <div className="flex items-center gap-2">

//                 {hasPermission(authPermissions,"update_user"
//                     ) && (
//                         <Link
//                             to={`/edu/users/${row.original.id}/edit`}
//                             className="px-3 py-2 rounded bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
//                         >
//                             <FaEdit />
//                         </Link>
//                     )
//                 }

//                 {hasPermission(authPermissions,"delete_user"
//                     ) && (
//                         <button
//                             onClick={() => onDelete(row.original.id)}
//                             className="px-3 py-2 bg-red-200 text-red-600 rounded hover:bg-red-200 cursor-pointer"
//                         >
//                             <FaTrash />
//                         </button>
//                     )
//                 }             

                
//             </div>
//         ),
//     },
// ];