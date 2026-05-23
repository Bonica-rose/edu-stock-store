import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoginForm from '../../auth/components/LoginForm';
import { loginUserThunk } from "../authThunk";
import { NAV_ROUTES } from "../../../constants/navRoutes";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async (data) => {
    try {
      const res = await dispatch(loginUserThunk(data)).unwrap();
      // console.log('Auth user: ',res.user);      
      toast.success("Login successful");
      navigate(NAV_ROUTES.DASHBOARD);
    } catch (err) {
      // console.log(err);      
      toast.error(err);
    }
  };

  return (
      <LoginForm
          onSubmit={handleLogin}
          loading={loading}
      />
  );
}

export default LoginPage