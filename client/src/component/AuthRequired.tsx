import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const AuthRequire = () => {
  const getAuth = useAppSelector((state) => state.userAuth);
  const location = useLocation();

  return getAuth?.name ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRequire;
