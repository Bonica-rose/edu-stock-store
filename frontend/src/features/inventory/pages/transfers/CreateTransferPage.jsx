import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import BranchTransferForm from "../../components/BranchTransferForm";
import branches from "../../../../mock/branches.json";
import { IoArrowBack } from "react-icons/io5";
import {
    createBranchTransferThunk,
} from "../../transferThunk";
import { fetchProductsThunk } from "../../inventoryThunk";

const CreateTransferPage = () => {
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
                createBranchTransferThunk({
                    ...values,
                    user_id: user?.id || "uid",
                })
            ).unwrap();
            toast.success("Branch transfer completed!");
            navigate("/edu/transfers");

        } catch (error) {
            toast.error( error || "Transfer failed"
            );
        }
    };

    return (
        <div className="max-w-3xl">
            {/* BACK BUTTON */}
            <Link
                to="/edu/transfers"
                className="inline-flex items-center gap-2 text-gray-500 mb-4 text-sm hover:text-gray-700 transition-colors"
            >
                <IoArrowBack />
                Back to Transfers
            </Link>
            <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h1 className="text-2xl font-bold mb-5">
                    Branch Transfer
                </h1>

                <BranchTransferForm
                    onSubmit={handleSubmit}
                    products={products}
                    branches={branches}
                />
            </div>
        </div>
    );
};

export default CreateTransferPage;