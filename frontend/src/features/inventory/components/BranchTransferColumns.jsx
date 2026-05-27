import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const getProductName = (productId, products) => {
    if (!products.length) {
        return "-";
    }
    const product = products.find(
        (item) =>
            String(item.id) === String(productId)
    );

    return product?.name || "-";
};

const getBranchName = (branchId, branches) => {
    const branch = branches.find(
        (item) =>
            String(item.id) === String(branchId)
    );

    return branch?.name || "-";
};

export const branchTansferColumns = ({ products, branches }) => [
    {
        id: "product",
        header: "Product",
        accessorFn: (row) => getProductName(row.product_id,products),
        cell: ({ getValue }) => (
            <span className="font-medium text-slate-700">
                {getValue()}
            </span>
        ),
    },

    {
        accessorKey: "from_branch_id",
        header: "From",
        cell: ({ row }) => (
            <span>
                {getBranchName(row.original.from_branch_id,branches)}
            </span>
        ),
    },

    {
        accessorKey: "to_branch_id",
        header: "To",
        cell: ({ row }) => (
            <span>
                {getBranchName(row.original.to_branch_id,branches)}
            </span>
        ),
    },

    {
        accessorKey: "quantity",
        header: "Qty",
        cell: ({ row }) => (
            <span className="font-semibold">
                {row.original.quantity}
            </span>
        ),
    },

    {
        accessorKey: "remarks",
        header: "Remarks",
        cell: ({ row }) => (
            <span className="text-slate-600">
                {row.original.remarks || "-"}
            </span>
        ),
    },

    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => (
            <span className="text-slate-500">
                {new Date(
                    row.original.created_at
                ).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                })}
            </span>
        ),
    },

    {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Link
                    to={`/edu/inventory/transfers/${row.original.id}`}
                    className="
                        px-3 py-2 rounded
                        bg-slate-100 text-slate-700
                        hover:bg-slate-200
                    "
                >
                    <FaEye />
                </Link>
            </div>
        ),
    },
];