import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { forgotPasswordSchema } from "../validation/authValidation";

const ForgotPasswordForm = ({
    onSubmit,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver:
            yupResolver(
                forgotPasswordSchema
            ),
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div>
                <label className="block mb-2 text-sm font-medium">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {
                            errors.email
                                .message
                        }
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
                Send Reset Link
            </button>
        </form>
    );
};

export default ForgotPasswordForm;