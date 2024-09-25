import { CSSProperties, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "react-query";
import { ClientCard } from "../../utils/types";
import SearchResults from "./SearchResults";
import { filterName } from "../../services/clientsService";
const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [query] = useDebounce(searchQuery, 500);
  const { data: clients, isLoading } = useQuery<Array<ClientCard>>(
    ["filter-clients-mobile", query],
    () => filterName(query)
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setLoading(true);
  };
  const handleDebouncedValueChange = () => {
    setLoading(false); // Hide indicator when debounce is finished
  };
  useEffect(() => {
    handleDebouncedValueChange();
  }, [query]);
  const shadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };

  return (
    <>
      <div className="flex flex-row w-full items-center bg-white rounded-s-[1.96875rem] rounded-e-[1.875rem] absolute">
        <svg
          className="mx-5"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.3467 12.5064C14.635 13.6601 13.6603 14.6348 12.5064 15.3467L16.5715 19.4118C17.3558 20.1961 18.6274 20.1961 19.4116 19.4118C19.4117 19.4117 19.4117 19.4117 19.4118 19.4116C20.1961 18.6274 20.1961 17.3558 19.4118 16.5715L15.3467 12.5064ZM7.96463 0C3.56884 0 0 3.56884 0 7.96463C0 12.3604 3.56884 15.9292 7.96463 15.9292C12.3604 15.9292 15.9292 12.3604 15.9292 7.96463C15.9292 3.56884 12.3604 0 7.96463 0ZM7.96463 2.73923C10.8486 2.73923 13.19 5.08064 13.19 7.96463C13.19 10.8486 10.8486 13.19 7.96463 13.19C5.08064 13.19 2.73923 10.8486 2.73923 7.96463C2.73923 5.08064 5.08064 2.73923 7.96463 2.73923Z"
            fill="#362055"
          />
        </svg>

        <input
          autoFocus
          type="text"
          name=""
          id=""
          className="w-full py-3 mobile:pe-[5%] pe-7 mobile:ps-[5%] rounded-s-[1.96875rem] rounded-e-[1.875rem] ps-1"
          placeholder="Cauta"
          onChange={handleChange}
          value={searchQuery}
        />
      </div>
      {(loading || isLoading) && (
        <div className="absolute top-14 w-full h-full z-10 rounded-[1.8rem]">
          <div
            className="flex flex-col items-center justify-center bg-white rounded-[1.8rem] shadow-md"
            style={shadow}
          >
            <img src="/spinner.gif" width={100} height={10} />
          </div>
        </div>
      )}
      {clients && !loading && !isLoading && (
        <div className="absolute top-14 w-full h-full z-10 rounded-[1.8rem]">
          <div
            className="flex flex-col items-start justify-start py-3 bg-white rounded-[1.8rem] shadow-md"
            style={shadow}
          >
            {!isLoading && <SearchResults data={clients} />}
          </div>
        </div>
      )}
      {!loading && !isLoading && clients?.length == 0 && (
        <div className="absolute top-14 w-full h-full z-10 rounded-[1.8rem]">
          <div
            className="flex flex-col items-start justify-start py-3 bg-white rounded-[1.8rem] shadow-md"
            style={shadow}
          >
            <span className="text-center w-full">
              Nu s-a găsit niciun rezultat
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Searchbar;
