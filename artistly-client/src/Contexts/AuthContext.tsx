import { FC, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import {
  User as FirebaseUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { createUser, getUser } from "../services/usersService";
import LoadingScreen from "../Pages/LoadingScreen/LoadingScreen";
import { SignIn, SignUp, User } from "../utils/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextProps = {
  currentUser: FirebaseUser | null;
  dbUser: User | null;
};

export async function signup({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}: SignUp) {
  if (!firstName || !lastName || !email || !password) return;
  if (password !== confirmPassword) return;
  const firebaseUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const idToken = await firebaseUser.user.getIdToken(false);
  await createUser(
    {
      firstName,
      lastName,
    },
    idToken
  );
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function signInWithFacebook() {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider);
}

export function logout() {
  auth.signOut().then(() => (window.location.href = "/"));
}

export async function login({ email, password }: SignIn) {
  if (email && password)
    await signInWithEmailAndPassword(auth, email, password);
}

export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  const { currentUser, dbUser } = authContext || {};

  return { currentUser, dbUser };
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const onAuthStateChanged = (
    user: FirebaseUser | null,
    dbUser: User | null
  ) => {
    setCurrentUser(user);
    setDbUser(dbUser);
    setLoading(false);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken(true);
        if (idToken) {
          const _dbUser = await getUser(idToken);
          if (_dbUser) {
            onAuthStateChanged(user, _dbUser);
          }
        }
      } else {
        onAuthStateChanged(null, null);
      }
    });
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 1500);
    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);
  if (
    loading ||
    showLoading ||
    (currentUser && currentUser?.uid === undefined)
  ) {
    return <LoadingScreen />;
  }
  return (
    <AuthContext.Provider value={{ currentUser, dbUser }}>
      {children}
    </AuthContext.Provider>
  );
};
