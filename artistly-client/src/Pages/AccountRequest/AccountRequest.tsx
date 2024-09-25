import "react-phone-number-input/style.css";
import BackButton from "../../components/BackButton";
import Textbox from "../Profile/components/Textbox/Textbox";
import Dropdown from "../../components/Dropdown/Dropdown";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../../data/data";
import { AccountRequestInputs, schema } from "./AccountRequest.Logic";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Contexts/AuthContext";
import { requestUser } from "../../services/usersService";
import { RequestUserModel } from "../../utils/types";
import useUserRole from "../../hooks/useRole";

const AccountRequest = () => {
  const { currentUser, dbUser } = useAuth();
  const { role } = useUserRole();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isLoading, isSubmitting, isSubmitSuccessful },
    getValues,
  } = useForm<AccountRequestInputs>({
    defaultValues: {
      firstName: dbUser?.firstName,
      lastName: dbUser?.lastName,
      email: currentUser?.email,
    },
    resolver: yupResolver(schema),
  });
  watch("category");

  const onSubmit: SubmitHandler<AccountRequestInputs> = async (data) => {
    if (!currentUser) return;
    const idToken = await currentUser.getIdToken();

    const request: RequestUserModel = {
      userId: currentUser.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      status: data.status,
      category: data.category,
      subcategory: data.subcategory,
    };

    await requestUser(request, idToken);
  };

  if (role == 333) {
    <div className="flex flex-col items-start justify-start tablet:justify-center tablet:items-center w-[60%] tablet:w-full mx-auto tablet:px-10 my-12">
      <div className="w-full me-auto">
        <BackButton />
      </div>
      <div className="bg-[#EEE] flex flex-col w-full items-center justify-center px-[4rem] tablet:px-5 py-[6rem] my-4 drop-shadow-default">
        <img src="/succes.gif" alt="" width={100} height={100} />
        <span className="text-lg font-medium pb-4">
          Te-ai conectat cu succes
        </span>
        <span className="text-sm">Detii deja un cont de partener</span>
      </div>
    </div>;
  }

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-start justify-start tablet:justify-center tablet:items-center w-[60%] tablet:w-full mx-auto tablet:px-10 my-12">
        <div className="w-full me-auto">
          <BackButton />
        </div>
        <div className="bg-[#EEE] flex flex-col w-full items-center justify-center px-[4rem] tablet:px-5 py-[6rem] drop-shadow-default my-4">
          <img src="/succes.gif" alt="" width={100} height={100} />
          <span className="text-lg font-medium pb-4">Felicitări</span>
          <span className="text-sm">
            Vă mulțumim pentru cererea dvs. de cont partener. Datele dvs. au
            fost primite cu succes. Vă informăm că procesul de analiză poate
            dura până la 48 de ore. Vă vom notifica imediat ce acesta este
            finalizat.
          </span>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="my-4 w-[90vmin] mx-auto md:w-9/12">
        <BackButton />
      </div>

      <div className="bg-[#EEEEEE] lg:w-9/12 rounded-xl shadow-md p-12 w-[90vmin] mx-auto md:max-w-none">
        <h1 className="text-center">Creează cont beneficiar</h1>
        <h2>
          Pentru a creea un cont de partener trebuie sa ai unul din rolurile de{" "}
          <b>prestator</b> sau <b>impresar exclusiv</b>. Dupa trimiterea
          formularului vei primii un email cu datele de conectare.
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Textbox
              register={register("lastName")}
              field="Nume"
              defaultValue={isLoading ? "..." : dbUser?.lastName}
            />
            <p className="text-red-600">{errors.lastName?.message}</p>
          </div>
          <div className="mb-6">
            <Textbox
              register={register("firstName")}
              field="Prenume"
              defaultValue={isLoading ? "..." : dbUser?.firstName}
            />
            <p className="text-red-600">{errors.firstName?.message}</p>
          </div>
          <div className="mb-6">
            <Textbox
              register={register("email")}
              field="Email"
              defaultValue={isLoading ? "..." : currentUser?.email}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <Textbox register={register("phoneNumber")} field="Telefon" />
            <p className="text-red-600">{errors.phoneNumber?.message}</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-between my-6">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <div className="max-w-sm lg:max-w-none w-full lg:pe-6 mb-6 lg:mb-0">
                  <Dropdown
                    items={categories}
                    field={field}
                    getItemLabel={(item) => item.categoryName}
                    getItemValue={(item) => item.categoryId}
                    header="Selecteaza categoria"
                  />
                  <p className="text-red-600">{errors.category?.message}</p>
                </div>
              )}
            />
            <Controller
              name="subcategory"
              control={control}
              render={({ field }) => (
                <div className="max-w-sm lg:max-w-none w-full">
                  <Dropdown
                    items={
                      categories.find(
                        (category) =>
                          category.categoryId === getValues("category")
                      )?.subcategories
                    }
                    field={field}
                    getItemLabel={(item) => item?.subcategoryName}
                    getItemValue={(item) => item?.subcategoryId}
                    header="Selecteaza subcategoria"
                  />
                  <p className="text-red-600">{errors.subcategory?.message}</p>
                </div>
              )}
            />
          </div>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div className="lg:max-w-[200px] me-auto mb-6">
                <Dropdown
                  items={["Impresar", "Prestator"]}
                  field={field}
                  getItemLabel={(item) => item}
                  getItemValue={(item) => item}
                  header="Statut"
                />
                <p className="text-red-600 whitespace-nowrap">
                  {errors.status?.message}
                </p>
              </div>
            )}
          />

          <div className="mb-6">
            <input {...register("tos")} type="checkbox" id="tos" />
            <label htmlFor="tos" className="ms-2 cursor-pointer">
              Bifând această căsuță, sunt de acord să-mi public datele în
              profilul meu public conform
              <a href="" className="text-[#07C]">
                Termeni si conditii.
              </a>
            </label>
            <p className="text-red-600">{errors.tos?.message}</p>
          </div>
          <div>
            <input {...register("gdpr")} type="checkbox" id="gdpr" />
            <label htmlFor="gdpr" className="ms-2 cursor-pointer">
              Detalii complete despre gestionarea datelor personale și
              confidențialitate sunt disponibile în
              <a href="" className="text-[#07C]">
                Politica de Confidențialitate.
              </a>
            </label>
            <p className="text-red-600">{errors.gdpr?.message}</p>
          </div>
          <div className="my-12 flex">
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-white border-2 border-[#354F52] rounded-xl px-12 lg:px-24 py-1 mx-auto text-lg hover:bg-[#354F52] hover:text-white transition-colors"
            >
              {isSubmitting ? "Se proceseaza..." : "Continua"}
            </button>
          </div>
        </form>
        <span className="text-lg">
          <b>Ai Întrebări? </b> Verifică secțiunea noastră{" "}
          <a href="/faq" className="text-[#07C]">
            <b>FAQ</b>
          </a>{" "}
          pentru răspunsuri rapide la cele mai frecvente întrebări. Dacă nu
          găsești ceea ce cauți, nu ezita să ne contactezi pentru asistență
          personalizată!
        </span>
      </div>
    </>
  );
};

export default AccountRequest;
