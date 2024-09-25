import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { IdTokenResult } from "firebase/auth";

const useUserRole = () => {
  const { currentUser } = useAuth();
  const [role, setRole] = useState<number | undefined>(0);

  const checkRoleCode = async (token: IdTokenResult) => {
    return token.claims["privilege"] as number;
  };

  useEffect(() => {
    const fetchRole = () => {
      if (currentUser != null) {
        currentUser.getIdTokenResult(false).then((idToken) => {
          checkRoleCode(idToken).then((code) => {
            setRole(code);
          });
        });
      }
    };

    fetchRole();
  }, [currentUser]);

  return { role };
};

export default useUserRole;
