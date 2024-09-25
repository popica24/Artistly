import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { filterName } from "../../../../services/clientsService";
import { useDebounce } from "use-debounce";
import { ClientCard } from "../../../../utils/types";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";

const MobileSearchBar = () => {
  const { currentUser } = useAuth();
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
  return (
    <>
      <div className="w-full border-[0.83px] rounded-[68.872px] border-[#979797] h-[40px] flex items-center">
        <svg
          className="mx-3"
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
        >
          <path
            d="M19.5976 18.9201L15.854 15.1765C17.003 13.8662 17.637 12.2084 17.637 10.4495C17.637 8.52955 16.8892 6.72472 15.5318 5.36724C14.1743 4.00976 12.3694 3.26199 10.4495 3.26199C8.52955 3.26199 6.72472 4.00976 5.36724 5.36724C4.00976 6.72472 3.26199 8.52955 3.26199 10.4495C3.26199 12.3694 4.00976 14.1743 5.36724 15.5318C6.72472 16.8892 8.52955 17.637 10.4495 17.637C12.2084 17.637 13.8662 17.003 15.1765 15.854L18.9201 19.5976C19.0137 19.6912 19.1363 19.738 19.2589 19.738C19.3815 19.738 19.5041 19.6912 19.5976 19.5976C19.7848 19.4105 19.7848 19.1073 19.5976 18.9201ZM6.04481 14.8542C4.86842 13.6776 4.22033 12.1132 4.22033 10.4495C4.22033 8.78575 4.86842 7.22144 6.04481 6.04481C7.22144 4.86842 8.78575 4.22033 10.4495 4.22033C12.1132 4.22033 13.6776 4.86842 14.8542 6.04481C16.0306 7.22144 16.6787 8.78575 16.6787 10.4495C16.6787 12.1132 16.0306 13.6776 14.8542 14.8542C13.6776 16.0306 12.1132 16.6787 10.4495 16.6787C8.78575 16.6787 7.22144 16.0306 6.04481 14.8542Z"
            fill="#868686"
          />
        </svg>
        <div className="py-2">
          <input
            type="text"
            className="rounded-[68.872px] w-full h-full px-1"
            onChange={handleChange}
            value={searchQuery}
          />
        </div>
      </div>
      {(loading || isLoading) && (
        <div className="absolute top-14 w-full h-full z-10 rounded-[1.8rem]">
          <div className="flex flex-col items-center justify-center bg-white rounded-[1.8rem] shadow-md">
            <img src="/spinner.gif" width={100} height={10} />
          </div>
        </div>
      )}

      {clients && clients.length > 0 && !loading && !isLoading && (
        <div className="w-full border border-[#ADADAD] rounded-[23px] my-4">
          {!isLoading &&
            clients?.map((c, i) => {
              return (
                <Link
                  key={i}
                  className="flex flex-row items-center py-1"
                  to={!currentUser ? "/login" : `/${c.clientHandle}`}
                >
                  <svg
                    className="mx-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.1"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                  >
                    <path
                      d="M19.5976 18.9201L15.854 15.1765C17.003 13.8662 17.637 12.2084 17.637 10.4495C17.637 8.52955 16.8892 6.72472 15.5318 5.36724C14.1743 4.00976 12.3694 3.26199 10.4495 3.26199C8.52955 3.26199 6.72472 4.00976 5.36724 5.36724C4.00976 6.72472 3.26199 8.52955 3.26199 10.4495C3.26199 12.3694 4.00976 14.1743 5.36724 15.5318C6.72472 16.8892 8.52955 17.637 10.4495 17.637C12.2084 17.637 13.8662 17.003 15.1765 15.854L18.9201 19.5976C19.0137 19.6912 19.1363 19.738 19.2589 19.738C19.3815 19.738 19.5041 19.6912 19.5976 19.5976C19.7848 19.4105 19.7848 19.1073 19.5976 18.9201ZM6.04481 14.8542C4.86842 13.6776 4.22033 12.1132 4.22033 10.4495C4.22033 8.78575 4.86842 7.22144 6.04481 6.04481C7.22144 4.86842 8.78575 4.22033 10.4495 4.22033C12.1132 4.22033 13.6776 4.86842 14.8542 6.04481C16.0306 7.22144 16.6787 8.78575 16.6787 10.4495C16.6787 12.1132 16.0306 13.6776 14.8542 14.8542C13.6776 16.0306 12.1132 16.6787 10.4495 16.6787C8.78575 16.6787 7.22144 16.0306 6.04481 14.8542Z"
                      fill="#868686"
                    />
                  </svg>
                  <span className="px-1"> {c.clientName}</span>
                </Link>
              );
            })}
        </div>
      )}
      {!clients ||
        (!(clients.length > 0) && !isLoading && !loading && (
          <div className="absolute top-14 w-full h-full z-10 rounded-[1.8rem]">
            <div className="flex flex-col items-center justify-center bg-white rounded-[1.8rem] shadow-md">
              <span className="py-3">Nu s-a gasit nimic.</span>
            </div>
          </div>
        ))}
    </>
  );
};

export default MobileSearchBar;
