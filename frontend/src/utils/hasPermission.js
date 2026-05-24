const hasPermission = (
    userPermissions = [],
    requiredPermissions = []
) => {
    if (!Array.isArray(requiredPermissions)) {
        requiredPermissions = [
            requiredPermissions,
        ];
    }

    return requiredPermissions.some(
        (permission) =>
            userPermissions.includes(permission)
    );
};

export default hasPermission;