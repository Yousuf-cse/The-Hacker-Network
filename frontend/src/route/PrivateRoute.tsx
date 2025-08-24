import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { JSX } from "react";

type PrivateRouteProps = {
  element: JSX.Element;
};

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const token = Cookies.get("token");

  return token ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
