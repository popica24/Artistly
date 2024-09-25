import { ClientCard } from "../../utils/types";
import SearchResult from "./SearchResult";

type Props = {
  data: Array<ClientCard>;
};

const SearchResults = (props: Props) => {
  return (
    <>
      {props.data.map((client) => {
        return (
          <SearchResult
            clientName={client.clientName}
            clientTag={client.clientTag}
            urlPath={`${client.clientHandle}`}
          />
        );
      })}
    </>
  );
};

export default SearchResults;
