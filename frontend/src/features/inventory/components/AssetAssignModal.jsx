import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import useBodyScrollLock from "../../../hooks/useBodyScrollLock";

import { assetAssignSchema } from "../validation/assetValidation";
import { assignAssetThunk } from "../assetThunk";
import { fetchUsersThunk } from "../../users/userThunk";
import branches from "../../../mock/branches.json";

import { FiX } from "react-icons/fi";
import ButtonLoader from "../../../components/common/loaders/ButtonLoader";
import { getRoleName } from "../../../utils/roleUtils";
import hasPermission from "../../../utils/hasPermission";

const AssetAssignModal = ({ isOpen, onClose, asset }) => {
    useBodyScrollLock(isOpen);
    const dispatch = useDispatch();

    const { user, permissions } = useSelector((state) => state.auth);
    const isSuperAdmin = hasPermission(permissions, ["manage_settings", "create_branch"]);
    
    const { actionLoading } = useSelector((state) => state.asset);
    const { users = [] } = useSelector((state) => state.users);

    // Hook 1: Fetch users list
    useEffect(() => {
        if (!users.length) {
            dispatch(fetchUsersThunk());
        }
    }, [dispatch, users.length]);

    // Hook 2: Initialize React Hook Form tracking parameters
    const {
        register,
        handleSubmit,
        reset,
        watch, 
        setError, 
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(assetAssignSchema),
        defaultValues: {
            asset_id: asset?.id || "",
        },
    });

    // Hook 3 & 4: Declare field watches safely *above* any early returns
    const fromBranch = watch("from_branch_id");
    const toBranch = watch("to_branch_id");

    // Hook 5: Cross-field mismatch dependency logic
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

    // Hook 6: Update internal default values if target asset properties update dynamically
    useEffect(() => {
        if (isOpen && asset?.id) {
            reset({ asset_id: asset.id });
        }
    }, [asset, isOpen, reset]);

    // Hook 7: Both Super Admin and Branch Heads get the asset's current branch by default
    useEffect(() => {
        if (!isOpen) return;
        reset({
            asset_id: asset?.id || "",
            from_branch_id: asset?.branch_id || "", 
        });
        
    }, [isOpen, asset, reset]);   

    // CRITICAL CORRECTION: MOVED EARLY RETURN BELOW ALL HOOKS
    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            console.log(data);            
            await dispatch(assignAssetThunk(data)).unwrap();
            reset();
            onClose();
        } catch (err) {
            console.log(err);
        }
    };   

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">

            <div className="w-full max-w-md max-h-[calc(100vh-4rem)] bg-white border border-slate-100 rounded-xl shadow-xl flex flex-col">   
                
                {/* HEADER */}  
                <div className="flex items-center justify-between p-6 pb-3 border-b border-slate-100">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Assign Asset
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
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            Assign To Whom
                        </label>

                        <select
                            {...register("to_user_id")}
                            className={`w-full appearance-none px-3 py-2.5 text-sm bg-white border rounded-lg shadow-sm placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-offset-0
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

                        {errors.to_user_id && (
                            <p className="text-red-600 text-xs font-medium mt-1 animate-slide-down">
                                {errors.to_user_id?.message}
                            </p>
                        )}
                    </div>

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
                            {actionLoading ? "Assigning..." : "Assign Asset"}
                        </button>
                    </div>
                </form>

            </div>
        </div>        
    );
};

export default AssetAssignModal;
