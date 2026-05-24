import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import Loader from "../../../components/ui/Loader";
import hasPermission from "../../../utils/hasPermission";

import {
    fetchProductsThunk,
    deleteProductThunk,
    updateAssetStatusThunk,
} from "../inventoryThunk";

import AssetTable from "../components/AssetTable";
import { NAV_ROUTES } from "../../../constants/navRoutes";

const AssetListPage = () => {
    const dispatch = useDispatch();

    const { products, loading } = useSelector((state) => state.inventory);
    const { permissions } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchProductsThunk());
    }, [dispatch]);

    const assets = products.filter((p) => p.type === "asset");

    const updateAssetStatus = async (id, status) => {
        try {
            await dispatch(
                updateAssetStatusThunk({
                    id,
                    asset_status: status,
                })
            ).unwrap();

            toast.success("Asset status updated");
        } catch (err) {
            toast.error(err || "Update failed");
        }
    };

    const handleDelete = async (id) => {
        try {
            if (!window.confirm("Delete asset?")) return;

            await dispatch(deleteProductThunk(id)).unwrap();
            toast.success("Asset deleted");
        } catch (err) {
            toast.error(err || "Delete failed");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-1 sm:p-2">
            <div className="space-y-6 max-w-7xl mx-auto p-4">
                {/* HEADER */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Asset Management</h1>
                        <p className="text-sm text-gray-500">Track and manage all assets</p>
                    </div>

                    {hasPermission(permissions, "create_asset") && (
                        <Link
                            to={NAV_ROUTES.ASSET_CREATE}
                            className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                            <FaPlus /> Add Asset
                        </Link>
                    )}
                </div>

                {/* TABLE */}
                <AssetTable
                    assets={assets}
                    updateAssetStatus={updateAssetStatus}
                    onDelete={handleDelete}
                    permissions={permissions}
                />
            </div>
        </div>

    );
};

export default AssetListPage;
