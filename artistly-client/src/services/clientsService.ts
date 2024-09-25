import axios from "axios";
import { ClientFilter, PremiumClient } from "../utils/types";

const apiurl = import.meta.env.VITE_API_LOCAL_URL;

const getLatestAdded = async () => {
  const response = await axios.get(apiurl + "client/latest-added");
  return response.data;
};

const getTopFives = async () => {
  const response = await axios.get(apiurl + "top/clients");
  return response.data;
};

const getClient = async (
  url: string | undefined,
  subcategoryId: string | undefined,
  idToken: string
) => {
  console.log(subcategoryId);

  const response = await axios.get(apiurl + "client/" + url, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data as PremiumClient | undefined;
};

const getTopClient = async () => {
  const response = await axios.get(apiurl + "client/top");
  return response.data;
};

const filterClients = async (filter: ClientFilter, index = 1) => {
  if (
    filter &&
    (filter.location || filter.rating || filter.service || filter.subcategoryId)
  ) {
    const response = await axios.get(
      apiurl + `client/filter?pageIndex=${index}`,
      {
        params: {
          SubcategoryId: filter.subcategoryId || null,
          Location: filter.location || null,
          Service: filter.service || null,
          Rating: filter.rating || null,
        },
      }
    );
    return response.data;
  }
};

const filterName = async (filter: string) => {
  if (filter.length > 0 || filter != "") {
    const response = await axios.get(apiurl + `client/search`, {
      params: {
        name: filter,
      },
    });
    return response.data;
  }
};

const getWishlist = async (idToken: string | undefined) => {
  const response = await axios.get(
    apiurl + "client/wishlist",

    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};

const getSharedWishlist = async (token: string) => {
  const response = await axios.get(apiurl + "client/wishlist/shared/" + token);
  return response.data;
};

const addToWishlist = async (clientId: string, idToken: string | undefined) => {
  await axios.post(apiurl + "client/wishlist/" + clientId, null, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

const deleteFromWishlist = async (
  clientId: string,
  idToken: string | undefined
) => {
  await axios.delete(apiurl + "client/wishlist/" + clientId, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};
const shareWishlist = async (idToken: string | undefined) => {
  const response = await axios.get(apiurl + "client/wishlist/share", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data as string;
};

const getLocations = async () => {
  const response = await axios.get(apiurl + "client/locations");
  return response.data;
};
const getGenres = async () => {
  const response = await axios.get(apiurl + "client/genres");
  return response.data;
};
export {
  getClient,
  getSharedWishlist,
  deleteFromWishlist,
  getLatestAdded,
  getTopFives,
  getTopClient,
  filterClients,
  filterName,
  getWishlist,
  shareWishlist,
  addToWishlist,
  getLocations,
  getGenres,
};
