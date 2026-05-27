import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// VALIDATION SCHEMA
const vendorSchema = yup.object({
    vendor_name: yup.string().required("Vendor name is required"),
    contact_person: yup.string().required("Contact person is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    gst_number: yup.string().required("GST number is required"),
    address: yup.string().required("Address is required"),
    status: yup.string().required("Status is required"),
});

const VendorForm = ({ mode = "create", initialData = {}, onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(vendorSchema),
        defaultValues: {
            vendor_name: "",
            contact_person: "",
            email: "",
            phone: "",
            gst_number: "",
            address: "",
            status: "active",
        },
    });

    // LOAD EDIT DATA
    useEffect(() => {
        if (mode === "edit" && initialData) {
            reset({
                vendor_name: initialData.vendor_name || "",
                contact_person: initialData.contact_person || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                gst_number: initialData.gst_number || "",
                address: initialData.address || "",
                status: initialData.status || "active",
            });
        }
    }, [mode, initialData, reset]);

    const submitHandler = async (data) => {
        if (onSubmit) {
            await onSubmit(data);
        }
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            {/* BASIC INFO */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">

                <h2 className="text-lg font-semibold">Vendor Information</h2>            

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* VENDOR NAME */}
                    <div>
                        <label className="block mb-1 text-sm">Vendor Name</label>
                        <input
                            type="text"
                            {...register("vendor_name")}
                            className="w-full border border-gray-400 rounded-lg px-3 py-2"
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.vendor_name?.message}</p>
                    </div>

                    {/* CONTACT PERSON */}
                    <div>
                        <label className="block mb-1 text-sm">Contact Person</label>
                        <input
                            type="text"
                            {...register("contact_person")}
                            className="w-full border border-gray-400 rounded-lg px-3 py-2"
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.contact_person?.message}</p>
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full border border-gray-400 rounded-lg px-3 py-2"
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="block mb-1 text-sm">Phone</label>
                        <input
                            type="text"
                            {...register("phone")}
                            className="w-full border border-gray-400 rounded-lg px-3 py-2"
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.phone?.message}</p>
                    </div>

                    {/* GST */}
                    <div>
                        <label className="block mb-1 text-sm">GST Number</label>
                        <input
                            type="text"
                            {...register("gst_number")}
                            className="w-full border border-gray-400 rounded-lg px-3 py-2"
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.gst_number?.message}</p>
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="block mb-1 text-sm">Status</label>
                        <select {...register("status")} className="w-full border border-gray-400 rounded-lg px-3 py-2">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <p className="text-sm text-red-500 mt-1">{errors.status?.message}</p>
                    </div>

                    {/* ADDRESS */}
                    <div>
                        <label className="block mb-1 text-sm">Address</label>
                        <textarea
                            rows={4}
                            {...register("address")}
                            className="w-full border border-gray-400 rounded-lg px-3 py-2"
                        />
                        <p className="text-sm text-red-500 mt-1">
                            {errors.address?.message}
                        </p>
                    </div>  
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 rounded-lg bg-blue-800 text-white disabled:opacity-50"
                    >
                        {mode === "edit" ? "Update Vendor" : "Create Vendor"}
                    </button>
                </div>
                    
            </div>
        </form>
    );
};

export default VendorForm;