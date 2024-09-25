import { FC, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useWishlist } from "../../Contexts/WishlistProvider";

type Props = {
  id: string | undefined;
  size: number;
};

const WishlistButton: FC<Props> = (props: Props) => {
  const { currentUser } = useAuth();
  const { items, addItem, deleteItem } = useWishlist();
  const toggleWishlist = async (clientId: string) => {
    const idToken = await currentUser?.getIdToken();
    if (!idToken) return;
    if (isInWishlist(clientId)) {
      deleteItem(clientId);
    } else {
      addItem(clientId);
    }
  };
  const isInWishlist = (clientId: string) => {
    if (!items || items.length === 0) return false;
    return items.some((item) => item.clientHandle === clientId);
  };
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);
  return (
    <button onClick={() => toggleWishlist(props.id || "")}>
      {isInWishlist(props.id || "") ? (
        <svg
          className="ms-5"
          xmlns="http://www.w3.org/2000/svg"
          width={props.size}
          height={props.size}
          viewBox="0 0 31 31"
          fill="none"
        >
          <circle cx="15.5" cy="15.5" r="15" fill="#EE0000" stroke="#EE0000" />
          <path
            d="M20.5252 7H10.529C9.71484 7 9 7.66085 9 8.44308V23.0343C9 23.2961 9.07386 23.5143 9.19289 23.6829C9.33524 23.8845 9.56444 24 9.81023 23.9999C10.0426 23.9999 10.29 23.8979 10.5185 23.7053L14.9908 19.9585C15.1289 19.8421 15.3273 19.7754 15.5336 19.7754C15.7399 19.7754 15.9379 19.8421 16.0764 19.9588L20.5338 23.7047C20.763 23.8979 20.9934 24 21.2254 24C21.6176 24 22 23.7014 22 23.0343V8.44308C22 7.66085 21.3394 7 20.5252 7Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          className="ms-5"
          xmlns="http://www.w3.org/2000/svg"
          width={props.size}
          height={props.size}
          viewBox="0 0 30 30"
          fill="none"
        >
          <circle
            cx="14.7695"
            cy="15.2304"
            r="14.2706"
            fill="white"
            stroke="#EE0000"
            strokeWidth="0.951374"
          />
          <path
            d="M19.5505 7.1438H10.0403C9.26577 7.1438 8.58569 7.77252 8.58569 8.51671V22.3984C8.58569 22.6475 8.65596 22.8551 8.7692 23.0155C8.90463 23.2073 9.12269 23.3172 9.35652 23.3171C9.5776 23.3171 9.81297 23.22 10.0303 23.0368L14.2852 19.4722C14.4166 19.3614 14.6054 19.298 14.8016 19.298C14.9978 19.298 15.1862 19.3614 15.318 19.4725L19.5586 23.0362C19.7768 23.22 19.9959 23.3172 20.2166 23.3172C20.5898 23.3172 20.9536 23.0331 20.9536 22.3985V8.51671C20.9536 7.77252 20.325 7.1438 19.5505 7.1438Z"
            fill="#404040"
          />
        </svg>
      )}
    </button>
  );
};

export default WishlistButton;
