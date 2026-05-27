import TanStackTable from "../../../../components/tables/TanStackTable";
import VendorTableColumns from "./VendorTableColumns";

const VendorTable = ({
    data = [],
    navigate,
    handleDelete,
}) => {

    const columns =
        VendorTableColumns({
            navigate,
            handleDelete,
        });

    return (
        <TanStackTable
            data={data}
            columns={columns}
        />
    );
};

export default VendorTable;