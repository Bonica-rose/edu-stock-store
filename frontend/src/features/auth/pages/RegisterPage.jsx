import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RegisterForm from '../../auth/components/RegisterForm'
import { registerUserThunk } from "../authThunk";
import { NAV_ROUTES } from "../../../constants/navRoutes";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const formRef = useRef(null);

  const handleRegister = async (data) => {
    try {
        await dispatch(registerUserThunk(data)).unwrap();
        toast.success("Registration successful");
        formRef.current?.resetForm();
        navigate(NAV_ROUTES.LOGIN);
    } catch (error) {
        toast.error(error);
    }    
  };

  return (
    <RegisterForm
        ref={formRef}
        onSubmit={handleRegister}
        loading={loading}
      />
  );
}

export default RegisterPage