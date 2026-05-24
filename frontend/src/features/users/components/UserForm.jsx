import  { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FormSelect from "../../../components/forms/FormSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../userValidation";
import toast from "react-hot-toast";


const UserForm = ({
    onSubmit,
    branches,
    roles,
    loading,
    defaultValues,
}) => { 

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            username: "",
            email: "",
            branch_id: "",
            role_id: "",
            status: "active",
        },
    });

    useEffect(() => {
        if (defaultValues?.id) {
            reset({
                username: defaultValues.username || "",
                email: defaultValues.email || "",
                branch_id: defaultValues.branch_id || "",
                role_id: defaultValues.role_id || "",
                status: defaultValues.status || "active",
            });
        }
    }, [defaultValues, reset]);

    useEffect(() => {
        if (!defaultValues?.id && roles.length) {
            const defaultRole = roles.find(
                (r) => r.name === "staff"
            );

            if (defaultRole) {
                setValue(
                    "role_id",
                    defaultRole.value
                );
            }
        }
    }, [roles, defaultValues, setValue]);

    const handleFormSubmit = async (formData) => {
        try {
            // console.log("user Success:", formData);
            onSubmit(formData); // call parent function
        } catch (error) {
            toast.error(error || "Error occured");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            // className="space-y-5"
            className="space-y-6 max-w-4xl mx-auto p-2 text-slate-800 font-sans"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                <div>
                    <label className="font-normal text-[14.9px] text-slate-700 flex items-center gap-0.5">
                        Username<span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("username")}
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
                        placeholder="Enter username"
                    />
                
                    {errors.username && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.username?.message}
                        </p>
                    )}
                </div>            

                <div>
                    <label className="font-normal text-[14.9px] text-slate-700 flex items-center gap-0.5">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("email")}
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 
                        outline-none  focus:ring-2 ring-indigo-200"
                        placeholder="Enter email"
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.email?.message}
                        </p>
                    )}
                </div>
            </div>    

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">   
                {/* Branch Selection */}
                <div>
                    <label className="font-normal text-[14.9px] text-slate-700 flex items-center gap-0.5">
                        Branch<span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="branch_id"
                        control={control}
                        render={({ field }) => (
                            <FormSelect
                                options={branches}
                                value={
                                    branches.find(
                                        (branch) =>
                                            branch.value === field.value
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option?.value || "")
                                }
                                error={errors.branch_id}
                                placeholder="Select Branch"
                            />
                        )}
                    />
                    {errors.branch_id && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.branch_id?.message}
                        </p>
                    )}
                </div>

                {/* Role Selection */}
                <div>
                    <label className="font-normal text-[14.9px] text-slate-700 flex items-center gap-0.5">
                        Role<span className="text-red-500">*</span>
                    </label> 
                    <Controller
                        name="role_id"
                        control={control}
                        render={({ field }) => (
                            <FormSelect
                                options={roles}
                                value={
                                    roles.find(
                                        (role) =>
                                            role.value === field.value
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option?.value || "")
                                }
                                error={errors.role_id}
                                placeholder="Select Role"
                            />
                        )}
                    />
                    {errors.role_id && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.role_id?.message}
                        </p>
                    )}
                </div>
            </div>            

            <div className="flex justify-end gap-1">
                <button
                    disabled={loading}
                    className="w-full sm:w-auto min-w-30 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {/* {loading ? "Saving..." : "Save User"} */}
                    {
                        loading
                            ? "Saving..."
                            : defaultValues?.id
                            ? "Update User"
                            : "Save User"
                    }
                </button>
            </div>
            
        </form>
    );
};

export default UserForm;