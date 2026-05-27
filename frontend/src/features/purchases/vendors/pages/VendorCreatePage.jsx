import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import VendorForm from "../components/VendorForm";
import { useDispatch } from "react-redux";
import {
    createVendorThunk,
} from "../redux/vendorThunk";

const VendorCreatePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateVendor = async (formData) => {
        try {
            // console.log(formData);            
            await dispatch(createVendorThunk(formData)).unwrap();
            toast.success("Vendor created successfully");
            navigate('/edu/vendors');
        } catch (error) {
            console.error(error);
            toast.error(error || "Failed to create vendor");
        }
    };

    return (
        <div className="space-y-3">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold">Create Vendor</h1>
                <p className="text-gray-500">Add a new vendor</p>
            </div>

            {/* FORM */}
            <VendorForm mode="create" onSubmit={handleCreateVendor} />
        </div>
    );
};

export default VendorCreatePage;
