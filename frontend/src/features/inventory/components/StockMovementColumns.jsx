import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import branches from "../../../mock/branches.json";

const getProductName = (productId, products) => {
    if (!products.length) {
        return "-";
    }
    const product = products.find(
        (item) => String(item.id) === String(productId)
    );
    return product?.name || "-";
};

const getBranchName = (branchId) => {
    const branch = branches.find(
        (item) => String(item.id) === String(branchId)
    );

    return branch?.name || "-";
};

const movementBadgeStyles = {
    stock_in: "bg-green-100 text-green-700",
    stock_out: "bg-red-100 text-red-700",
};

export const stockMovementColumns = (products =[]) => [
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
        accessorKey: "movement_type",
        header: "Type",

        cell: ({ row }) => {
            const type = row.original.movement_type;

            return (
                <span
                    className={`
                        px-2 py-1 rounded-full
                        text-xs font-semibold capitalize
                        ${movementBadgeStyles[type]}
                    `}
                >
                    {type}
                </span>
            );
        },
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
        accessorKey:"previous_qty",
        header: "Previous",
        cell: ({ row }) => (
            <span>
                {row.original.previous_qty}
            </span>
        ),
    },

    {
        accessorKey: "new_qty",
        header: "New",
        cell: ({ row }) => (
            <span className="font-semibold text-blue-700">
                {row.original.new_qty}
            </span>
        ),
    },

    {
        id: "branch_id",
        header: "Branch",
        accessorFn: (row) => getBranchName(row.branch_id),
        cell: ({ getValue }) => getValue(),
    },

    {
        accessorKey: "remarks",
        header: "Remarks",
        cell: ({ row }) => (
            <span className="text-slate-600">
                {row.original.remarks}
            </span>
        ),
    },

    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => (
            <span className="text-slate-500">
                {row.original.created_at}
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
                    to={`/edu/inventory/movements/${row.original.id}`}
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