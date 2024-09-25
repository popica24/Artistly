import axios from "axios";
import { SubmitReviewBody } from "../utils/types";

const apiurl = import.meta.env.VITE_API_LOCAL_URL;

const requestReview = async (
  model: SubmitReviewBody,
  urlPath: string,
  token: string
) => {
  await axios.post(apiurl + "user/request-review/" + urlPath, model, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { requestReview };
