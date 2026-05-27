import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import VendorForm from "../components/VendorForm";
import { fetchVendorByIdThunk, updateVendorThunk } from "../redux/vendorThunk";
import { clearSelectedVendor } from "../redux/vendorSlice";

const VendorEditPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { selectedVendor, loading } = useSelector((state) => state.vendors);

    // LOAD VENDOR
    useEffect(() => {
        dispatch(fetchVendorByIdThunk(id));
        return () => {
            dispatch(clearSelectedVendor());
        };
    }, [dispatch, id]);

    // UPDATE VENDOR
    const handleUpdateVendor = async (formData) => {
        try {
            await dispatch(updateVendorThunk({ id, vendorData: formData })).unwrap();
            toast.success("Vendor updated successfully");
            navigate('/edu/vendors');
        } catch (error) {
            console.error(error);
            toast.error(error || "Failed to update vendor");
        }
    };

    // LOADING
    if (loading && !selectedVendor) {
        return <div>Loading vendor...</div>;
    }

    // NO VENDOR FOUND
    if (!selectedVendor) {
        return <div>Vendor not found</div>;
    }

    return (
        <div className="space-y-3">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold">Edit Vendor</h1>
                <p className="text-gray-500">Update vendor information</p>
            </div>

            {/* FORM */}
            <VendorForm
                mode="edit"
                initialData={selectedVendor}
                onSubmit={handleUpdateVendor}
            />

        </div>
    );
};

export default VendorEditPage;