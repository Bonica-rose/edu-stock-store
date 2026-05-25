import TanStackTable from "../../../components/tables/TanStackTable";
import { userColumns } from "./UserTableColumns";

const UserTable = ({
    users,
    onDelete,
    toggleStatus,
    authPermissions,
    authUserId,
}) => {   

    return (
        <TanStackTable
            data={users}
            columns={ userColumns(toggleStatus, onDelete, authPermissions, authUserId) }
        />
    );
};

export default UserTable;