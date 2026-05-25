import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import ProductForm from "../../components/ProductForm";
import { createProductThunk } from "../../inventoryThunk";

const ProductCreatePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, products } = useSelector((state) => state.inventory);

    const getDuplicateError = (existingProducts = [], newProduct) => {
        const newSku = newProduct?.sku?.trim().toLowerCase();
        const newName = newProduct?.name?.trim().toLowerCase();
        
        // Force form values to strings to prevent Type Mismatches (e.g., 1 vs "1")
        const newBranchId = String(newProduct?.branch_id).trim();
        const newCategoryId = String(newProduct?.category_id).trim();

        for (const item of existingProducts) {
            const itemSku = item?.sku?.trim().toLowerCase();
            const itemName = item?.name?.trim().toLowerCase();
            const itemBranchId = String(item?.branch_id).trim();
            const itemCategoryId = String(item?.category_id).trim();

            // Rule 1: Products with the same SKU globally
            if (itemSku && newSku && itemSku === newSku && item.status === 'active') {
                return "This SKU is already assigned to another active product.";
            }

            // Rule 2: Same Name inside the exact same Branch under a category
            if (itemName && newName && itemName === newName && 
                itemBranchId === newBranchId && 
                itemCategoryId === newCategoryId) {
                return "A product with this name already exists in this category and branch.";
            }
        }
        return null; // No duplicates found
    };


    const handleSubmit = async (values) => {
        try {
            const errorMessage = getDuplicateError(products, values);
            if (errorMessage) {
                toast.error(errorMessage); // Shows the specific error reason
                return;
            }
            await dispatch(createProductThunk(values)).unwrap();
            toast.success("Product created successfully!");
            navigate("/edu/products");
        } catch (error) {
            toast.error(error || "Product creation failed");
        }
    };

    return (
        <div className="max-w-5xl me-auto bg-white rounded-lg p-5 shadow-sm">
            {/* BACK BUTTON */}
            <Link
                to="/edu/products"
                className="inline-flex items-center gap-2 text-gray-500 mb-4 text-sm hover:text-gray-700 transition-colors"
            >
                <IoArrowBack />
                Back to Products
            </Link>

            {/* PAGE TITLE */}
            <h1 className="text-xl font-bold border-b border-slate-100 pb-2 mb-4">
                Create Product
            </h1>

            {/* FORM */}
            <ProductForm 
                onSubmit={handleSubmit} 
                loading={loading} 
            />
        </div>
    );
};

export default ProductCreatePage;
