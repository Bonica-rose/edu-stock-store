import React, { useMemo } from "react";
import TanStackTable from "../../../components/tables/TanStackTable";
import { productColumns } from "./ProductTableColumns";

const ProductTable = ({
    products = [],
    toggleStatus,
    onDelete,
    authPermissions,
}) => {

    const columns = useMemo(
        () =>
            productColumns(
                toggleStatus,
                onDelete,
                authPermissions
            ),

        [
            toggleStatus,
            onDelete,
            authPermissions,
        ]
    );

    return (
        <TanStackTable
            data={products}
            columns={columns}
            searchPlaceholder="Search products..."
        />
    );
};

export default ProductTable;