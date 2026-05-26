import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import StockMovementForm from "../../components/StockMovementForm";
import { stockMovementThunk } from "../../stockThunk";
import { fetchProductsThunk } from "../../inventoryThunk";

const StockInPage = () => {
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
                    movement_type: "stock_in",
                    userId: user?.id || "uid",
                    branchId: user?.branch_id || "bid",
                })
            ).unwrap();

            toast.success("Stock added!");
            navigate("/edu/inventory");
        } catch (error) {
            toast.error(error || "Stock In failed");
        }
    };

    return (
        <div className="max-w-3xl">
            <div className="bg-white rounded-xl p-5 border">
                <h1 className="text-2xl font-bold mb-5">
                    Stock In
                </h1>

                <StockMovementForm
                    movementType="stock_in"
                    onSubmit={handleSubmit}
                    products={products}
                />
            </div>
        </div>
    );
};

export default StockInPage;