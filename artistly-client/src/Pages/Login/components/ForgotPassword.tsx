import { useState } from "react";
import Submit from "./Submit";
import { toast } from "react-toastify";
import Success from "./Success";
import { sendPasswordReset } from "../../../services/usersService";
import InputBox from "../../../components/InputBox/InputBox";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSuccess(true);
      setLoading(false);
      toast.success("Verificati emailul si urmati pasii");
    } catch (ex: any) {
      setSuccess(false);
      setLoading(false);
      toast.error("A aparut o eroare, incercati mai tarziu!");
    }
  };
  return (
    <form
      className="max-w-[20rem] mx-auto"
      onSubmit={(e) => handlePasswordReset(e)}
    >
      <InputBox
        type="email"
        text="Email"
        onChange={(e) => setEmail(e.target.value)}
        isRequired={true}
        height="h-[1rem]"
        value={email}
      />
      {!loading && !success && <Submit loading={loading} />}
      {success && <Success />}
    </form>
  );
};

export default ForgotPassword;
