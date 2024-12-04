import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  //check if token exists in localstorage
  const token = localStorage.getItem("access_token");

  if (!token) {
    // If no token found, redirect to login page
    return <Navigate to="/login" />;
  }
  // token exists render the child route
  return <Outlet />;
};

export default PrivateRoute;
