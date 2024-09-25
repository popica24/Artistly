import { createContext, useState, useContext, FC } from "react";
import { useQuery } from "react-query";
import { ClientCard } from "../utils/types";
import {
  deleteFromWishlist,
  getSharedWishlist,
  getWishlist,
  shareWishlist,
} from "../services/clientsService";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useLocation } from "react-router";

const apiurl = import.meta.env.VITE_API_LOCAL_URL;

type WishlistProviderProps = {
  children: React.ReactNode;
};

type WishlistContextProps = {
  items: ClientCard[] | undefined;
  deleteItem: (clientId: string) => void;
  addItem: (clientId: string) => void;
  share: () => Promise<string>; // Updated to Promise<string>
};

const WishlistContext = createContext<WishlistContextProps>({
  items: [],
  deleteItem: () => {},
  addItem: () => {},
  share: async () => "",
});

export const WishlistProvider: FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Array<ClientCard>>();
  const { currentUser } = useAuth();
  const location = useLocation();

  const { refetch } = useQuery<Array<ClientCard>>(["wishlist"], async () => {
    if (location.search.includes("?share=")) {
      const token = location.search.replace("?share=", "");
      const _items = await getSharedWishlist(token);
      setItems(_items);
      return _items;
    } else {
      if (!currentUser) return [];
      const idToken = await currentUser.getIdToken();
      const _items = await getWishlist(idToken);
      setItems(_items);
      return _items;
    }
  });

  const handleDelete = async (clientId: string) => {
    const idToken = await currentUser?.getIdToken();
    setItems(items?.filter((item) => item.clientHandle != clientId));
    await deleteFromWishlist(clientId, idToken);
    refetch();
  };

  const handleShare = async () => {
    const idToken = await currentUser?.getIdToken();
    return await shareWishlist(idToken);
  };

  const addToWishlist = async (clientId: string) => {
    const idToken = await currentUser?.getIdToken();
    await axios.post(apiurl + "client/wishlist/" + clientId, null, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    refetch();
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        deleteItem: handleDelete,
        share: handleShare,
        addItem: addToWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
