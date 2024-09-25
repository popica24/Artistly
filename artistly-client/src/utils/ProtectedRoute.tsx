import { ReactNode } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const { dbUser } = useAuth();
  if (!dbUser) {
    toast.error("Trebuie sa fii autentificat pentru a face aceasta actiune !");
    return <Navigate to={"/login"} state={{ fromRedirect: true }} />;
  }
  return props.children;
};

export default ProtectedRoute;
