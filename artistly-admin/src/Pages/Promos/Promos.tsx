import { useQuery } from "react-query";
import { useAuth } from "../../Context/AuthContext";
import { get } from "../../Services/repoService";
import { ClientCard } from "../../Utils/types";
import TopClient from "./TopClient";
import SmallClient from "./SmallClient";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Promos = () => {
  const { currentUser } = useAuth();
  const { data: clients, isLoading } = useQuery<Array<ClientCard> | undefined>(
    ["top-clients"],
    () =>
      currentUser
        ?.getIdToken(false)
        .then((idToken) => get("top-clients", idToken)),
    {
      cacheTime: 10 * 15 * 1000,
      refetchInterval: 10 * 5 * 1000,
    }
  );

  return (
    <div className="flex flex-col justify-center mx-24">
      <div className="bg-[#354F52] text-white py-2 text-center">Promovati</div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="bg-[#EEE] w-full p-8 my-8">
            <TopClient client={clients ? clients[0] : undefined} key={1} />
          </div>
          <div className="bg-[#EEE] w-full p-8 my-8">
            <SmallClient
              place="Secondary"
              client={clients ? clients[1] : undefined}
              key={2}
            />
          </div>
          <div className="bg-[#EEE] w-full p-8 my-8">
            <SmallClient
              place="Tertiary"
              client={clients ? clients[2] : undefined}
              key={3}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Promos;
