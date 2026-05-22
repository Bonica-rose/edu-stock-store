const hasPermission = (
    userPermissions = [],
    requiredPermissions = []
) => {
    if (!Array.isArray(requiredPermissions)) {
        requiredPermissions = [
            requiredPermissions,
        ];
    }

    return requiredPermissions.every(
        (permission) =>
            userPermissions.includes(permission)
    );
};

export default hasPermission;