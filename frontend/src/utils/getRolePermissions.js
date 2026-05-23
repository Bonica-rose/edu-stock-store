import rolePermissions from "../mock/rolePermissions.json";

const getRolePermissions = (roleId) => {
    const rolePermission =
        rolePermissions.find(
            (rp) => rp.role_id === roleId
        );

    return rolePermission?.permissions || [];
};

export default getRolePermissions;