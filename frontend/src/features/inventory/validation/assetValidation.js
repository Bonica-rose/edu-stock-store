import * as yup from "yup";

export const assetAssignSchema = yup.object({
    asset_id: yup
        .string()
        .required('Asset is required to assign'),
    to_user_id: yup
        .string()
        .required('User is required for asset assignment'),
    from_branch_id: yup
        .string()
        .required('Source Branch is required'),
    to_branch_id: yup
        .string()
        .required('Destination branch is required'),
    notes: yup
        .string()
        .max(255),
    asset_status: yup
        .string()
        .oneOf(["active"], "Asset must be active to perform this assignment operation.")
});

export const moveAssetSchema = yup.object({
    from_branch_id: yup
        .string()
        .required("Source branch required"),

    to_branch_id: yup
        .string()
        .required("Destination branch required")
        .test(
            "not-same",
            "Destination branch cannot be same",
            function (value) {
                return (
                    value !== this.parent.from_branch_id
                );
            }
        ),

    notes: yup.string(),
});