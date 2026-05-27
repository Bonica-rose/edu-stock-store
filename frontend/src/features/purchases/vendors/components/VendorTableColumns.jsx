import { FiEdit2, FiTrash2 } from "react-icons/fi";

const VendorTableColumns = ({ navigate, handleDelete }) => {
    return [
        {
            accessorKey: "vendor_name",
            header: "Vendor Name",
        },
        {
            accessorKey: "contact_person",
            header: "Contact Person",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "gst_number",
            header: "GST Number",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                const statusStyles = status === "active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700";

                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const vendor = row.original;

                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate(`${vendor.id}/edit`)}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            <FiEdit2 size={16} />
                        </button>
                        <button
                            onClick={() => handleDelete(vendor.id)}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                );
            },
        },
    ];
};

export default VendorTableColumns;
