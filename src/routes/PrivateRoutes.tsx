import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }: { children: ReactNode }) {
  const auth_token = localStorage.getItem("auth_token");

  return auth_token ? <>{children}</> : <Navigate to={"/login"} />;
}

export default PrivateRoutes;
