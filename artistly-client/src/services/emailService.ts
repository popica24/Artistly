import axios from "axios";

const apiurl = import.meta.env.VITE_API_LOCAL_URL + "user/send-contact-form";

type EmailModel = {
  fullName: string;
  email: string;
  phoneNumber: string;
  society: string;
  body?:string
};
const sendEmail = async (idToken: string, email: EmailModel, type: number) => {
  await axios.post(apiurl, email, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    params: {
      type: type,
    },
  });
};
export { sendEmail };
