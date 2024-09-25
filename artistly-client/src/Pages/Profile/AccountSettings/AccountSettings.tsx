import { SubmitHandler, useForm } from "react-hook-form";
import Textbox from "../components/Textbox/Textbox";
import { useAuth } from "../../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

type Inputs = {
  firstName?: string;
  lastName?: string;
};
const AccountSettings = () => {
  const { dbUser, currentUser } = useAuth();
  if (
    !currentUser ||
    !currentUser.email ||
    !dbUser ||
    !dbUser.firstName ||
    !dbUser.lastName
  )
    return <></>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isLoading, isSubmitting },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const idToken = await currentUser.getIdToken();
    await axios.put(
      "http://localhost:5025/api/user",
      {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
  };

  return (
    <div className="bg-[#EEEEEE] w-full rounded-xl shadow-md p-12 max-w-[90vmin] mx-auto md:max-w-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:grid grid-cols-2 gap-x-20">
          <Textbox
            field={"Nume"}
            placeholder={""}
            defaultValue={isLoading ? "..." : dbUser.firstName}
            register={register("firstName")}
          />
          <Textbox
            field={"Prenume"}
            placeholder={""}
            defaultValue={isLoading ? "..." : dbUser.lastName}
            register={register("lastName")}
          />
        </div>
        <div className="flex md:grid grid-cols-2 gap-x-20 place-content-center md:my-12">
          <div className="col-span-1">
            <Textbox
              field={"Email"}
              disabled
              defaultValue={currentUser.email}
            />
          </div>
        </div>
        <div className="flex flex-col md:grid grid-cols-2 gap-x-20 my-6 md:my-0">
          <div className="col-span-1 md:mb-24">
            <Link
              to="/two-factor"
              className="bg-white shadow-md px-3 md:px-6 py-2.5 rounded-[6.625rem] text-sm md:text-lg whitespace-nowrap"
            >
              Activeaza Two-Factor authentication
            </Link>
          </div>
          <div className="col-span-1 mt-8 md:mt-0">
            <span className="bg-white shadow-md px-6 py-2 rounded-[6.625rem] text-sm md:text-lg w-full md:w-min whitespace-nowrap ">
              Schimba parola
            </span>
          </div>
        </div>
        <div className="bg-white w-full rounded-lg border border-black/30 drop-shadow-default text-xs md:text-base">
          <div className="flex flex-row items-center justify-between py-2 px-3 md:px-4">
            <p>Primiți buletine informative, promoții și știri</p>
            <svg
              width="44"
              height="23"
              viewBox="0 0 44 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.6207 0H11.3793C5.104 0 0 5.104 0 11.3793C0 17.6546 5.104 22.7586 11.3793 22.7586H32.6207C38.896 22.7586 44 17.6546 44 11.3793C44 5.104 38.896 0 32.6207 0Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <p className="mt-4 text-sm">
          Artistly va prelucra datele tale pentru a-ți trimite informații despre
          produsele și serviciile noastre, promoții, sondaje, tombole, pe baza
          interesului nostru legitim, și actualizări de la creatorii pe care îi
          urmărești, dacă ai consimțit la acest lucru. Datele tale nu vor fi
          divulgate terților. Acestea vor fi comunicate în afara UE în
          conformitate cu{" "}
          <a href="" className="font-bold underline">
            termenii politicii de confidențialitate
          </a>
          . Poți renunța la notificările noastre folosind primul cursor.{" "}
          <a href="" className="font-bold underline">
            Mai multe informații
          </a>
        </p>
        <div
          className={`flex flex-col-reverse md:flex-row items-center justify-end mt-24 ${
            isDirty ? "visible" : "invisible"
          }`}
        >
          <span
            onClick={() =>
              reset({
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
              })
            }
            className="bg-white shadow-md px-6 py-2 rounded-[6.625rem] text-lg w-min whitespace-nowrap md:me-12"
          >
            Renunță
          </span>

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-white shadow-md px-6 py-2 rounded-[6.625rem] text-lg w-min whitespace-nowrap mb-6 md:mb-0"
          >
            {isSubmitting ? "Se proceseaza..." : "Salveaza modificările"}
          </button>
        </div>
      </form>
      <div className="flex flex-row items-center justify-center mt-12">
        <span className="text-center w-full text-[#EE0000]">Ieși din cont</span>
      </div>
    </div>
  );
};

export default AccountSettings;
