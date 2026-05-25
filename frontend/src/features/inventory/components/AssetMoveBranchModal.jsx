import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import useBodyScrollLock from "../../../hooks/useBodyScrollLock";

import { moveAssetSchema } from "../validation/assetValidation";
import { moveAssetBranchThunk } from "../assetThunk";
import branches from "../../../mock/branches.json";

import { FiX } from "react-icons/fi";
import ButtonLoader from "../../../components/common/loaders/ButtonLoader";
import hasPermission from "../../../utils/hasPermission";

const AssetMoveBranchModal = ({ isOpen, onClose, asset }) => {
    useBodyScrollLock(isOpen);
    const dispatch = useDispatch();
    const { permissions } = useSelector((state) => state.auth);
    const isSuperAdmin = hasPermission(permissions, ["manage_settings", "create_branch"]);    
    const { actionLoading } = useSelector((state) => state.asset);
    const {
        register,
        handleSubmit,
        reset,
        watch, 
        setError, 
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(moveAssetSchema),
        defaultValues: {
            asset_id: asset?.id || "",
            from_branch_id: asset?.branch_id || "",
        },
    });

    const fromBranch = watch("from_branch_id");
    const toBranch = watch("to_branch_id");
    useEffect(() => {
        if (!isOpen) return;

        if (fromBranch && toBranch && String(fromBranch).trim() === String(toBranch).trim()) {
            setError("to_branch_id", { 
                type: "manual", 
                message: "Destination branch cannot be the same as the source branch." 
            });
        } else {
            clearErrors("to_branch_id");
        }
    }, [fromBranch, toBranch, setError, clearErrors, isOpen]);

    useEffect(() => {
        if (!isOpen) return;        
        reset({
            asset_id: asset?.id || "",
            from_branch_id: asset?.branch_id || "", 
        });
    }, [isOpen, asset, reset]); 
    
    if (!isOpen) return null;
    const onSubmit = async (data) => {
        try {
            console.log("Submitting Move Data:", data);            
            await dispatch(
                moveAssetBranchThunk({
                    asset_id: asset.id,
                    ...data,
                })
            ).unwrap();
            reset();
            onClose();
        } catch (err) {
            console.error("Submission Error:", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">

            <div className="w-full max-w-md max-h-[calc(100vh-4rem)] bg-white border border-slate-100 rounded-xl shadow-xl flex flex-col">   
                
                <div className="flex items-center justify-between p-6 pb-3 border-b border-slate-100">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Move Asset Branch
                        </h2>
                        {asset?.name && (
                            <span className="text-xs font-medium text-slate-500 mt-0.5">
                                Asset: {asset?.name} ({asset?.sku || "No SKU"})
                            </span>
                        )}
                    </div>

                    <button 
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 overflow-y-auto p-6 space-y-4 
                        scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                    {/* FROM BRANCH */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            From Branch
                        </label>

                        <select
                            disabled={!isSuperAdmin}
                            {...register("from_branch_id")}
                            className={`w-full appearance-none px-3 py-2.5 text-sm bg-white border rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0
                                ${errors.from_branch_id 
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-100" 
                                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                                }
                            `}
                        >
                            <option value="">Select Branch</option>
                            {branches.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>

                        {errors.from_branch_id && (
                            <p className="text-red-600 text-xs font-medium mt-1">
                                {errors.from_branch_id?.message}
                            </p>
                        )}
                    </div>

                    {/* TO BRANCH */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            To Branch
                        </label>

                        <select
                            {...register("to_branch_id")}
                            className={`w-full appearance-none px-3 py-2.5 text-sm bg-white border rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0
                                ${errors.to_branch_id 
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-100" 
                                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                                }
                            `}
                        >
                            <option value="">Select Destination Branch</option>
                            {branches.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>

                        {errors.to_branch_id && (
                            <p className="text-red-600 text-xs font-medium mt-1">
                                {errors.to_branch_id?.message}
                            </p>
                        )}
                    </div>

                    {/* Hidden field guard: Required so react-hook-form grabs the value when disabled for Branch Heads */}
                    {!isSuperAdmin && (
                        <input type="text" {...register("from_branch_id")} value={asset?.branch_id || ""} />
                    )}

                    {/* NOTES */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            Notes
                        </label>

                        <textarea
                            {...register("notes")}
                            className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg shadow-sm placeholder:text-slate-400 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Provide details about this assignment..."
                            rows={3}
                        />
                    </div>

                    {/* ACTIONS BUTTONS CONTAINER */}
                    <div className="flex items-center justify-end gap-3 pt-3 mt-6 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={actionLoading}
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-200
                                ${actionLoading 
                                    ? "bg-blue-400 cursor-not-allowed" 
                                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
                                }
                            `}
                        >
                            {actionLoading && <ButtonLoader size="xs" color="white" />}
                            {actionLoading ? "Moving..." : "Move Branch"}
                        </button>
                    </div>
                </form>
        </div>
    </div>
);

};

export default AssetMoveBranchModal;
