import * as yup from "yup";
import { PageCreateInputs } from "./components/Inputs";

const defaultValues: PageCreateInputs = {
  category: "",
  subcategory: "",
  fullName: "",
  handler: "",
  description: "",
  prices: [
    {
      title: "",
      description: "",
      ammount: 0,
      currency: "",
    },
  ],
  mediaSlots: Array(6).fill({ image: null, youtubeLink: null }),
  ContactName: "",
  ContactPhone: "",
  ContactEmail: "",
  ContactType: "",
  musicGenre: undefined,
  facebook: undefined,
  instagram: undefined,
  tiktok: undefined,
  youtube: undefined,
  eventDetails: undefined,
  profilePicture: null,
  coverPicture: null,
  tos: false,
  gdpr: false,
};

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const schema: any = yup.object().shape({
  category: yup.string().required("Categoria este un camp obligatoriu !"),
  subcategory: yup.string().required("Subcategoria este un camp obligatoriu !"),

  // Ensure `musicGenre` is allowed to be undefined or a string
  musicGenre: yup.string().optional().nullable(),

  fullName: yup.string().required("Numele complet este un camp obligatoriu !"),
  handler: yup
    .string()
    .required("Handler-ul este un camp obligatoriu !")
    .matches(
      /^@[a-zA-Z]+$/,
      "Handler-ul trebuie sa inceapa cu '@' si sa contina doar litere"
    ),
  description: yup.string().required("Descrierea este un camp obligatoriu !"),

  prices: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Titlul este obligatoriu !"),
        description: yup.string().required("Descrierea este obligatorie !"),
        ammount: yup
          .number()
          .required("Suma este obligatorie !")
          .positive("Suma trebuie sa fie un numar pozitiv"),
        currency: yup.string().required("Tipul este obligatoriu !"),
      })
    )
    .min(1, "Trebuie sa existe cel putin un pret")
    .max(5, "Nu poti adauga mai mult de 5 preturi"),

  mediaSlots: yup.array().of(
    yup.object().shape({
      image: yup.mixed().nullable().optional(), // Allow `null` or no image
      youtubeLink: yup
        .string()
        .url("YouTube trebuie să fie un URL valid")
        .nullable()
        .optional(), // Allow `null` or no link
    })
  ),

  ContactName: yup.string().required("Numele contactului este obligatoriu !"),
  ContactPhone: yup
    .string()
    .required("Telefonul contactului este obligatoriu !")
    .matches(/^[0-9]+$/, "Numarul de telefon trebuie sa fie valid")
    .min(10, "Numarul de telefon trebuie sa aiba minim 10 cifre")
    .max(15, "Numarul de telefon trebuie sa aiba maxim 15 cifre"),
  ContactEmail: yup
    .string()
    .required("Email-ul contactului este obligatoriu !")
    .email("Trebuie sa fie un email valid"),
  ContactType: yup.string().required("Tipul contactului este obligatoriu !"),

  facebook: yup
    .string()
    .url("Facebook trebuie sa fie un URL valid")
    .nullable()
    .optional(),
  instagram: yup
    .string()
    .url("Instagram trebuie sa fie un URL valid")
    .nullable()
    .optional(),
  tiktok: yup
    .string()
    .url("TikTok trebuie sa fie un URL valid")
    .nullable()
    .optional(),
  youtube: yup
    .string()
    .url("YouTube trebuie sa fie un URL valid")
    .nullable()
    .optional(),
  eventDetails: yup.string().nullable().optional(),

  profilePicture: yup
    .mixed()
    .required("Poza de profil este obligatorie !")
    .test(
      "fileFormat",
      "Formatul fisierului nu este suportat",
      (file: any) => !file || SUPPORTED_FORMATS.includes(file.type)
    )
    .nullable()
    .optional(), // Ensure `profilePicture` can be `null`

  coverPicture: yup
    .mixed()
    .required("Poza de coperta este obligatorie !")
    .test(
      "fileFormat",
      "Formatul fisierului nu este suportat",
      (file: any) => !file || SUPPORTED_FORMATS.includes(file.type)
    )
    .nullable()
    .optional(), // Ensure `coverPicture` can be `null`

  tos: yup
    .boolean()
    .oneOf([true], "Trebuie sa acceptati termenii si conditiile."),

  gdpr: yup.boolean().oneOf([true], "Trebuie sa acceptati politica GDPR."),
});

export { schema, defaultValues };
