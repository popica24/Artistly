import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useQuery } from "react-query";
import { get, post } from "../../Services/repoService";
import { Page } from "../../Utils/types";
import PageCard from "./PageCard";
import SmallPageCard from "./SmallPageCard";
import { toast } from "react-toastify";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Pages = () => {
  const { currentUser } = useAuth();
  const [requestsSelected, setRequestsSelected] = useState(false);

  const { data, isLoading } = useQuery<Array<Page>>(
    [`list-${requestsSelected ? "requested-" : ""}pages`],
    () => fetchPages()
  );

  const fetchPages = async () => {
    const idToken = await currentUser?.getIdToken();
    const response = await get(
      `list-${requestsSelected ? "requested-" : ""}pages`,
      idToken
    );
    return response;
  };

  const approvePage = async (clientId: string) => {
    try {
      const idToken = await currentUser?.getIdToken();
      await post("approve-page/" + clientId, idToken);
      toast.success("Pagina aprobata !");
    } catch (err) {
      toast.error("Eroare!");
    }
  };
  const dismissPage = async (clientId: string) => {
    try {
      const idToken = await currentUser?.getIdToken();
      await post("dismis-page/" + clientId, idToken);
      toast.success("Pagina respinsa !");
    } catch (err) {
      toast.error("Eroare!");
    }
  };

  return (
    <div className="flex flex-col justify-center mx-24">
      <div className="grid grid-cols-2 w-full">
        <div
          onClick={() => setRequestsSelected(false)}
          className={`${
            requestsSelected
              ? "bg-[#EEE] cursor-pointer"
              : "bg-[#354F52] text-white"
          } col-span-1 text-center py-2`}
        >
          Pagini
        </div>
        <div
          onClick={() => setRequestsSelected(true)}
          className={`${
            !requestsSelected
              ? "bg-[#EEE] cursor-pointer"
              : "bg-[#354F52] text-white"
          } col-span-1 text-center py-2`}
        >
          Request Pagini
        </div>
      </div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-24">
          {requestsSelected &&
            data?.map((client, i) => (
              <PageCard
                client={client}
                key={i}
                dismissPage={() => dismissPage(client.clientId!)}
                approvePage={() => approvePage(client.clientId!)}
              />
            ))}
          {!requestsSelected &&
            data?.map((client, i) => <SmallPageCard client={client} key={i} />)}
        </div>
      )}
    </div>
  );
};

export default Pages;
