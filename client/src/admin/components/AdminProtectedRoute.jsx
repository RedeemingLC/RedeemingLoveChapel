import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);

    // JWT exp is in seconds
    if (!decoded.exp) return false;

    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (err) {
    return false;
  }
}

export default function AdminProtectedRoute() {
  const token = localStorage.getItem("adminToken");

  // no token
  if (!token || token === "undefined") {
    return <Navigate to="/admin/login" replace />;
  }

  // invalid or expired token
  if (!isTokenValid(token)) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
