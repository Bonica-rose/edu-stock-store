import branches from "../mock/branches.json";

/**
 * Get branch object by role_id
 */
export const getBranchById = (branchId) => {
    return branches.find(
        (branch) => String(branch.id) === String(branchId)
    );
};

/**
 * Get branch name safely
 */
export const getBranchName = (branchId) => {
    const branch = getBranchById(branchId);
    return branch?.name || "Unknown Branch";
};