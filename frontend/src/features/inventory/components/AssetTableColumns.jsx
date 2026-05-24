import { FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import hasPermission from "../../../utils/hasPermission";
import branches from "../../../mock/branches.json";
import categories from "../../../mock/categories.json";

const getCategoryName = (categoryId) => {
    const category = categories.find((c) => String(c.id) === String(categoryId));
    return category?.name || "-";
};

const getBranchName = (branchId) => {
    const branch = branches.find((b) => String(b.id) === String(branchId));
    return branch?.name || "-";
};

export const assetTableColumns = (updateAssetStatus, onDelete, authPermissions) => [
    {
        accessorKey: "name",
        header: "Asset Name",
        enableSorting: true,
    },
    {
        accessorKey: "sku",
        header: "SKU",
    },
    {
        id: "category",
        header: "Category",
        accessorFn: (row) => getCategoryName(row.category_id),
        cell: ({ getValue }) => getValue(),
    },
    {
        id: "branch",
        header: "Branch",
        accessorFn: (row) => getBranchName(row.branch_id),
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: "quantity",
        header: "Qty",
    },
    {
        accessorKey: "asset_status",
        header: "Asset Status / Tracking",
        cell: ({ row }) => {
            const item = row.original;
            const canUpdate = hasPermission(authPermissions, "update_asset");

            return canUpdate ? (
                <select
                    value={item.asset_status || "active"}
                    onChange={(e) => updateAssetStatus(item.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-indigo-200 bg-white font-sans text-slate-700 font-medium"
                >
                    <option value="active">Active</option>
                    <option value="damaged">Damaged</option>
                    <option value="maintenance">Maintenance</option>
                </select>
            ) : (
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize 
                    ${item.asset_status === "damaged" ? "bg-red-100 text-red-700" : 
                      item.asset_status === "maintenance" ? "bg-yellow-100 text-yellow-700" : 
                      "bg-lime-100 text-lime-700"}`}
                >
                    {item.asset_status || "active"}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
            const item = row.original;
            const canDelete = hasPermission(authPermissions, "delete_asset");

            return (
                <div className="flex items-center gap-2">
                    {/* VIEW TRACKING DETAILS TIMELINE BUTTON */}
                    <Link
                        to={`/edu/assets/${item.id}/tracking`}
                        title="Track Asset"
                        className="px-3 py-2 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center text-sm"
                    >
                        <FaEye />
                    </Link>

                    {/* DELETE BUTTON */}
                    {canDelete && (
                        <button
                            onClick={() => onDelete(item.id)}
                            title="Delete Asset"
                            className="px-3 py-2 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer flex items-center justify-center text-sm"
                        >
                            <FaTrash />
                        </button>
                    )}
                </div>
            );
        },
    },
];
