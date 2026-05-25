import * as yup from "yup";

/* ASSIGN ASSET */
export const assetAssignSchema = yup.object({
    asset_id: yup.string().required("Asset is required"),
    to_user_id: yup.string().required("User is required"),
    notes: yup.string().max(255, "Notes cannot exceed 255 characters").nullable(),
});

/* MOVE ASSET */
export const moveAssetSchema = yup.object({
    from_branch_id: yup.string().required("Source branch required"),
    to_branch_id: yup.string()
        .required("Destination branch required")
        .test("not-same", "Destination branch cannot be same", function (value) {
            return value !== this.parent.from_branch_id;
        }),
    notes: yup.string().max(255, "Notes cannot exceed 255 characters").nullable(),
});

/* MAINTENANCE / DAMAGE */
export const assetMaintenanceSchema = yup.object({
    notes: yup.string().required("Notes are required").max(255, "Notes cannot exceed 255 characters"),
});
