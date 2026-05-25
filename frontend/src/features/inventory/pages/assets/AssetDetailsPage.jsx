import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchAssetHistoryThunk,
} from "../../assetThunk";
import { fetchProductsThunk } from "../../inventoryThunk"; // if you have it

import AssetAssignModal from "../../components/AssetAssignModal";
import AssetMoveBranchModal from "../../components/AssetMoveBranchModal";
import AssetHistoryTimeline from "../../components/AssetHistoryTimeline";
import { getBranchName } from "../../../../utils/branchUtils";

import { FiTool, FiUser, FiMapPin } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";

const AssetDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();    

    const [openMove, setOpenMove] = useState(false);
    const [openAssign, setOpenAssign] = useState(false);
    const [openDamage, setOpenDamage] = useState(false);
    const [openMaintain, setOpenMaintain] = useState(false);

    const { assetHistory, loading } = useSelector((state) => state.asset);
    const { products } = useSelector( (state) => state.inventory);

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProductsThunk());
        }
    }, [dispatch, products.length]);

    const asset = products.find((p) => String(p.id) === String(id));   
    const isAssetStatusActive = asset?.asset_status === "active";
    const isAssetStatusDamaged = asset?.asset_status === "damaged";
    const isAssetStatusMaintain = asset?.asset_status === "maintenance";

    useEffect(() => {
        dispatch(fetchAssetHistoryThunk(id));
    }, [id, dispatch]);   

    if (!products.length) {
        return (
            <div className="p-6">
                Loading asset...
            </div>
        );
    }

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
        <div className="p-6 space-y-6">
            
            {/* BACK BUTTON */}
            <Link
                to="/edu/assets"
                className="inline-flex items-center gap-2 text-gray-500 mb-4 text-sm hover:text-gray-700 transition-colors"
            >
                <IoArrowBack />
                Back to Assets
            </Link>
            {/* HEADER */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            {asset.name}
                        </h1>

                        <p className="text-sm text-gray-500">
                            SKU: {asset.sku}
                        </p>
                    </div>

                    <button
                        disabled={!isAssetStatusActive}
                        onClick={() => setOpenAssign(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isAssetStatusActive
                                ? "bg-blue-950 text-white hover:bg-blue-900 border-gray-800 cursor-pointer"
                                : "bg-gray-100 text-gray-600 border border-gray-200 cursor-not-allowed"
                        }`}
                        title={!isAssetStatusActive ? `Cannot assign asset while it is in ${asset?.asset_status} status` : ""}
                    >
                        Assign Asset
                    </button>
                </div>

                {/* QUICK INFO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-3 border border-gray-400 rounded-lg flex items-center gap-2">
                        <FiUser />
                        <span>
                            Status:{" "}
                            <b>{asset.asset_status}</b>
                        </span>
                    </div>

                    <div className="p-3 border border-gray-400 rounded-lg flex items-center gap-2">
                        <FiMapPin />
                        <span>
                            Branch: {" "}<b>{getBranchName(asset.branch_id)}</b>
                        </span>
                    </div>

                    <div className="p-3 border border-gray-400 rounded-lg flex items-center gap-2">
                        <FiTool />
                        <span>
                            Type: {" "}<b>{asset.type}</b>
                        </span>
                    </div>
                </div>
            </div>

            {/* ACTION PANEL */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h2 className="font-semibold mb-3">
                    Quick Actions
                </h2>

                {/* <div className="flex gap-3 flex-wrap">
                    <button
                        disabled={!isAssetStatusActive}
                        onClick={() => setOpenAssign(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isAssetStatusActive
                            ? "bg-lime-800 text-white hover:bg-lime-700 cursor-pointer"
                            : "bg-lime-200 text-lime-700 cursor-not-allowed "
                        }`}
                        title={!isAssetStatusActive ? `Cannot assign asset while it is in ${asset?.asset_status} status` : ""}
                    >
                        Assign
                    </button>

                    <button
                        disabled={isAssetStatusDamaged}
                        onClick={() => setOpenMaintain(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isAssetStatusDamaged
                            ? "bg-yellow-600 text-white hover:bg-yellow-500 cursor-pointer"
                            : "bg-yellow-200 text-yellow-700 cursor-not-allowed"
                            }`}
                        title={isAssetStatusDamaged ? `Cannot assign or move asset while it is in ${asset?.asset_status} status` : ""}
                    >
                        Maintenance
                    </button>

                    <button
                        disabled={!isAssetStatusActive}
                        onClick={() => setOpenDamage(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isAssetStatusDamaged
                            ? "bg-red-700 text-white hover:bg-red-600 cursor-pointer"
                            : "bg-red-200 text-red-700 cursor-not-allowed"
                        }`}
                        title={!isAssetStatusDamaged ? `Cannot assign asset while it is in ${asset?.asset_status} status` : ""}
                    >
                        Mark Damaged
                    </button>

                    <button
                        disabled={!isAssetStatusActive}
                        onClick={() => setOpenMove(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isAssetStatusActive
                            ? "bg-sky-800 text-white hover:bg-sky-700 cursor-pointer"
                            : "bg-sky-200 text-sky-700 cursor-not-allowed "
                        }`}
                        title={!isAssetStatusActive ? `Cannot move asset while it is in ${asset?.asset_status} status` : ""}
                    >
                        Move Branch
                    </button>
                </div> */}

                <div className="flex gap-3 flex-wrap">
                    {/* ASSIGN BUTTON */}
                    <button
                        disabled={!isAssetStatusActive}
                        onClick={() => setOpenAssign(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isAssetStatusActive
                                ? "bg-lime-800 text-white hover:bg-lime-700 cursor-pointer"
                                : "bg-lime-100 text-lime-600 border border-lime-200 cursor-not-allowed"
                        }`}
                        title={!isAssetStatusActive ? `Cannot assign asset while it is in "${asset?.asset_status}" status` : ""}
                    >
                        Assign
                    </button>

                    {/* MAINTENANCE BUTTON */}
                    <button
                        // FIX 1: Lock button if asset is already damaged OR already in maintenance
                        disabled={isAssetStatusDamaged || isAssetStatusMaintain}
                        onClick={() => setOpenMaintain(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            (!isAssetStatusDamaged && !isAssetStatusMaintain)
                                ? "bg-yellow-600 text-white hover:bg-yellow-500 cursor-pointer"
                                : "bg-yellow-100 text-yellow-600 border border-yellow-200 cursor-not-allowed"
                        }`}
                        title={isAssetStatusDamaged || isAssetStatusMaintain ? `Cannot send to maintenance while it is "${asset?.asset_status}"` : ""}
                    >
                        Maintenance
                    </button>

                    {/* MARK DAMAGED BUTTON */}
                    <button
                        // FIX 2: Only active or in-maintenance assets can be marked as damaged. Lock if already damaged.
                        disabled={isAssetStatusDamaged}
                        onClick={() => setOpenDamage(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            !isAssetStatusDamaged
                                ? "bg-red-700 text-white hover:bg-red-600 cursor-pointer"
                                : "bg-red-100 text-red-600 border border-red-200 cursor-not-allowed"
                        }`}
                        title={isAssetStatusDamaged ? "Asset is already marked as damaged." : ""}
                    >
                        Mark Damaged
                    </button>

                    {/* MOVE BRANCH BUTTON */}
                    <button
                        disabled={!isAssetStatusActive}
                        onClick={() => setOpenMove(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isAssetStatusActive
                                ? "bg-sky-800 text-white hover:bg-sky-700 cursor-pointer"
                                : "bg-sky-100 text-sky-600 border border-sky-200 cursor-not-allowed"
                        }`}
                        title={!isAssetStatusActive ? `Cannot move asset while it is in "${asset?.asset_status}" status` : ""}
                    >
                        Move Branch
                    </button>
                </div>

            </div>

            {/* HISTORY TIMELINE */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h2 className="font-semibold mb-4">
                    Asset History
                </h2>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <AssetHistoryTimeline
                        history={assetHistory}
                    />
                )}
            </div>

            {/* ASSIGN MODAL */}
            <AssetAssignModal
                isOpen={openAssign}
                onClose={() => setOpenAssign(false)}
                asset={asset}
            />

            {/* MOVE BRANCH MODAL */}
            <AssetMoveBranchModal
                isOpen={openMove}
                onClose={() => setOpenMove(false)}
                asset={asset}
            />
        </div>
    );
};

export default AssetDetailsPage;