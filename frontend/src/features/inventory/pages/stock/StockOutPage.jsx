import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import StockMovementForm from "../../components/StockMovementForm";

import {
    createStockMovementThunk,
} from "../../inventoryThunk";

const StockOutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            await dispatch(
                createStockMovementThunk({
                    ...values,
                    movement_type: "stock_out",
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
            <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h1 className="text-2xl font-bold mb-5">
                    Stock Out
                </h1>

                <StockMovementForm
                    movementType="stock_out"
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default StockOutPage;