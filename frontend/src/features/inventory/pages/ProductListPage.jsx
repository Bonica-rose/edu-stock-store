import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import ProductTable from "../components/ProductTable";
import Loader from "../../../components/ui/Loader";
import hasPermission from "../../../utils/hasPermission";
import {
    fetchProductsThunk,
    deleteProductThunk,
    updateProductStatusThunk,
    updateAssetStatusThunk
} from "../inventoryThunk";
import { NAV_ROUTES } from "../../../constants/navRoutes";


const ProductListPage = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.inventory);
    const { permissions } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchProductsThunk());
        
    }, [dispatch]);

    const toggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";

            await dispatch(
                updateProductStatusThunk({
                    id,
                    status: newStatus,
                })
            ).unwrap();

            toast.success("Product status updated!");
        } catch (error) {
            toast.error(error || "Status update failed!");
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Delete this product?");
            if (!confirmDelete) return;

            await dispatch(deleteProductThunk(id)).unwrap();
            toast.success("Product deleted!");
        } catch (error) {
            toast.error(error || "Product deletion failed!");
        }
    };

    // const updateAssetStatus = async (id, status) => {
    //     try {
    //         await dispatch(updateAssetStatusThunk({id,asset_status: status})).unwrap();
    //         toast.success("Asset updated!");
    //     } catch (err) {
    //         toast.error(err);
    //     }
    // };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 font-sans antialiased text-slate-900">
            {/* HEADING SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                        Products
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your catalog items, warehouse configurations, and physical assets.
                    </p>
                </div>

                {hasPermission(permissions, ["create_product", "create_asset"]) && (
                    <Link
                        to={NAV_ROUTES.PRODUCT_CREATE}
                        className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-200 self-start sm:self-auto"
                    >
                        <FaPlus className="text-xs" />
                        <span>Add Product</span>
                    </Link>
                )}
            </div>

            {/* TABLE CONTAINER CARD */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-1 sm:p-2">
                <ProductTable
                    products={products}
                    toggleStatus={toggleStatus}
                    onDelete={handleDelete}
                    authPermissions={permissions}
                />
            </div>
        </div>
    );
};

export default ProductListPage;
