import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

const RequireAuth = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (    
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
