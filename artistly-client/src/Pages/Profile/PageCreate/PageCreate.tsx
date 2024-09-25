import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { defaultValues, schema } from "./PageCreate.logic";
import { yupResolver } from "@hookform/resolvers/yup";
import Textbox from "../components/Textbox/Textbox";
import Textareabox from "./components/TextareaBox";
import { CiCirclePlus } from "react-icons/ci";
import { musicGenres } from "../../../data/data";
import { CiImageOn } from "react-icons/ci";
import { FaImagePortrait } from "react-icons/fa6";
import SocialTextBox from "./components/SocialTextBox";
import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import MediaSlots from "./components/MediaSlots";
import { PageCreateInputs } from "./components/Inputs";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { requestPage } from "../../../services/usersService";
import { PostPage } from "../../../utils/types";
import Swal from "sweetalert2";
import { useState } from "react";
import FieldLength from "./components/FieldLength";
import CategorySubcategory from "./components/CategorySubcategory";
import { ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../../utils/firebase";

const PageCreate = () => {
  const [success, setSuccess] = useState(false);
  const { currentUser } = getAuth();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PageCreateInputs>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { fields: priceFields, append } = useFieldArray({
    name: "prices",
    control,
    rules: {
      minLength: 1,
      maxLength: 5,
    },
  });
  const { fields: mediaFields } = useFieldArray({
    name: "mediaSlots",
    control,
  });
  const currencies = [
    { currencyId: "RON", currencyName: "RON" },
    { currencyId: "EUR", currencyName: "EUR" },
  ];

  const onSubmit: SubmitHandler<PageCreateInputs> = async (data) => {
    if (!currentUser) {
      await Swal.fire({
        title: "Oops...",
        text: "Se pare ca a aparut o eroare legata de autentificare",
        icon: "error",
      });
      return;
    }

    if (!currentUser.emailVerified) {
      await Swal.fire({
        title: "Oops...",
        text: "Se pare ca nu ai emailul verificat.",
        icon: "error",
      });
      return;
    }

    try {
      const idToken = await currentUser.getIdToken();

      if (!idToken) {
        await Swal.fire({
          title: "Oops...",
          text: "Se pare ca nu am putut obtine token-ul de autentificare.",
          icon: "error",
        });
        return;
      }

      const youtubeLinks = data.mediaSlots
        .filter((slot) => slot.youtubeLink != null)
        .map((slot) => slot.youtubeLink) as string[];

      const page: PostPage = {
        category: data.category,
        subcategory: data.subcategory,
        handler: data.handler,
        genre: data.musicGenre,
        name: data.fullName,
        description: data.description,
        facebook: data.facebook,
        instagram: data.instagram,
        tiktok: data.tiktok,
        youtube: data.youtube,
        location: "Arges",
        eventDetails: data.eventDetails,
        contactType: data.ContactType,
        contactName: data.ContactName,
        contactNumber: data.ContactPhone,
        contactEmail: data.ContactEmail,
        youtubeLinks: youtubeLinks,
        prices: data.prices,
      };

      await requestPage(page, idToken, currentUser.uid);

      const profilePictureRef = ref(
        imageDb,
        `files/${data.handler}/profile-picture.jpeg`
      );
      const coverPictureRef = ref(
        imageDb,
        `files/${data.handler}/cover-picture.jpeg`
      );

      if (data.profilePicture) {
        await uploadBytes(profilePictureRef, data.profilePicture);
      }

      if (data.coverPicture) {
        await uploadBytes(coverPictureRef, data.coverPicture);
      }

      data.mediaSlots.map(async (p) => {
        if (p.image != null) {
          const imgRef = ref(
            imageDb,
            `files/${data.handler}/media/${p.image[0].name}`
          );
          await uploadBytes(imgRef, p.image[0]);
        }
      });

      await Swal.fire({
        title: "Felicitări!",
        text: "Profilul a fost creat și urmează să fie revizuit de un operator pentru verificare. În acest interval, profilul nu va fi public.",
        icon: "success",
      });
      setSuccess(true);
    } catch (error) {
      await Swal.fire({
        title: "Oops...",
        text: "Se pare ca a aparut o eroare la trimiterea paginii.",
        icon: "error",
      });
    }
  };

  if (success) {
    return (
      <div className="bg-[#EEEEEE] px-4 xl:px-32 py-10 xl:py-24 rounded-xl shadow-xl max-w-[90vmin] mx-auto md:max-w-none my-6 xl:my-0">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-xl">Felicitări</span>
          <p className="text-base">
            Profilul a fost creat și urmează să fie revizuit de un operator
            pentru verificare. În acest interval, profilul nu va fi public.
          </p>
          <Link
            to="/"
            className="bg-white shadow-md mt-6 hover:bg-[#354F52] hover:text-white transition-colors cursor-pointer px-6 py-2 rounded-[6.625rem] text-lg w-min whitespace-nowrap"
          >
            Acasa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#EEEEEE] px-2 xl:px-20 py-10 rounded-xl shadow-xl max-w-[90vmin] mx-auto md:max-w-none">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[400px] md:max-w-none mx-auto"
        >
          <div className="text-start text-[#424242] text-xl leading-10">
            Profil
          </div>
          <div className="relative mb-24">
            {/* CoverPicture */}
            <Controller
              name="coverPicture"
              control={control}
              render={({ field }) => (
                <>
                  <label htmlFor="coverPicture">
                    {field.value ? (
                      <div
                        className="w-full h-[160px] rounded-[10px] bg-center bg-cover relative cursor-pointer"
                        style={{
                          backgroundImage: `url(${URL.createObjectURL(
                            field.value
                          )})`,
                        }}
                      ></div>
                    ) : (
                      <div className="w-full h-[160px] rounded-[10px] bg-[#D9D9D9] relative cursor-pointer">
                        <div className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
                          <div className="flex flex-col items-center">
                            <CiImageOn size={50} />
                            <p className="text-red-600">
                              {errors.coverPicture?.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    id="coverPicture"
                    onChange={(e) => field.onChange(e.target.files![0])}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </>
              )}
            />
            {/* CoverPicture */}
            {/* ProfilePicture */}
            <Controller
              name="profilePicture"
              control={control}
              render={({ field }) => (
                <>
                  <label htmlFor="profilePicture">
                    {field.value ? (
                      <div className="absolute">
                        <div
                          className="aspect-square w-[148px] rounded-[30px] relative border-[#EEEEEE] border-[8px] cursor-pointer -translate-y-[50%] -top-[50%] left-5 md:left-14"
                          style={{
                            backgroundImage: `url(${URL.createObjectURL(
                              field.value
                            )})`,
                          }}
                        />
                      </div>
                    ) : (
                      <div className="absolute">
                        <div className="aspect-square w-[148px] rounded-[30px] bg-[#D9D9D9] relative border-[#EEEEEE] border-[8px] cursor-pointer -translate-y-[50%] -top-[50%] left-5 md:left-14">
                          <div className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
                            <div className="flex flex-col items-center">
                              <FaImagePortrait size={30} />
                              <p className="text-red-600 text-sm whitespace-nowrap">
                                {errors.profilePicture?.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    id="profilePicture"
                    onChange={(e) => field.onChange(e.target.files![0])}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </>
              )}
            />
            {/* ProfilePicture */}
          </div>
          <div className="text-start text-[#424242] text-xl leading-10 mb-5">
            Categorie
          </div>
          <CategorySubcategory
            control={control}
            getValues={getValues}
            errors={errors}
          />
          <div className="flex flex-col justify-center items-center md:grid grid-cols-2 place-content-center gap-x-12 my-5">
            <Controller
              name="musicGenre"
              control={control}
              render={({ field }) => (
                <Dropdown
                  field={field}
                  items={musicGenres}
                  header="Selecteaza un gen muzical"
                  getItemLabel={(genre) => genre.genreName}
                  getItemValue={(genre) => genre.genreId}
                />
              )}
            ></Controller>
            <div className="col-span-1"></div>
          </div>
          <Textbox required field="Nume" register={register("fullName")} />
          <p className="text-red-600">{errors.fullName?.message}</p>
          <Textbox
            required
            field="Link"
            placeholder="@NumeleTau"
            register={register("handler")}
          />
          <p className="text-red-600">{errors.handler?.message}</p>

          <Textareabox
            maxLength={300}
            field={"Descriere"}
            register={register("description")}
            required
          />

          <div className="inline-flex w-full">
            <p className="ps-5 font-thin text-sm">Maxim 300 de caractere</p>
            <FieldLength control={control} name="description" maxLength="300" />
          </div>
          <p className="text-red-600">{errors.description?.message}</p>
          <div className="text-start text-[#424242] text-xl leading-10 my-8">
            Social
          </div>
          <SocialTextBox
            icon={<FaFacebook color="#1877F2" size={22} />}
            field="Facebook"
            placeholder="facebook.com/linkulpaginii"
            register={register("facebook")}
          />
          {errors.facebook && (
            <p className="text-red-600">{errors.facebook.message}</p>
          )}
          <SocialTextBox
            icon={
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.44541 1.52739C-0.290898 3.31763 0.0644658 5.21936 0.0644658 10.9967C0.0644658 15.7945 -0.778832 20.6041 3.63467 21.7364C5.01286 22.0882 17.2241 22.0882 18.6005 21.7345C20.438 21.2639 21.9331 19.7844 22.1375 17.2046C22.1661 16.8445 22.1661 5.15539 22.1366 4.78802C21.9193 2.04007 20.2152 0.456357 17.9698 0.135594C17.4552 0.0615722 17.3521 0.0396397 14.7117 0.0350705C5.34613 0.0396397 3.29312 -0.374336 1.44541 1.52739Z"
                  fill="url(#paint0_linear_3554_5297)"
                />
                <path
                  d="M11.1096 2.90332C7.76683 2.90332 4.59249 2.60815 3.38002 5.69697C2.8792 6.97271 2.95193 8.62953 2.95193 11.0019C2.95193 13.0837 2.88472 15.0402 3.38002 16.3059C4.58973 19.3966 7.78984 19.1005 11.1078 19.1005C14.3088 19.1005 17.6093 19.4313 18.8365 16.3059C19.3382 15.0174 19.2646 13.3852 19.2646 11.0019C19.2646 7.83813 19.4404 5.79567 17.8947 4.26222C16.3296 2.70867 14.2131 2.90332 11.106 2.90332H11.1096ZM10.3787 4.36275C17.3515 4.35178 18.239 3.58232 17.7492 14.2717C17.5752 18.0523 14.6752 17.6374 11.1106 17.6374C4.6109 17.6374 4.42402 17.4528 4.42402 10.9982C4.42402 4.46875 4.93957 4.3664 10.3787 4.36092V4.36275ZM15.4642 5.70703C14.9238 5.70703 14.4856 6.14202 14.4856 6.67845C14.4856 7.21488 14.9238 7.64988 15.4642 7.64988C16.0046 7.64988 16.4429 7.21488 16.4429 6.67845C16.4429 6.14202 16.0046 5.70703 15.4642 5.70703ZM11.1096 6.84295C8.79609 6.84295 6.92077 8.70538 6.92077 11.0019C6.92077 13.2984 8.79609 15.1599 11.1096 15.1599C13.4232 15.1599 15.2976 13.2984 15.2976 11.0019C15.2976 8.70538 13.4232 6.84295 11.1096 6.84295ZM11.1096 8.30237C14.7047 8.30237 14.7093 13.7014 11.1096 13.7014C7.5155 13.7014 7.50997 8.30237 11.1096 8.30237Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_3554_5297"
                    x1="1.48778"
                    y1="20.5667"
                    x2="21.8928"
                    y2="2.77544"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFDD55" />
                    <stop offset="0.5" stopColor="#FF543E" />
                    <stop offset="1" stopColor="#C837AB" />
                  </linearGradient>
                </defs>
              </svg>
            }
            field="Instagram"
            placeholder="instagram.com/linkulpaginii"
            register={register("instagram")}
          />
          <p className="text-red-600">{errors.instagram?.message}</p>
          <SocialTextBox
            icon={<FaTiktok size={22} />}
            field="Tiktok"
            placeholder="tiktok.com/linkulpaginii"
            register={register("tiktok")}
          />
          <p className="text-red-600">{errors.tiktok?.message}</p>

          <SocialTextBox
            icon={<FaYoutube color="#F61C0D" size={22} />}
            field="Youtube"
            placeholder="youtube.com/linkulpaginii"
            register={register("youtube")}
          />
          <p className="text-red-600">{errors.youtube?.message}</p>

          <div className="text-start text-[#424242] text-sm mt-12 mb-6">
            <p className="font-medium text-xl">Media</p>
            <p>Puteti adauga maxim 6 fisiere media</p>
            <p>
              Fisierele media trebuie sa fie in format jpeg sau jpg si sa nu
              depaseasca 2MB.
            </p>
            <p>Puteti adauga videoclipuri existente pe youtube.</p>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-between relative mb-6">
            <MediaSlots
              setValue={setValue}
              control={control}
              register={register}
              mediaFields={mediaFields}
            />
          </div>
          <div className="mb-6">
            <Textareabox
              maxLength={1000}
              register={register("eventDetails")}
              field={"Detalii evenimente"}
            />
            <div className="inline-flex w-full mb-6">
              <p className="ps-5 font-thin text-sm">Maxim 1000 de caractere</p>
              <FieldLength
                control={control}
                maxLength="1000"
                name="eventDetails"
              />
            </div>
            <p className="text-red-600">{errors.eventDetails?.message}</p>
          </div>
          <div className="text-start text-[#424242] text-xl leading-10 font-medium">
            Tarife
          </div>
          {priceFields.map((field, index) => (
            <fieldset
              key={field.id}
              className="text-black w-full my-2 border-[3px] border-[#354F52] rounded-[0.625rem] pb-2 focus-within:border-[#354F52] px-5"
            >
              <legend className="ms-5 px-2 inline-flex text-lg font-medium text-[#424242]">
                Varianta {index + 1}
              </legend>
              <Textbox
                maxLength={30}
                register={register(`prices.${index}.title` as const)}
                field="Titlu"
              />

              <div className="inline-flex w-full">
                <p className="ps-5 font-thin text-sm">Maxim 30 de caractere</p>
                <FieldLength
                  control={control}
                  maxLength="30"
                  name={`prices.${index}.title`}
                />
              </div>
              {
                <p className="text-red-600">
                  {errors.prices?.[index]?.title?.message}
                </p>
              }
              <Textareabox
                maxLength={1000}
                register={register(`prices.${index}.description` as const)}
                field="Descriere"
              />
              <div className="inline-flex w-full">
                <p className="ps-5 font-thin text-sm">
                  Maxim 1000 de caractere
                </p>
                <FieldLength
                  control={control}
                  maxLength="1000"
                  name={`prices.${index}.description`}
                />
              </div>
              <p className="text-red-600">
                {errors.prices?.[index]?.description?.message}
              </p>
              <div className="grid grid-cols-4">
                <div className="col-span-2 flex flex-row items-center">
                  <div className="flex flex-col items-center w-full">
                    <Textbox
                      register={register(`prices.${index}.ammount` as const)}
                      field="Pret"
                    />
                    <p className="text-red-600">
                      {errors.prices?.[index]?.ammount?.message}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 w-full">
                  <div className="flex flex-row items-center justify-start mt-4 ms-4">
                    <Controller
                      name={`prices.${index}.currency`}
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          header="Moneda"
                          field={field}
                          items={currencies}
                          getItemLabel={(item: any) => item.currencyName}
                          getItemValue={(item: any) => item.currencyId}
                        />
                      )}
                    ></Controller>
                    <p className="text-red-600">
                      {errors.prices?.[index]?.currency?.message}
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          ))}
          <div className="flex items-center justify-center">
            <div
              className="inline-flex items-center text-xl bg-white px-12 py-3 rounded-xl shadow-lg my-8
              hover:bg-[#354F52] hover:text-white cursor-pointer transition-colors
              "
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  ammount: 0,
                  currency: "",
                })
              }
            >
              <CiCirclePlus />
              Adauga varianta noua
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 place-content-center">
            <div className="col-span-1 md:col-span-2">
              <Textbox
                required
                field="Nume Prenume"
                placeholder=""
                register={register("ContactName")}
              />
              <p className="text-red-600">{errors.ContactName?.message}</p>
            </div>
            <div className="col-span-1 flex flex-col justify-evenly md:w-[200px] mt-3 ms-3">
              <Controller
                name="ContactType"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    header="Statut"
                    field={field}
                    items={["Prestator", "Impresar"]}
                    getItemLabel={(item: any) => item}
                    getItemValue={(item: any) => item}
                  />
                )}
              ></Controller>
              <p className="text-red-600">{errors.ContactType?.message}</p>
            </div>
          </div>
          <Textbox
            required
            field="Telefon"
            placeholder=""
            register={register("ContactPhone")}
          />
          <p className="text-red-600">{errors.ContactPhone?.message}</p>
          <Textbox
            field="Email"
            placeholder=""
            register={register("ContactEmail")}
          />
          <p className="text-red-600">{errors.ContactEmail?.message}</p>
          <div>
            <input {...register("tos")} type="checkbox" id="tos" />
            <label htmlFor="tos" className="ms-2 cursor-pointer">
              Bifând această căsuță, sunt de acord să-mi public datele în
              profilul meu public conform{" "}
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
              confidențialitate sunt disponibile în{" "}
              <a href="" className="text-[#07C]">
                Politica de Confidențialitate.
              </a>
            </label>
            <p className="text-red-600">{errors.gdpr?.message}</p>
          </div>
          <div className="xl:grid grid-cols-3 mt-6 xl:mt-0">
            <div className="col-span-1"></div>
            <div className="col-span-2">
              <div className="flex flex-row items-center justify-evenly  w-full xl:justify-end">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="bg-white shadow-md hover:bg-[#354F52] hover:text-white transition-colors cursor-pointer px-6 py-2 rounded-[6.625rem] text-lg w-min whitespace-nowrap xl:me-12"
                >
                  {isSubmitting ? "Se proceseaza..." : "Creeaza"}
                </button>
                <Link
                  to={"/profile/pages"}
                  className="bg-white shadow-md hover:bg-[#354F52] hover:text-white transition-colors cursor-pointer px-6 py-2 rounded-[6.625rem] text-lg w-min whitespace-nowrap xl:me-12"
                >
                  Renunta
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PageCreate;
