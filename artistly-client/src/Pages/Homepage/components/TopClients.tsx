import { useQuery } from "react-query";
import { ClientCard } from "../../../utils/types";
import { getTopClient } from "../../../services/clientsService";
import BigTopClientCard from "./BigTopClientCard";
import SmallClientCard from "./SmallClientCard";
import PhoneClientCard from "./PhoneClientCard";

const TopClients = () => {
  const { data: topClients } = useQuery<Array<ClientCard>>(
    ["topClients"],
    getTopClient,
    {
      cacheTime: 15 * 10 * 1000,
      staleTime: 15 * 60 * 1000,
    }
  );

  return (
    <div className="grid grid-cols-4 tablet:grid-cols-1 tablet:my-6 my-24">
      {topClients?.map((client, i) => {
        if (topClients.indexOf(client) == 0) {
          return (
            <div className="col-span-2 tablet:col-span-1 tablet:my-4">
              <div className="flex items-center justify-start w-full tablet:hidden">
                <BigTopClientCard client={client} key={i} />
              </div>
              <div className="hidden items-center justify-center w-full h-full tablet:flex">
                <SmallClientCard client={client} key={i} />
              </div>
            </div>
          );
        } else {
          return (
            <div className="col-span-1 tablet:col-span-2 tablet:my-4">
              <div className="flex items-start justify-end w-full h-full tablet:hidden">
                <SmallClientCard client={client} key={i} />
              </div>
              <div className="hidden items-center justify-center w-full h-full tablet:flex">
                <PhoneClientCard client={client} key={i} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TopClients;
