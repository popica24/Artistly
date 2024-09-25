import axios from "axios";
import { ClientCard, PostPage, RequestUserModel, User } from "../utils/types";

const apiurl = import.meta.env.VITE_API_LOCAL_URL + "user";

const createUser = async (user: User, idToken: string) => {
  await axios.post(
    apiurl,
    { FirstName: user.firstName, LastName: user.lastName },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};

const sendPasswordReset = async (email: string) => {
  await axios.post(apiurl + "/send-reset-password?to=" + email);
};

const sendEmailConfirm = async (email: string) => {
  await axios.post(apiurl + "/send-confirmation-email?to=" + email);
};

const requestUser = async (user: RequestUserModel, idToken: string) => {
  await axios.post(apiurl + "/request-partner", user, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

const getUser = async (idToken: string) => {
  const response = await axios.get(apiurl, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data;
};

const requestPage = async (page: PostPage, idToken: string, userId: string) => {
  await axios.post(apiurl + `/request-page/${userId}`, page, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

const deletePage = async (cid: string | undefined, idToken: string) => {
  await axios.delete(apiurl + `/page/${cid}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

const putUser = async (
  firstName: string | null,
  lastName: string | null,
  idToken: string
) => {
  await axios.put(
    apiurl,
    {
      FirstName: firstName,
      LastName: lastName,
    },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};

const getPages = async (idToken: string | undefined, userId: string) => {
  const response = await axios.get(apiurl + `/page/${userId}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data as Array<ClientCard>;
};

const enrollNewsletter = async (idToken: string | undefined) => {
  await axios.post(
    apiurl + "/newsletter-enroll",
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};

const withdrawNewsletter = async (idToken: string | undefined) => {
  await axios.post(
    apiurl + "/newsletter-withdraw",
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};

export {
  createUser,
  withdrawNewsletter,
  enrollNewsletter,
  getUser,
  requestPage,
  deletePage,
  requestUser,
  putUser,
  sendPasswordReset,
  getPages,
  sendEmailConfirm,
};
