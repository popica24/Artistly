import axios from "axios";

const apiurl = import.meta.env.VITE_API_LOCAL_URL + "categories";

const getCategories = async () => {
  const response = await axios.get(apiurl);
  return response.data;
};

export { getCategories };
