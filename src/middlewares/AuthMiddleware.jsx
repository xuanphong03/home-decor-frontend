import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthMiddleware() {
  const authRoutes = ["/login", "/register", "/forgot-password"];
  const location = useLocation();
  const { accessToken } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(accessToken);

  if (authRoutes.some((path) => path === location.pathname)) {
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  } else {
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  }
}
