import axios from "axios";

const apiurl = import.meta.env.VITE_API_LOCAL_URL + "admin/";
const localApiUrl = import.meta.env.VITE_API_LOCAL_URL;
const get = async (path: string, idToken?: string) => {
  const response = axios.get(apiurl + path, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return (await response).data;
};

const post = async (path: string, idToken?: string) => {
  const response = await axios.post(
    apiurl + path,
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};

const localGet = async (path: string, name: string) => {
  const response = await axios.get(localApiUrl+path, {
    params: {
      name: name
    }
  });

  return response.data;
};

export { get, post, localGet };
