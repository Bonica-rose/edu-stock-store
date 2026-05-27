import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useBodyScrollLock from "../../../hooks/useBodyScrollLock";
import {
    assignAssetThunk,
    moveAssetBranchThunk,
    maintenanceThunk,
    returnFromMaintenanceThunk,
    markAssetDamagedThunk,
} from "../assetThunk";
import { assetAssignSchema, moveAssetSchema, assetMaintenanceSchema } from "../validation/assetValidation";
import branches from "../../../mock/branches.json";
import { FiX } from "react-icons/fi";
import ButtonLoader from "../../../components/common/loaders/ButtonLoader";
import { getRoleName } from "../../../utils/roleUtils";
import toast from "react-hot-toast";

const AssetActionModal = ({ isOpen, onClose, asset, mode ,users, onSuccess, }) => {
    useBodyScrollLock(isOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const isSuperAdmin = user?.role_id === 1;   
    const { actionLoading } = useSelector((state) => state.asset);
    const isUsersLoading = !users?.length;
    

    const isAssign = mode === "assign";
    const isMove = mode === "move";
    const isMaintenance = mode === "maintenance";
    const isReturnMaintenance = mode === "returnMaintenance";
    const isDamage = mode === "damage";

    const MODAL_TITLES = {
        assign: "Assign Asset",
        move: "Move Asset",
        maintenance: "Send To Maintenance",
        returnMaintenance: "Return From Maintenance",
        damage: "Mark Asset Damaged",
    };

    const BUTTON_LABELS = {
        assign: "Assign Asset",
        move: "Move Asset",
        maintenance: "Send To Maintenance",
        returnMaintenance: "Return Asset",
        damage: "Mark Damaged",
    };

    const validationSchemaMap = {
        assign: assetAssignSchema,
        move: moveAssetSchema,
        maintenance: assetMaintenanceSchema,
        returnMaintenance: assetMaintenanceSchema,
        damage: assetMaintenanceSchema,
    };  
    
    const {
        register,
        handleSubmit,
        reset,
        watch, 
        setValue,
        setError, 
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            validationSchemaMap[mode]
        ),
        defaultValues: {
            asset_id: asset?.id || "",
        },
    });

    // Declare field watches safely *above* any early returns
    const fromBranch = watch("from_branch_id");
    const toBranch = watch("to_branch_id");

    // Cross-field mismatch dependency logic
    useEffect(() => {
        // Run condition checks internal to the hook stream safely
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
            to_branch_id: "",
            to_user_id: "",
            notes: "",
        });
    }, [isOpen, asset?.id, asset?.branch_id, reset]);

    // CRITICAL CORRECTION: MOVED EARLY RETURN BELOW ALL HOOKS
    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            // console.log("SUBMIT HIT", mode, data);
            
            // ASSIGN
            if (isAssign) {
                await dispatch(assignAssetThunk(
                    { asset_id: asset.id, ...data }
                )).unwrap();
            }

            // MOVE
            if (isMove) {
                await dispatch(moveAssetBranchThunk(
                    { asset_id: asset.id, ...data }
                )).unwrap();
            }

            // SEND TO MAINTENANCE
            if (isMaintenance) {
                await dispatch(maintenanceThunk(
                    {
                        asset_id: asset.id,
                        action_type: "maintenance_started",
                        asset_status: "maintenance",
                        ...data
                    }
                )).unwrap();
            }

            // RETURN FROM MAINTENANCE
            if (isReturnMaintenance) {
                await dispatch(returnFromMaintenanceThunk(
                    {
                        asset_id: asset.id,
                        action_type: "maintenance_completed",
                        asset_status: "active",
                        ...data
                    }
                )).unwrap();
            }

            // DAMAGE
            if (isDamage) {
                await dispatch(markAssetDamagedThunk(
                    {
                        asset_id: asset.id,
                        action_type: "damaged",
                        asset_status: "damaged",
                        notes: data.notes
                    })).unwrap();
            }
            toast.success("Successfuly done");
            // REFRESH PARENT PAGE DATA
            await onSuccess?.();
            reset();
            onClose();
        } catch (error) {
            console.error(error?.message);
            toast.error(
                typeof error === "string" ? error : error?.message || "Error occurred"
            );
        }
    };   

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">

            <div className="w-full max-w-md max-h-[calc(100vh-4rem)] bg-white border border-slate-100 rounded-xl shadow-xl flex flex-col">   
                
                {/* HEADER */}  
                <div className="flex items-center justify-between p-6 pb-3 border-b border-slate-100">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-slate-900">
                            {MODAL_TITLES[mode]}
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
                        aria-label="Close modal"
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
                    {/* USER ID */}
                    {isAssign && (
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-700">
                                Assign To Whom
                            </label>

                            {isUsersLoading ? (
                                <select disabled className="w-full appearance-none px-3 py-2.5 text-sm rounded-lg bg-slate-100">
                                    <option>Loading active users...</option>
                                </select>
                            ) : (
                                <select
                                    {...register("to_user_id")}
                                    className={`w-full appearance-none px-3 py-2.5 text-sm bg-white border rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0
                                        ${errors.to_user_id
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                                        }
                                    `}
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.fullname} ({getRoleName(user.role_id)})
                                        </option>
                                    ))}
                                </select>
                            )}

                            {errors.to_user_id && (
                                <p className="text-red-600 text-xs font-medium mt-1 animate-slide-down">
                                    {errors.to_user_id.message}
                                </p>
                            )}
                        </div>
                    )}

                    {isMove && (
                        <>
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
                        </>
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
                            {actionLoading ? "Processing..." : BUTTON_LABELS[mode]}
                        </button>
                    </div>
                </form>

            </div>
        </div>        
    );
};

export default AssetActionModal;
