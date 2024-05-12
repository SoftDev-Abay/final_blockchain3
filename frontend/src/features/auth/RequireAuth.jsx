import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectCurrentToken } from "./authSlice";

export default function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  console.log(token);

  if (!token) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
