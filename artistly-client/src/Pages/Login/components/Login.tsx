import PasswordBox from "./PasswordBox";
import Loader from "../../../components/Loader/Loader";
import ContinueWithGoogle from "./ContinueWithGoogle";
import { FormEvent, useState } from "react";
import { signInWithGoogle } from "../../../Contexts/AuthContext";
import { createUser, getUser } from "../../../services/usersService";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import Submit from "./Submit";
import Success from "./Success";
import ForgotPassword from "./ForgotPassword";
import InputBox from "../../../components/InputBox/InputBox";

type Props = {
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handlesuccess: (message: string) => void;
  handleError: (message: string) => void;
};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [passwordForgot, setPasswordForgot] = useState(false);

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    props.setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, pwd);
      props.handlesuccess("Autentificare reușită! Bine ai revenit!");
    } catch (error) {
      console.log(error);

      handleLoginError(error);
    }
  };
  const handleLoginWithGoogle = async () => {
    props.setLoading(true);
    try {
      const response = await signInWithGoogle();
      const idToken = await response.user.getIdToken(false);

      try {
        await getUser(idToken);

        props.handlesuccess("Autentificare reușită! Bine ai revenit!");
      } catch (error: any) {
        if (error.response?.status === 404) {
          await handleRegisterWithGoogle();

          props.handlesuccess("Autentificare reușită! Bine ai revenit!");
        } else {
          props.handleError("Eroare la crearea contului !");
        }
      }
    } catch (error) {
      props.handleError("Eroare la crearea contului !");
      console.log(error);
    }
  };
  const handleRegisterWithGoogle = async () => {
    props.setLoading(true);

    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();

      if (result && result.user && result.user.displayName) {
        await createUser(
          {
            firstName:
              result.user.displayName?.split(" ")[0] || result.user.displayName,
            lastName:
              result.user.displayName?.split(" ")[1] || result.user.displayName,
          },
          idToken
        );

        props.handlesuccess(
          "Contul tău a fost creat cu success. Bine ai venit în comunitate!"
        );
      }
    } catch (error: any) {
      props.handleError("Eroare la crearea contului !");
    }
  };
  const handleLoginError = (error: any) => {
    props.setLoading(false);
    console.log(error.code);
    switch (error.code) {
      case "auth/invalid-credential":
        props.handleError(
          "Date de conectare invalide. Vă rugăm să verificați adresa de email și parola"
        );
        break;

      case "auth/invalid-login-credentials":
        props.handleError(
          "Autentificare eșuată. Vă rugăm să verificați adresa de email și parola"
        );
        break;

      case "auth/missing-password":
        props.handleError(
          "Autentificare eșuată. Vă rugăm sa introduceti parola"
        );
        break;

      default:
        props.handleError("Eroare necunoscuta " + error.message);
    }
  };

  if (passwordForgot) {
    return <ForgotPassword />;
  }
  return (
    <>
      <form
        className="mx-auto register-form"
        onSubmit={(e) => handleLoginSubmit(e)}
      >
        <InputBox
          type="email"
          text="Email"
          onChange={(e) => setEmail(e.target.value)}
          isRequired={true}
          height="h-[1rem]"
          value={email}
        />
        <div className="my-4">
          <PasswordBox
            text="Parola"
            onChange={(e) => setPwd(e.target.value)}
            isRequired={true}
            height="h-[1rem]"
            value={pwd}
          />
        </div>

        <div className="mb-4">
          {props.loading && !props.success && (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          )}
          {!props.loading && !props.success && (
            <Submit loading={props.loading} />
          )}
          {props.success && <Success />}
        </div>
      </form>
      <div className="text-[0.85rem] text-center items-center my-8 font-medium">
        Ti-ai uitat parola?{" "}
        <button
          className="text-[#07C] font-medium"
          onClick={() => setPasswordForgot(true)}
        >
          Reseteaza
        </button>
        <div className="flex flex-col items-center my-4">
          <ContinueWithGoogle handleLoginWithGoogle={handleLoginWithGoogle} />
        </div>
      </div>
    </>
  );
};

export default Login;
