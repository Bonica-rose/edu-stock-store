import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePasswordThunk } from "../authThunk";
import PasswordStrength from "../components/PasswordStrength";
import { logout } from "../authSlice";
import { clearAuthStorage } from "../../../utils/clearAuthStorage";
import { changePasswordSchema } from "../validation/authValidation";
import { NAV_ROUTES } from "../../../constants/navRoutes";
import {
    FaEye,
    FaEyeSlash,
    FaLock,
} from "react-icons/fa";

const ForceChangePasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const isForcedPasswordChange = user?.must_change_password;
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(changePasswordSchema(user.password)),
    });

    const password = watch("new_password", "");    

    const onSubmit = async (data) => {
        try {         
            // console.log("Enetred Form data:", data);
            const payload = {
                userId: user.id,
                mailId: user.email,
                newPassword: data.new_password
            };
            // console.log("Password data:", payload);
            
            const res = await dispatch(changePasswordThunk(payload)).unwrap();  
            console.log(res)
            console.log(isForcedPasswordChange)
            // logout & redirect
            if (res.password_change_flag) {    
                dispatch(logout());
                clearAuthStorage();
                navigate(NAV_ROUTES.LOGIN, {
                    replace: true,
                });
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
      <div className="max-w-md mx-auto bg-white p-5 md:p-6 border border-slate-200 rounded-xl shadow-sm font-sans text-slate-800">
          <div className="border-b border-slate-100 pb-4 mb-5">
              <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
              <p className="text-xs text-slate-500 mt-1">
                  Ensure your account is using a long, unique password to stay secure.
              </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Current Password */}
              <div className="flex flex-col gap-0.5">
                  <label className="font-normal text-[14.9px] text-slate-700 flex items-center gap-0.5">
                      Current Password <span className="text-red-500">*</span>
                  </label>                  
                  <div className="relative">
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                      <input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          {...register("current_password")}
                          className={`w-full border rounded-lg py-2 pl-10 pr-10 text-sm outline-none transition-all duration-150 placeholder:text-slate-400 text-slate-900
                              ${errors.current_password
                                  ? "border-red-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                                  : "border-slate-300 focus:border-blue-800 focus:ring-2 focus:ring-indigo-200"
                              }`}
                      />

                      <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-blue-900 rounded transition-colors cursor-pointer"
                      >
                          {showCurrentPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                      </button>
                  </div>

                  {errors.current_password && (
                      <p className="text-red-600 text-sm mt-0.5">
                          {errors.current_password.message}
                      </p>
                  )}
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-0.5">
                  <label className="font-normal text-[14.9px] text-slate-700 flex items-center gap-0.5">
                      New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                      <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...register("new_password")}
                          className={`w-full border rounded-lg py-2 pl-10 pr-10 text-sm outline-none transition-all duration-150 placeholder:text-slate-400 text-slate-900
                              ${errors.new_password
                                  ? "border-red-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                                  : "border-slate-300 focus:border-blue-800 focus:ring-2 focus:ring-indigo-200"
                              }`}
                      />
                      <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-blue-900 rounded transition-colors cursor-pointer"
                      >
                          {showNewPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                      </button>
                  </div>

                  {errors.new_password && (
                      <p className="text-red-600 text-sm mt-0.5">
                          {errors.new_password?.message}
                      </p>
                  )}

                  {/* Password Strength Indicator Wrapper */}
                  <div className="mt-1">
                      <PasswordStrength password={password} outside={false} />
                  </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-0.5">
                  <label className="font-normal text-[14.9px] text-slate-700 flex items-center gap-0.5">
                      Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                      <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter new password"
                          {...register("confirm_password")}
                          className={`w-full border rounded-lg py-2 pl-10 pr-10 text-sm outline-none transition-all duration-150 placeholder:text-slate-400 text-slate-900
                              ${errors.confirm_password
                                  ? "border-red-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                                  : "border-slate-300 focus:border-blue-800 focus:ring-2 focus:ring-indigo-200"
                              }`}
                      />

                      <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-blue-900 rounded transition-colors cursor-pointer"
                      >
                          {showConfirmPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                      </button>
                  </div>

                  {errors.confirm_password && (
                      <p className="text-red-600 text-sm mt-0.5">
                          {errors.confirm_password.message}
                      </p>
                  )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                  <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-950 hover:bg-blue-900 disabled:bg-slate-400 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                      {isSubmitting ? (
                          <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                              <span>Updating...</span>
                          </>
                      ) : (
                          "Update Password"
                      )}
                  </button>
              </div>

          </form>
    </div>

    );
};

export default ForceChangePasswordPage;