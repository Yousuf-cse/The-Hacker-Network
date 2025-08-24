import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { JSX } from "react";

type PublicRouteProps = {
  element: JSX.Element;
};

const PublicRoute = ({ element }: PublicRouteProps) => {
  const token = Cookies.get("token");

  return token ? <Navigate to="/home" replace /> : element;
};

export default PublicRoute;
