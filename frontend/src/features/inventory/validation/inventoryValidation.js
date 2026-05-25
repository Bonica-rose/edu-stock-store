import * as yup from "yup";

export const productSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name cannot exceed 100 characters")
        .required("Product name is required"),

    sku: yup
        .string()
        .trim()
        .min(5, "SKU must be at least 5 characters")
        .max(30, "SKU cannot exceed 30 characters")
        .required("SKU is required"),

    category_id: yup
        .number()
        .transform((value, originalValue) => String(originalValue).trim() === "" ? undefined : value)
        .typeError("Category is required")
        .required("Category is required"),

    branch_id: yup
        .number()
        .transform((value, originalValue) => String(originalValue).trim() === "" ? undefined : value)
        .typeError("Branch is required")
        .required("Branch is required"),

    quantity: yup
        .number()
        .transform((value, originalValue) => String(originalValue).trim() === "" ? undefined : value)
        .typeError("Quantity must be a number")
        .when("type", {
            is: "asset",
            then: (schema) =>
                schema
                    .oneOf([1],"Asset quantity must be exactly 1")
                    .required("Quantity is required"),

            otherwise: (schema) =>
                schema
                    .min(0,"Quantity cannot be negative")
                    .required("Quantity is required"),
        }),

    unit_price: yup
        .number()
        .transform((value, originalValue) => String(originalValue).trim() === "" ? undefined : value)
        .typeError("Price must be a number")
        .min(0, "Price cannot be negative")
        .required("Price is required"),

    type: yup
        .string()
        .oneOf(["product", "asset"], "Invalid type")
        .required("Type is required"),

    status: yup
        .string()
        .oneOf(["active", "inactive"], "Invalid status")
        .required("Status is required"),

    asset_status: yup
        .string()
        .nullable()
        .when("type", {
            is: "asset",
            then: (schema) => schema.required("Asset status is required"),
            otherwise: (schema) => schema.nullable().transform(() => null),
        }),
});
