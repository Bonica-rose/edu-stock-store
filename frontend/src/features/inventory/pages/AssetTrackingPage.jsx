import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Loader from "../../../components/ui/Loader";

import {
    fetchProductByIdThunk,
    updateAssetStatusThunk,
} from "../inventoryThunk";

const AssetTrackingPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        selectedProduct,
        loading,
    } = useSelector((state) => state.inventory);

    useEffect(() => {
        dispatch(fetchProductByIdThunk(id));
    }, [id, dispatch]);

    //adjusting now
    // if (selectedProduct?.id == null) {
    //     const products = JSON.parse(localStorage.getItem('inventory_products'));
        
        
    //     selectedProduct = products.find((product) =>
    //         String(product.id) === String(id) && product.type == 'asset'
    //     )

    //     console.log(selectedProduct);
    // }

    // Define a computed asset variable using Redux state as primary, and LocalStorage as a fallback
const asset = useMemo(() => {
    // 1. If Redux already has the correct product loaded, use it
    if (selectedProduct && String(selectedProduct.id) === String(id)) {
        return selectedProduct;
    }

    // 2. Fallback: Parse from local storage directly if Redux state is empty/stale
    try {
        const storedProducts = JSON.parse(localStorage.getItem("inventory_products")) || [];
        return storedProducts.find(
            (product) => String(product.id) === String(id) && product.type === "asset"
        );
    } catch (error) {
        console.error("Failed to parse fallback inventory from localStorage:", error);
        return null;
    }
}, [selectedProduct, id]);

// Console log the computed tracking target
console.log("Current Tracking Asset:", asset);

// Update your loading guard to check the computed asset
if (loading || !asset) {
    return <Loader />;
}


    const updateStatus = async (status) => {
        try {
            await dispatch(
                updateAssetStatusThunk({
                    id,
                    asset_status: status,
                })
            ).unwrap();

            toast.success("Asset updated");
        } catch (err) {
            toast.error(err || "Update failed");
        }
    };

    // if (loading || !selectedProduct) {
    //     return <Loader />;
    // }

    // const asset = selectedProduct;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">

            <h1 className="text-2xl font-bold mb-4">
                Asset Tracking
            </h1>

            <div className="space-y-3">

                <p><b>Name:</b> {asset.name}</p>
                <p><b>SKU:</b> {asset.sku}</p>
                <p><b>Branch:</b> {asset.branch_id}</p>

                <p>
                    <b>Status:</b>{" "}
                    <select
                        value={asset.asset_status}
                        onChange={(e) =>
                            updateStatus(e.target.value)
                        }
                        className="border px-2 py-1 rounded"
                    >
                        <option value="active">Active</option>
                        <option value="damaged">Damaged</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </p>

            </div>
        </div>
    );
};

export default AssetTrackingPage;