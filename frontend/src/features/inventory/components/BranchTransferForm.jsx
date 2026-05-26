import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const BranchTransferForm = ({
    onSubmit,
    products = [],
    branches = [],
}) => {
    /* VALIDATION */
    const schema = useMemo(() => {

        return yup.object({

            product_id: yup
                .string()
                .required("Product is required"),

            from_branch_id: yup
                .string()
                .required(
                    "Source branch is required"
                ),

            to_branch_id: yup
                .string()
                .required(
                    "Destination branch is required"
                )
                .test(
                    "same-branch",
                    "Source and destination branch cannot be same",
                    function (value) {

                        const {
                            from_branch_id,
                        } = this.parent;

                        return (
                            String(value) !==
                            String(
                                from_branch_id
                            )
                        );
                    }
                ),

            quantity: yup
                .number()
                .typeError(
                    "Quantity must be a number"
                )
                .required(
                    "Quantity is required"
                )
                .min(
                    1,
                    "Minimum quantity is 1"
                )
                .test(
                    "stock-check",
                    "Insufficient stock quantity",
                    function (value) {

                        const {
                            product_id,
                            from_branch_id,
                        } = this.parent;

                        const selectedProduct =
                            products.find(
                                (item) =>
                                    String(
                                        item.id
                                    ) ===
                                        String(
                                            product_id
                                        ) &&
                                    String(
                                        item.branch_id
                                    ) ===
                                        String(
                                            from_branch_id
                                        )
                            );

                        if (
                            !selectedProduct
                        ) {
                            return true;
                        }

                        return (
                            Number(value) <=
                            Number(
                                selectedProduct.quantity
                            )
                        );
                    }
                ),

            remarks: yup
                .string()
                .max(
                    255,
                    "Remarks cannot exceed 255 characters"
                )
                .nullable(),
        });

    }, [products]);

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            quantity: 1,
        },
    });

    const selectedProductId = watch("product_id");
    const selectedBranchId = watch("from_branch_id");
    const selectedInventory =
        products.find(
            (item) =>
                String(item.id) === String(selectedProductId) &&
                String(item.branch_id) === String(selectedBranchId)
        );

    return (
        <form
            onSubmit={handleSubmit(
                onSubmit
            )}
            className="space-y-5"
        >

            {/* PRODUCT */}
            <div>

                <label className="block mb-1 text-sm font-medium">
                    Product
                </label>

                <select
                    {...register(
                        "product_id"
                    )}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                    <option value="">
                        Select Product
                    </option>

                    {products.map(
                        (product) => (
                            <option
                                key={
                                    product.id
                                }
                                value={
                                    product.id
                                }
                            >
                                {product.name}
                            </option>
                        )
                    )}
                </select>

                {errors.product_id && (
                    <p className="text-sm text-red-500 mt-1">
                        {
                            errors
                                .product_id
                                .message
                        }
                    </p>
                )}
            </div>

            {/* FROM BRANCH */}
            <div>

                <label className="block mb-1 text-sm font-medium">
                    From Branch
                </label>

                <select
                    {...register(
                        "from_branch_id"
                    )}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                    <option value="">
                        Select Source Branch
                    </option>

                    {branches.map(
                        (branch) => (
                            <option
                                key={
                                    branch.id
                                }
                                value={
                                    branch.id
                                }
                            >
                                {branch.name}
                            </option>
                        )
                    )}
                </select>

                {errors.from_branch_id && (
                    <p className="text-sm text-red-500 mt-1">
                        {
                            errors
                                .from_branch_id
                                .message
                        }
                    </p>
                )}
            </div>

            {/* TO BRANCH */}
            <div>

                <label className="block mb-1 text-sm font-medium">
                    To Branch
                </label>

                <select
                    {...register(
                        "to_branch_id"
                    )}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                    <option value="">
                        Select Destination Branch
                    </option>

                    {branches.map(
                        (branch) => (
                            <option
                                key={
                                    branch.id
                                }
                                value={
                                    branch.id
                                }
                            >
                                {branch.name}
                            </option>
                        )
                    )}
                </select>

                {errors.to_branch_id && (
                    <p className="text-sm text-red-500 mt-1">
                        {
                            errors
                                .to_branch_id
                                .message
                        }
                    </p>
                )}
            </div>

            {/* AVAILABLE */}
            {selectedInventory && (
                <div className="text-sm text-slate-500">
                    Available Qty:

                    <span className="font-semibold ml-2">
                        {
                            selectedInventory.quantity
                        }
                    </span>
                </div>
            )}

            {/* QUANTITY */}
            <div>

                <label className="block mb-1 text-sm font-medium">
                    Quantity
                </label>

                <input
                    type="number"
                    min="1"
                    {...register(
                        "quantity"
                    )}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />

                {errors.quantity && (
                    <p className="text-sm text-red-500 mt-1">
                        {
                            errors
                                .quantity
                                .message
                        }
                    </p>
                )}
            </div>

            {/* REMARKS */}
            <div>

                <label className="block mb-1 text-sm font-medium">
                    Remarks
                </label>

                <textarea
                    rows="3"
                    {...register(
                        "remarks"
                    )}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />

                {errors.remarks && (
                    <p className="text-sm text-red-500 mt-1">
                        {
                            errors
                                .remarks
                                .message
                        }
                    </p>
                )}
            </div>

            {/* SUBMIT */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="
                    px-4 py-2 rounded-lg
                    bg-indigo-600 hover:bg-indigo-700
                    text-white disabled:opacity-50
                "
            >
                Transfer Stock
            </button>
        </form>
    );
};

export default BranchTransferForm;