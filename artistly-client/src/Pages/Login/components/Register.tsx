import { useState } from "react";
import InputBox from "./InputBox";
import Success from "./Success";
import ContinueWithGoogle from "./ContinueWithGoogle";
import Submit from "./Submit";
import Loader from "../../../components/Loader/Loader";
import Checkbox from "../../../components/Checkbox/Checkbox";
import { toast } from "react-toastify";
import { createUser } from "../../../services/usersService";
import { signInWithGoogle, signup } from "../../../Contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import PasswordBox from "./PasswordBox";
type Props = {
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handlesuccess: (message: string) => void;
  handleError: (message: string) => void;
};

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
};

const Register = (props: Props) => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({});

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
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (password !== passwordAgain) {
      toast.error("Parolele nu se potrivesc");
      return;
    }
    props.setLoading(true);

    try {
      await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: password,
        confirmPassword: passwordAgain,
      });

      props.handlesuccess(
        "Contul tău a fost creat cu success. Bine ai venit în comunitate!"
      );
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        props.handleError("Emailul exista deja, te rugam sa te loghezi !");
      } else if (error.code === "auth/invalid-email") {
        props.handleError("Emailul este invalid !");
      } else {
        toast.error("Eroare nedefinita " + error);
      }
    }
  };
  return (
    <form className="mx-auto register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4 relative">
        <InputBox
          text={"Nume"}
          isRequired={true}
          height={"h-[1rem]"}
          register={{
            ...register("firstName", {
              required: "Numele este obligatoriu",
            }),
          }}
          type="text"
        />
        {errors.firstName && (
          <div className="absolute py-0.5 px-1.5 text-red-600 fade-in rounded-[10px] top-13 right-0 z-20 whitespace-nowrap">
            {errors.firstName.message}
          </div>
        )}
      </div>
      <div className="my-4 relative">
        <InputBox
          text={"Prenume"}
          isRequired={true}
          height={"h-[1rem]"}
          register={{
            ...register("lastName", {
              required: "Prenumele este obligatoriu",
            }),
          }}
          type="text"
        />
        {errors.lastName && (
          <div className="absolute py-0.5 px-1.5 text-red-600 fade-in rounded-[10px] top-13 right-0 z-20 whitespace-nowrap">
            {errors.lastName.message}
          </div>
        )}
      </div>
      <div className="my-4 relative">
        <InputBox
          text={"Email"}
          isRequired={true}
          height={"h-[1rem]"}
          register={{
            ...register("email", {
              required: "Email-ul este obligatoriu",
            }),
          }}
          type="email"
        />
        {errors.email && (
          <div className="absolute py-0.5 px-1.5 text-red-600 fade-in rounded-[10px] top-13 right-0 z-20 whitespace-nowrap">
            {errors.email.message}
          </div>
        )}
      </div>
      <div className="my-4 relative">
        <PasswordBox
          text={"Parola"}
          isRequired={true}
          height={"h-[1rem]"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="my-4 relative">
        <PasswordBox
          text={"Confirma parola"}
          isRequired={true}
          height={"h-[1rem]"}
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
      </div>

      <div className="mb-4 flex flex-row items-start text-start ms-1">
        <Checkbox classes="mt-1 me-1" id={1} />
        <p className="text-[0.9rem] ms-2">
          Sunt de acord cu{" "}
          <a
            href="/docs/Termeni_si_conditii_ARTISTLY.pdf"
            target="_blank"
            className="text-[#07C] font-medium"
          >
            Termenii si conditiile
          </a>{" "}
          de utilizare a site-ului artistly.ro
        </p>
      </div>
      <div className="mb-4">
        {props.loading && !props.success && (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!props.loading && !props.success && <Submit loading={props.loading} />}
        <div className="flex flex-row tablet:flex-col items-center justify-center my-8">
          <ContinueWithGoogle
            handleLoginWithGoogle={handleRegisterWithGoogle}
          />
        </div>
        {props.success && <Success />}
      </div>
    </form>
  );
};

export default Register;
