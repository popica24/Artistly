import { ReactNode } from "react";

import { Navigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    toast.error("Trebuie sa fii autentificat pentru a face aceasta actiune !");
    return <Navigate to={"/login"} state={{ fromRedirect: true }} />;
  }
  return props.children;
};

export default ProtectedRoute;
