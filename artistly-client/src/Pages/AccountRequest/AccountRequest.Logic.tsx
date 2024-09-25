import * as yup from "yup";

export type AccountRequestInputs = {
  category: string;
  subcategory: string;
  firstName: string;
  lastName: string;
  email: string | null;
  status: string;
  phoneNumber: string;
  tos: boolean;
  gdpr: boolean;
};

const schema: any = yup.object().shape({
  category: yup.string().required("Categoria este un camp obligatoriu !"),
  subcategory: yup.string().required("Subcategoria este un camp obligatoriu !"),

  firstName: yup.string().required("Prenumele este un camp obligatoriu !"),
  lastName: yup.string().required("Numele este un camp obligatoriu !"),

  email: yup
    .string()
    .required("Email-ul contactului este obligatoriu !")
    .email("Trebuie sa fie un email valid"),
  status: yup.string().required("Tipul contactului este obligatoriu !"),
  phoneNumber: yup
    .string()
    .required("Telefonul contactului este obligatoriu !")
    .matches(/^[0-9]+$/, "Numarul de telefon trebuie sa fie valid")
    .min(10, "Numarul de telefon trebuie sa aiba minim 10 cifre")
    .max(15, "Numarul de telefon trebuie sa aiba maxim 15 cifre"),
  tos: yup
    .boolean()
    .oneOf([true], "Trebuie sa acceptati termenii si conditiile."),

  gdpr: yup.boolean().oneOf([true], "Trebuie sa acceptati politica GDPR."),
});

export { schema };
