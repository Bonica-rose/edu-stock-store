import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../validation/inventoryValidation";
import categories from "../../../mock/categories.json";
import branches from "../../../mock/branches.json";
import { ASSET_STATUS, PRODUCT_TYPES } from "../../../constants/inventoryConstants";
import generateSku from "../utils/generateSku";

const ProductForm = ({
    defaultValues = {},
    onSubmit,
    loading = false,
}) => {  
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(productSchema),
        defaultValues: {
            name: "",
            sku: "",
            category_id: "",
            quantity: 0,
            unit_price: 0,
            branch_id: "",
            type: "product",
            asset_status: "",
            status: "active",
            ...defaultValues,
        },
    });

    const selectedType = watch("type");

    useEffect(() => {
        if (selectedType) {
            setValue("sku",generateSku(selectedType));
        }
    }, [selectedType,setValue]);

    useEffect(() => {
        if (defaultValues?.id) {
            reset({
                name: defaultValues.name || "",
                sku: defaultValues.sku || "",
                category_id: defaultValues.category_id || "",
                quantity: defaultValues.quantity || "",
                unit_price: defaultValues.unit_price || "",
                branch_id: defaultValues.branch_id || "",
                type: defaultValues.type || "product",
                asset_status: defaultValues.asset_status || "",
                status: defaultValues.status || "active",
            });
        }
    }, [defaultValues, reset]);

    // Reusable design classes inherited directly from UserForm
    const labelClasses = "font-normal text-[14.9px] text-slate-700 flex items-center gap-0.5 mb-1";
    const inputClasses = "w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-200 bg-white text-slate-800 font-sans";
    const errorClasses = "text-red-600 text-sm mt-1";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-4xl mx-auto p-2 text-slate-800 font-sans"
        >
            {/* ROW 1: PRODUCT NAME */}
            <div className="grid grid-cols-1">
                <div>
                    <label className={labelClasses}>
                        Product Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Enter product name"
                        className={inputClasses}
                    />
                    {errors.name && (
                        <p className={errorClasses}>{errors.name?.message}</p>
                    )}
                </div>
            </div>

            {/* ROW 2: SKU & CATEGORY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>
                        SKU<span className="text-red-500">*</span>
                    </label>
                    <input
                        readOnly
                        type="text"
                        {...register("sku")}
                        placeholder="SKU code"
                        className={inputClasses}
                    />
                    {errors.sku && (
                        <p className={errorClasses}>{errors.sku?.message}</p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>
                        Category<span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register("category_id")}
                        className={inputClasses}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && (
                        <p className={errorClasses}>{errors.category_id?.message}</p>
                    )}
                </div>
            </div>

            {/* ROW 3: BRANCH & TYPE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>
                        Branch<span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register("branch_id")}
                        className={inputClasses}
                    >
                        <option value="">Select Branch</option>
                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                    {errors.branch_id && (
                        <p className={errorClasses}>{errors.branch_id?.message}</p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>
                        Type<span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register("type")}
                        className={inputClasses}
                    >
                        {PRODUCT_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    {errors.type && (
                        <p className={errorClasses}>{errors.type?.message}</p>
                    )}
                </div>
            </div>

            {/* ROW 4: QUANTITY & PRICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>
                        Quantity<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        {...register("quantity")}
                        placeholder="Enter quantity"
                        className={inputClasses}
                    />
                    {errors.quantity && (
                        <p className={errorClasses}>{errors.quantity?.message}</p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>
                        Price<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("unit_price")}
                        placeholder="Enter price"
                        className={inputClasses}
                    />
                    {errors.unit_price && (
                        <p className={errorClasses}>{errors.unit_price?.message}</p>
                    )}
                </div>
            </div>

            {/* ROW 5: ASSET STATUS (CONDITIONAL) */}
            {selectedType === "asset" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}>
                            Asset Status<span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("asset_status")}
                            className={inputClasses}
                        >
                            <option value="">Select Status</option>
                            {ASSET_STATUS.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                        {errors.asset_status && (
                            <p className={errorClasses}>{errors.asset_status?.message}</p>
                        )}
                    </div>
                </div>
            )}

            {/* SUBMIT BUTTON ACTIONS */}
            <div className="flex justify-end gap-1">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto min-w-30 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading
                        ? "Saving..."
                        : defaultValues?.id
                        ? "Update Product"
                        : "Save Product"
                    }
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
