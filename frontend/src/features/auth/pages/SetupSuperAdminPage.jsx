import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createInitialSuperAdmin } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PasswordStrength from "../../auth/components/PasswordStrength";
import { setCredentials } from '../authSlice';
import {
    FaLock,
    FaEye,
    FaEyeSlash,
    FaEnvelope,
    FaUserTag
} from "react-icons/fa";
import { NAV_ROUTES } from "../../../constants/navRoutes";
import toast from "react-hot-toast";

const SetupSuperAdminPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const setupAdminSchema = yup.object({
    
        username: yup
            .string()
            .trim()
            .required("Username is required")
            .min(3, "Username must be at least 3 characters")
            .matches(
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers and underscores"
            ),
    
        email: yup
            .string()
            .trim()
            .lowercase()
            .email("Invalid email format")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email address")
            .max(100, "Email is too long")
            .required("Email is required"),
    
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[@$!%*?&]/, "Password must contain at least one special character"),    
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver:yupResolver(setupAdminSchema),
    });

    const password = watch("password", "");

    const onSetupSubmit = async (formData) => {
        try {
            const result = await createInitialSuperAdmin(formData);
            dispatch(setCredentials({
                user: result.user,
                token: result.token,
                permissions: result.permissions,
            }));
            toast.success(result.message);
            reset();
            navigate(NAV_ROUTES.DASHBOARD);
        } catch (err) {
            console.log(err.message);
            toast.error(err.message);
        }
    };

    return (
        <div className="w-full max-w-md bg-blue-950 border border-slate-800 rounded-xl shadow-2xl p-8">
            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="text-2xl font-bold text-white">Initial Setup</h1>
                <p className="text-slate-400 text-sm">Create Admin Account First</p>
            </div>
            <form
                onSubmit={handleSubmit((onSetupSubmit))}
                autoComplete="off"
                className="space-y-3"
            >
                <div>
                    <label className="block text-base font-medium text-slate-300">
                        Username
                    </label>
                    <div className="relative">
                        <FaUserTag className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-950" />
                        <input
                            type="text"
                            placeholder="Enter username"
                            {...register("username")}
                            className={`w-full bg-white border ${
                                errors.username
                                    ? "border-red-300 focus:ring-2 focus:ring-opacity-50 focus:ring-red-400"
                                    : "border-blue-300 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400"
                            } text-slate-950 rounded-lg py-2 pl-11 pr-12 outline-none transition`}
                        />
                    </div>
                    {errors.username && (
                        <p className="text-red-400 text-sm mt-2">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-base font-medium text-slate-300">
                        Email
                    </label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-950" />
                        <input
                            type="email"
                            placeholder="Enter email"
                            {...register("email")}
                            className={`w-full bg-white border ${
                                errors.email
                                    ? "border-red-300 focus:ring-2 focus:ring-opacity-50 focus:ring-red-400"
                                    : "border-blue-300 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400"
                            } text-slate-950 rounded-lg py-2 pl-11 pr-12 outline-none transition`}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-2">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-base font-medium text-slate-300">
                        Password
                    </label>

                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-950" />
                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter password"
                            {...register("password")}
                            className={`w-full bg-white border ${
                                errors.password
                                    ? "border-red-300 focus:ring-2 focus:ring-opacity-50 focus:ring-red-400"
                                    : "border-blue-300 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400"
                            } text-slate-950 rounded-lg py-2 pl-11 pr-12 outline-none transition`}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-950 transition"
                        >
                            {showPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </button>
                    </div>

                    {/* Password Strength */}
                    <PasswordStrength password={password} outside={true} />

                    {errors.password && (
                        <p className="text-red-400 text-sm mt-2">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-200 disabled:bg-slate-400 text-blue-950 
                    font-semibold py-2 rounded-lg transition duration-300 mt-1"
                >
                    {isSubmitting
                        ? "Creating Account..."
                        : "Create"}
                </button>
            </form>
        </div>
    );
};

export default SetupSuperAdminPage;