import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

import StockMovementForm from "../../components/StockMovementForm";
import { stockMovementThunk } from "../../stockThunk";
import { fetchProductsThunk } from "../../inventoryThunk";

const StockOutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);    
    const { products } = useSelector((state) => state.inventory);

    useEffect(() => {
        dispatch(fetchProductsThunk());
    }, [dispatch]);

    const handleSubmit = async (values) => {
        try {
            await dispatch(
                stockMovementThunk({
                    ...values,
                    movement_type: "stock_out",
                    userId: user?.id || "uid",
                    branchId: user?.branch_id || "bid",
                })
            ).unwrap();

            toast.success("Stock deducted!");

            navigate("/edu/inventory");
        } catch (error) {
            toast.error(
                error || "Stock Out failed"
            );
        }
    };

    return (
        <div className="max-w-3xl">
            {/* BACK BUTTON */}
            <Link
                to="/edu/inventory"
                className="inline-flex items-center gap-2 text-gray-500 mb-4 text-sm hover:text-gray-700 transition-colors"
            >
                <IoArrowBack />
                Back to Inventory Stock 
            </Link>
            <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h1 className="text-2xl font-bold mb-5">
                    Stock Out
                </h1>

                <StockMovementForm
                    movementType="stock_out"
                    onSubmit={handleSubmit}
                    products={products}
                />
            </div>
        </div>
    );
};

export default StockOutPage;