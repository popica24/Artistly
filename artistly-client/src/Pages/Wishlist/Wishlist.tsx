import { useAuth } from "../../Contexts/AuthContext";
import ClientCard from "./ClientCard";
import { useState } from "react";
import { StringParam, useQueryParams } from "use-query-params";
import { useWishlist } from "../../Contexts/WishlistProvider";
import ProfileCard from "../Profile/components/ProfileCard/ProfileCard";
import Textbox from "../Profile/components/Textbox/Textbox";

const Wishlist = () => {
  const [link, setLink] = useState("");

  const [queryParams] = useQueryParams({
    share: StringParam,
  });

  const { items, deleteItem, share } = useWishlist();

  const { currentUser, dbUser } = useAuth();

  document.title = "Artistly | Dorinte";

  const shareResult = async () => {
    const _link = await share();
    setLink(_link);
    navigator.clipboard.writeText(_link);
  };

  return (
    <div className="mb-8">
      <div className="bg-[#EEE] w-full text-center py-1 text-[20px] font-medium text-[#2F2F2F] laptop:my-10">
        Lista de dorinte
      </div>

      <div className="flex laptop:flex-row flex-col">
        {currentUser && dbUser && !queryParams.share && (
          <div className="laptop:w-[25%] w-[90vmin] tablet:mx-auto tablet:my-8">
            <ProfileCard />
          </div>
        )}
        <div className="flex flex-col items-center justify-between w-full">
          {items?.length == 0 && (
            <span className="text-center w-full">Wishlist gol</span>
          )}
          {items &&
            items.length > 0 &&
            items?.map((client) => {
              return (
                <div className="flex laptop:flex-row tablet:flex-col items-center justify-between w-full tablet:mt-8">
                  <div className="w-full max-w-[500px] tablet:w-[90vmin] mx-auto">
                    <ClientCard
                      key={client.clientHandle}
                      client={client}
                      subcategoryId={client.clientHandle}
                    />
                  </div>
                  {currentUser && dbUser && !queryParams.share && (
                    <button
                      className="whitespace-nowrap ms-4 text-[#F00] text-[18px] cursor-pointer"
                      onClick={() => deleteItem(client.clientHandle)}
                    >
                      Sterge din lista
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {items && items.length > 0 && !queryParams.share && (
        <div className="max-w-lg mx-auto">
          <div className="mx-auto flex-col flex items-center justify-center">
            <button
              className="bg-[#510087] text-white rounded-md px-4 py-1"
              onClick={shareResult}
            >
              Copiaza link
            </button>
          </div>
          {link && (
            <div className="text-xs">
              <Textbox field="Link" disabled defaultValue={link} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
