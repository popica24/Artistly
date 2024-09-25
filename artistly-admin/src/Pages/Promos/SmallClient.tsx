import SmallClientCard from "./SmallTopClientCard";
import { ClientCard } from "../../Utils/types";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { localGet, post } from "../../Services/repoService";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import Result from "./Result";

type Props = {
  client: ClientCard | undefined;
  place: string | undefined;
};

function SmallClient(props: Props) {
  const [query, setQuery] = useState("");
  const [handle, setHandle] = useState("");
  const [results, setResults] = useState<any[]>();
  const [debouncedQuery] = useDebounce(query, 200);

  const { currentUser } = useAuth();
  const promote = async () => {
    try {
      const idToken = await currentUser?.getIdToken();
      await post(`promote-top-client/${handle}/${props.place}`, idToken);
      toast.success("Client promovat !");
    } catch (err) {
      toast.error("Erorare !");
    }
  };
  const handleUpdatedClient = (name: string) => {
    setHandle(name);
    toast.success(
      `Clientul cu id ${name} va fi updatat la apasarea butonului "Adauga"`
    );
  };
  useEffect(() => {
    if (debouncedQuery == "") return;
    localGet("http://localhost:5025/api/client/search", debouncedQuery).then(
      (result) => setResults(result)
    );
  }, [debouncedQuery]);
  return (
    <div className="flex flex-row items-center justify-between w-full">
      {props.client ? (
        <SmallClientCard client={props.client} key={1} />
      ) : (
        <div></div>
      )}
      <div className="bg-white p-2 h-[200px]  flex flex-col mb-auto">
        <div className="relative">
          <input
            placeholder="Cauta"
            className="bg-[#eee] rounded-xl py-1 pe-3 ps-12"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4" />
        </div>
        <div className="flex flex-col overflow-y-scroll">
          {results?.map((r) => (
            <div onClick={() => handleUpdatedClient(r.clientHandle)}>
              <Result data={r} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={promote}
        className="bg-white px-6 py-1 rounded-full border-green-500 border"
      >
        Adauga
      </button>
    </div>
  );
}

export default SmallClient;
