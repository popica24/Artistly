import { Rating } from "react-simple-star-rating";
import Textbox from "../../Profile/components/Textbox/Textbox";
import { SubmitHandler, useForm } from "react-hook-form";
import Textareabox from "../../Profile/PageCreate/components/TextareaBox";
import { useState } from "react";
import { AddReviewInputs, schema } from "./AddReview.Logic";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldLength from "../../Profile/PageCreate/components/FieldLength";
import { requestReview } from "../../../services/reviewService";
import { SubmitReviewBody } from "../../../utils/types";
import { useParams } from "react-router";
import { useAuth } from "../../../Contexts/AuthContext";
import Swal from "sweetalert2";

const AddReview = () => {
  const location = useParams().urlPath;
  const { currentUser } = useAuth();
  const [value, setValue] = useState(0);
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<AddReviewInputs>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<AddReviewInputs> = async (data) => {
    if (value == 0) {
      setError("rating", { type: "custom", message: "Rating invalid" });
      return;
    }
    if (!location) {
      return;
    }
    if (!currentUser) {
      return;
    }
    const model: SubmitReviewBody = {
      rating: value,
      title: data.title,
      body: data.description,
    };
    try {
      const idToken = await currentUser.getIdToken();
      await requestReview(model, location, idToken);
      Swal.fire({
        title: "Succes !",
        text: "Review-ul tau va fi afisat dupa ce trece de etapa de verificare !",
        icon: "success",
      });
    } catch {
      Swal.fire({
        title: "Oops..",
        text: "A aparut o eroare, va rugam incercati mai tarziu",
        icon: "error",
      });
    }
  };
  return (
    <div className="mt-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#EEEEEE] mt-3 p-4 drop-shadow-default rounded-xl flex flex-col items-start justify-start"
      >
        <Rating onClick={(e) => setValue(e)} transition allowFraction={false} />
        <p className="text-red-600">{errors.rating?.message}</p>
        <Textbox field="Titlu" register={register("title")} maxLength={30} />
        <FieldLength control={control} name="title" maxLength="30" />

        <p className="text-red-600">{errors.title?.message}</p>
        <Textareabox
          register={register("description")}
          field={"Review"}
          maxLength={200}
        />
        <FieldLength control={control} name="description" maxLength="200" />

        <p className="text-red-600">{errors.description?.message}</p>
        <span className="text-xs my-4">
          Prin publicarea review-ului, esti de acord cu{" "}
          <a className="text-[#07C]">termnii si condițiile </a>
          site-ului
        </span>
        <div className="mx-auto md:mx-0">
          <button
            type="submit"
            className="bg-white hover:bg-[#354F52] hover:text-white transition-colors cursor-pointer rounded-[20px] px-6 py-2"
          >
            Adaugă review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
