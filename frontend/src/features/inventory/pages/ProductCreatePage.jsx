import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import ProductForm from "../components/ProductForm";
import { createProductThunk } from "../inventoryThunk";

const ProductCreatePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.inventory);

    const handleSubmit = async (values) => {
        try {
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
