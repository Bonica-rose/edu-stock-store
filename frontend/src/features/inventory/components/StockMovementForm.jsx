import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const StockMovementForm = ({
    onSubmit,
    movementType,
    products,
}) => {

    /* DYNAMIC VALIDATION */
    const schema = useMemo(() => {
        return yup.object({
            product_id: yup
                .string()
                .required("Product is required"),

            quantity: yup
                .number()
                .typeError("Quantity must be a number")
                .required("Quantity is required")
                .min(1, "Minimum quantity is 1")
                .test(
                    "stock-check",
                    "Insufficient stock quantity",
                    function (value) {

                        // skip for stock in
                        if (movementType !== "stock_out") {
                            return true;
                        }

                        const productId = this.parent.product_id;

                        const selectedProduct =
                            products.find(
                                (item) => String(item.id) === String(productId)
                            );

                        if (!selectedProduct) {
                            return true;
                        }

                        return (Number(value) <= Number(selectedProduct.quantity));
                    }
                ),

            remarks: yup
                .string()
                .max(255,"Remarks cannot exceed 255 characters")
                .nullable(),
        });
    }, [movementType, products]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            quantity: 1,
        },
    });

    const selectedProductId = watch("product_id");

    const selectedProduct = products.find(
        (item) =>
            String(item.id) ===
            String(selectedProductId)
    );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            {/* PRODUCT */}
            <div>
                <label className="block mb-1 text-sm font-medium">
                    Product
                </label>

                <select
                    {...register("product_id")}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="">
                        Select Product
                    </option>

                    {products
                        .filter((item) => item.type === "product")
                        .map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                </select>

                {errors.product_id && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.product_id.message}
                    </p>
                )}
            </div>

            {/* AVAILABLE */}
            {selectedProduct && (
                <div className="text-sm text-slate-500">
                    Available Qty:
                    <span className="font-semibold ml-2">
                        {selectedProduct.quantity}
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
                    {...register("quantity")}
                    className="w-full border rounded-lg px-3 py-2"
                />

                {errors.quantity && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.quantity.message}
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
                    {...register("remarks")}
                    className="w-full border rounded-lg px-3 py-2"
                />

                {errors.remarks && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.remarks.message}
                    </p>
                )}
            </div>

            {/* SUBMIT */}
            <button
                type="submit"
                disabled={
                    !selectedProduct || isSubmitting
                }
                className={`
                    px-4 py-2 rounded-lg text-white disabled:opacity-50
                    ${
                        movementType === "stock_in"
                            ? "bg-green-600"
                            : "bg-red-600"
                    }
                `}
            >
                {movementType === "stock_in"
                    ? "Add Stock"
                    : "Deduct Stock"}
            </button>
        </form>
    );
};

export default StockMovementForm;