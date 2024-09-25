import { ReactNode } from "react";
import useUserRole from "../hooks/useRole";
import { Navigate } from "react-router";

type Props = {
  children: ReactNode;
};

const AuthorizedRoute = (props: Props) => {
  const { role } = useUserRole();

  if (role === 0) {
    return <></>;
  }

  if (role !== 333) {
    return <Navigate to={"/not-found"} replace />;
  }
  return props.children;
};

export default AuthorizedRoute;
