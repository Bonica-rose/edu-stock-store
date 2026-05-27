import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaEnvelope,
    FaLock,
} from "react-icons/fa";
import { loginSchema } from "../validation/authValidation";
import { NAV_ROUTES } from "../../../constants/navRoutes";

const LoginForm = ({ onSubmit, loading }) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver:
            yupResolver(loginSchema),
    });

    return (
        <div className="w-full max-w-md bg-blue-950 border border-slate-800 rounded-xl shadow-2xl p-8">
            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                <p className="text-slate-400 text-sm">Login to your account</p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
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

                    {errors.password && (
                        <p className="text-red-400 text-sm mt-2">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-200 disabled:bg-slate-400 text-blue-950 
                    font-semibold py-2 rounded-lg transition duration-300"
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>
            </form>
            {/* Register Link */}
            {/* <p className="text-center text-slate-400 text-sm mt-6">
                Don&apos;t have an account?{" "}
                <Link to={NAV_ROUTES.REGISTER} className="text-red-400 hover:text-blue-400 cursor-pointer">
                    Register
                </Link>
            </p> */}
        </div>
    );
};

export default LoginForm;