import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useQuery } from "react-query";
import { get, post } from "../../Services/repoService";
import { User } from "../../Utils/types";
import { toast } from "react-toastify";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Partners = () => {
  const { currentUser } = useAuth();
  const [requestsSelected, setRequestsSelected] = useState(false);

  const { data, isLoading } = useQuery<Array<User>>(
    [`list-${requestsSelected ? "requested-" : ""}partners`],
    () => fetchPages()
  );

  const fetchPages = async () => {
    const idToken = await currentUser?.getIdToken();
    const response = await get(
      `list-${requestsSelected ? "requested-" : ""}partners`,
      idToken
    );
    return response;
  };

  const approveUser = async (clientId: string) => {
    try {
      const idToken = await currentUser?.getIdToken();
      await post("approve-user/" + clientId, idToken);
      toast.success("Cont aprobat !");
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
          Conturi Parteneri
        </div>
        <div
          onClick={() => setRequestsSelected(true)}
          className={`${
            !requestsSelected
              ? "bg-[#EEE] cursor-pointer"
              : "bg-[#354F52] text-white"
          } col-span-1 text-center py-2`}
        >
          Request Conturi Parteneri
        </div>
      </div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        data?.map((client, i) => (
          <div
            className="bg-[#EEE] text-[20px] px-8 py-4 my-4 rounded-md"
            key={i}
          >
            <div
              className={`grid ${
                requestsSelected ? "grid-cols-5" : "grid-cols-2"
              }`}
            >
              <div
                className={`${requestsSelected ? "col-span-2" : "col-span-1"}`}
              >
                <div className="flex flex-col items-start">
                  <div className="inline-flex items-center">
                    <span>Nume : {client.firstName}</span>
                    <span className="ms-7">Prenume : {client.lastName}</span>
                  </div>
                  <span className="my-3">Email : {client.email}</span>
                  <span className="flex">
                    Newsletter:
                    {client.newsletterActive ? (
                      <p className="ms-4 text-green-400">ACTIV</p>
                    ) : (
                      <p className="ms-4 text-red-400">INACTIV</p>
                    )}
                  </span>
                </div>
              </div>
              <div
                className={`${requestsSelected ? "col-span-2" : "col-span-1"}`}
              >
                <div className="flex flex-col items-start">
                  <span>Telefon : {client.phoneNumber}</span>

                  <span className="font-medium my-3">
                    Status : {client.status}
                  </span>
                  <span className="font-medium">
                    Categorie : {client.categories}
                  </span>
                </div>
              </div>
              {requestsSelected && (
                <div className="flex flex-col h-full justify-between">
                  <button
                    className="bg-green-600"
                    onClick={() => approveUser(client.clientId!)}
                  >
                    Approve
                  </button>
                  <button className="bg-red-600">Delete</button>
                </div>
              )}
            </div>
            <div className="flex flex-row my-4">
              Pagini:
              {client.pages?.map((page, i) => {
                return (
                  <a
                    href={`http://localhost:8080/${page}`}
                    key={i}
                    target="_blank"
                    className="text-blue-800 underline mx-4"
                  >
                    {page}
                  </a>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Partners;
