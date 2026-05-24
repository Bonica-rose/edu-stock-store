import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import hasPermission from "../../../utils/hasPermission";
import ToggleCell from "../../../components/tables/ui/ToggleCell";
import branches from "../../../mock/branches.json";
import categories from "../../../mock/categories.json";

// FIXED: Converted c.id comparison to handle mixed types safely (String vs Number)
const getCategoryName = (categoryId) => {
    const category = categories.find((c) => String(c.id) === String(categoryId));
    return category?.name || "-";
};

// FIXED: Converted b.id comparison to handle mixed types safely (String vs Number)
const getBranchName = (branchId) => {
    const branch = branches.find((b) => String(b.id) === String(branchId));
    return branch?.name || "-";
};

const AssetStatusBadge = ({ status }) => {
    const statusClasses = {
        active: "bg-lime-100 text-lime-700",
        damaged: "bg-red-100 text-red-700",
        maintenance: "bg-yellow-100 text-yellow-700",
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusClasses[status] || "bg-slate-100 text-slate-700"}`}>
            {status || "-"}
        </span>
    );
};

export const productColumns = (toggleStatus, onDelete, authPermissions) => [
    {
        accessorKey: "name",
        header: "Name",
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
        accessorKey: "quantity",
        header: "Qty",
    },
    {
        accessorKey: "unit_price",
        header: "Price",
        cell: ({ row }) => {
            // FIXED: Fallback fallback to unit_price or price to avoid rendering undefined crashes
            const amount = row.original.unit_price ?? row.original.price ?? 0;
            return <span>₹{Number(amount).toLocaleString("en-IN")}</span>;
        },
    },
    {
        id: "branch",
        header: "Branch",
        accessorFn: (row) => getBranchName(row.branch_id),
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${row.original.type === "asset" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                {row.original.type}
            </span>
        ),
    },
    {
        accessorKey: "asset_status",
        header: "Asset Status",
        cell: ({ row }) => {
            if (row.original.type !== "asset") return "-";
            return <AssetStatusBadge status={row.original.asset_status} />;
        },
    },
    // {
    //     accessorKey: "asset_status",
    //     header: "Asset Status",

    //     cell: ({ row }) => {
    //         const product = row.original;
    //         if (product.type !== "asset") return "-";
    //         return (
    //             <select
    //                 value={product.asset_status || ""}
    //                 onChange={(e) =>
    //                     updateAssetStatus(
    //                         product.id,
    //                         e.target.value
    //                     )
    //                 }
    //                 className="border px-2 py-1 rounded text-sm"
    //             >
    //                 <option value="active">Active</option>
    //                 <option value="damaged">Damaged</option>
    //                 <option value="maintenance">Maintenance</option>
    //             </select>
    //         );
    //     },
    // },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const { id, status } = row.original;
            const canUpdate = hasPermission(authPermissions, ["update_product", "update_asset"]);

            return canUpdate ? (
                <ToggleCell value={status} onChange={() => toggleStatus(id, status)} />
            ) : (
                <span className="px-2 py-1 rounded-full text-xs font-medium capitalize bg-slate-100 text-slate-700">
                    {status}
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
            const isAsset = item.type === "asset";

            const canEdit = hasPermission(authPermissions, isAsset ? "update_asset" : "update_product");
            const canDelete = hasPermission(authPermissions, isAsset ? "delete_asset" : "delete_product");

            return (
                <div className="flex items-center gap-2">
                    {canEdit && (
                        <Link
                            to={`/edu/products/${item.id}/edit`}
                            className="px-3 py-2 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-all"
                        >
                            <FaEdit />
                        </Link>
                    )}
                    {canDelete && (
                        <button
                            onClick={() => onDelete(item.id)}
                            className="px-3 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-all cursor-pointer"
                        >
                            <FaTrash />
                        </button>
                    )}
                </div>
            );
        },
    },
];
