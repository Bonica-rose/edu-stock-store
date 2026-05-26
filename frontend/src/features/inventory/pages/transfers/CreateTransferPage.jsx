import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import BranchTransferForm from "../../components/BranchTransferForm";
import branches from "../../../../mock/branches.json";
import {
    createBranchTransferThunk,
} from "../../transferThunk";

const CreateTransferPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector((state) => state.inventory);

    const handleSubmit = async (values) => {
        try {
            await dispatch(
                createBranchTransferThunk({
                    ...values,
                    user_id:"1815e2d8-9dd6-465a-be1c-56de713008e4",
                })
            ).unwrap();
            toast.success("Branch transfer completed!");
            navigate("/edu/inventory/transfers");

        } catch (error) {
            toast.error( error || "Transfer failed"
            );
        }
    };

    return (
        <div className="max-w-3xl">
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