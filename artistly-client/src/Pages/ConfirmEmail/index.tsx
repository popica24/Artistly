import { useLocation } from "react-router-dom";
import EmailConfirmed from "./EmailConfirmed";
import NotFound from "../NotFound/NotFound";
import ResetPassword from "./ResetPassword";

const UserMgmt = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");
  console.log(mode);

  if (mode === "verifyEmail") {
    return <EmailConfirmed oobCode={oobCode} />;
  }
  if (mode === "resetPassword") {
    return <ResetPassword oobCode={oobCode} />;
  }
  return <NotFound />;
};

export default UserMgmt;
