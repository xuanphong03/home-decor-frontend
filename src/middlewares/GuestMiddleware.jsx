import { AppContext } from "@/App";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestMiddleware() {
  const { accessToken } = useSelector((state) => state.auth);
  const { profile } = useContext(AppContext);
  const isAuthenticated = Boolean(accessToken);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (profile && !profile.isAdmin) {
    return <Navigate to="/forbidden" />;
  }
  return <Outlet />;
}
