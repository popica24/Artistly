import * as yup from "yup";

export type AddReviewInputs = {
  rating: number;
  title: string;
  description: string;
};

const schema: any = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Titlul review-ului este obligatoriu !")
    .min(10, "Titlul trebuie sa aibe minim 10 caractere")
    .matches(/^[a-zA-Z\s]+$/, "Titlul trebuie sa contina doar litere !"),
  description: yup
    .string()
    .trim()
    .required("Descrierea review-ului este obligatorie !")
    .min(10, "Descrierea trebuie sa aibe minim 10 caractere")
    .matches(/^[a-zA-Z\s]+$/, "Titlul trebuie sa contina doar litere !"),
});
export { schema };
