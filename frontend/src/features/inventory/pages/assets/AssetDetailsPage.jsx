import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAssetHistoryThunk } from "../../assetThunk";
import { fetchActiveUsersThunk } from "../../../users/userThunk";
import { setSelectedAsset } from "../../assetSlice";
import { getProductByIdAPI } from "../../services/inventoryAPI";
import AssetTimeline from "../../components/AssetHistoryTimeline";
import AssetActionModal from "../../components/AssetActionModal";
import { IoArrowBack } from "react-icons/io5";
import { getBranchName } from "../../../../utils/branchUtils";

const AssetDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    
    const [asset, setAsset] = useState(null);
    const [actionMode, setActionMode] = useState(null);

    const { users = [], loading } = useSelector((state) => state.users);
    const { assetHistory } = useSelector((state) => state.asset);

    const statusColors = {
        active: "text-green-600",
        maintenance: "text-yellow-600",
        damaged: "text-red-600",
    };

    // LOAD ASSET + HISTORY
    const refreshAsset = useCallback(async () => {
        try {
            const response = await getProductByIdAPI(id);
            if (!response) {
                navigate("/404");
                return;
            }

            setAsset(response);
            dispatch(setSelectedAsset(response));
            await dispatch(fetchAssetHistoryThunk(id)).unwrap();
        } catch (error) {
            console.error(error);
        }
    }, [id, navigate, dispatch]);

    useEffect(() => {
        refreshAsset();
    }, [refreshAsset]);

    // Fetch active users only
    useEffect(() => {
        if (!users?.length && !loading) {
            dispatch(fetchActiveUsersThunk());
        }
    }, [dispatch, loading, users?.length]);

    useEffect(() => {
        console.log("UPDATED USERS", users);
    }, [users]);

    if (!asset) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h2 className="font-semibold mb-4">
                    Asset not found
                </h2>
                {/* BACK BUTTON */}
                <Link
                    to="/edu/assets"
                    className="inline-flex items-center gap-2 text-gray-500 mb-4 text-sm hover:text-gray-700 transition-colors"
                >
                    <IoArrowBack />
                    Back to Assets
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            {/* BACK BUTTON */}
            <Link
                to="/edu/assets"
                className="inline-flex items-center gap-2 text-gray-500 mb-4 text-sm hover:text-gray-700 transition-colors"
            >
                <IoArrowBack />
                Back to Assets
            </Link>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                {/* PAGE HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{asset.name}</h1>
                        <p className="text-sm text-slate-500">SKU: {asset.sku}</p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap gap-2">
                        {asset.asset_status === "active" && (
                            <>
                                <button
                                    onClick={() => setActionMode("assign")}
                                    className="px-4 py-2 rounded-lg bg-blue-950 text-white hover:bg-blue-900 text-sm"
                                >
                                    Assign
                                </button>

                                <button
                                    onClick={() => setActionMode("move")}
                                    className="px-4 py-2 rounded-lg bg-sky-800 text-white hover:bg-sky-700 text-sm"
                                >
                                    Move
                                </button>

                                <button
                                    onClick={() => setActionMode("maintenance")}
                                    className="px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-500 text-sm"
                                >
                                    Need Maintenance
                                </button>

                                <button
                                    onClick={() => setActionMode("damage")}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 text-sm"
                                >
                                    Mark Damage
                                </button>
                            </>
                        )}

                        {asset.asset_status === "maintenance" && (
                            <button
                                onClick={() => setActionMode("returnMaintenance")}
                                className="px-4 py-2 rounded-lg bg-lime-800 text-white hover:bg-lime-700 text-sm"
                            >
                                Return from Maintenance
                            </button>
                        )}
                    </div>
                </div>

                {/* ASSET INFO */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
                
                    <div className="bg-white border border-gray-300 rounded-xl p-4">
                        <p className="text-sm text-slate-500">Type</p>
                        <h3 className="font-semibold">{asset.type}</h3>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-xl p-4">
                        <p className="text-sm text-slate-500">Quantity</p>
                        <h3 className="font-semibold">{asset.quantity}</h3>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-xl p-4 min-w-0">
                        <p className="text-sm text-slate-500">Branch</p>
                        <h3 className="font-semibold truncate" title={getBranchName(asset.branch_id)}>
                            {getBranchName(asset.branch_id)}
                        </h3>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-xl p-4">
                        <p className="text-sm text-slate-500">Status</p>
                        <h3 className={`font-semibold capitalize ${statusColors[asset.asset_status]}`}>
                            {asset.asset_status}
                        </h3>
                    </div>
                </div>

                {/* TIMELINE */}
                <div className="bg-white border border-gray-300 rounded-xl p-4 mt-3">
                    <h2 className="text-lg font-semibold mb-4">Asset Timeline</h2>
                    <AssetTimeline
                        history={assetHistory}
                        users={users}
                    />
                </div>

                {/* REUSABLE ACTION MODAL */}
                {actionMode && (
                    <AssetActionModal
                        isOpen={!!actionMode}
                        mode={actionMode}
                        asset={asset}
                        onClose={() => setActionMode(null)}
                        users={users}
                        onSuccess={refreshAsset}
                    />
                )}

            </div>
        </div>
    );
};

export default AssetDetailsPage;