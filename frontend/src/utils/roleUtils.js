import roles from "../mock/roles.json";

/**
 * Get role object by role_id
 */
export const getRoleById = (roleId) => {
    return roles.find(
        (role) => String(role.id) === String(roleId)
    );
};

/**
 * Get role name safely
 */
export const getRoleName = (roleId) => {
    const role = getRoleById(roleId);
    return role?.name || "Unknown Role";
};