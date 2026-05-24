import TanStackTable from "../../../components/tables/TanStackTable";
import { userColumns } from "./UserTableColumns";

const UserTable = ({
    users,
    onDelete,
    toggleStatus,
    authPermissions
}) => {   

    return (
        <TanStackTable
            data={users}
            columns={ userColumns(toggleStatus, onDelete, authPermissions) }
        />
    );
};

export default UserTable;