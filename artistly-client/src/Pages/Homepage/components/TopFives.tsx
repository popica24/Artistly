import { useQuery } from "react-query";
import { getTopFives } from "../../../services/clientsService";
import { ClientCard } from "../../../utils/types";

import TopFiveContainer from "./TopFiveContainer";
import ErrorBlurOverlay from "../../../components/ErrorOverlay/ErrorBlurOverlay";
import TopFiveSkeleton from "../skeletons/TopFiveSkeleton";
//loose typed components

const topTypes = ["Solist", "Fotograf", "Orchestra", "Locatie"];
const title = ["Solisti", "Fotografi", "Orchestre", "Locatii"];

type TopFiveArr = {
  [key in (typeof topTypes)[number]]: ClientCard[];
};

const TopFives = () => {
  const {
    data: topFivesPromise,
    isError,
    isLoading,
  } = useQuery<Array<ClientCard>>(["topfives"], getTopFives, {
    cacheTime: 15 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
  });

  if (isError) {
    return (
      <ErrorBlurOverlay
        children={<TopFiveSkeleton />}
        errorMessage={
          "Ne pare rău, dar momentan nu putem topul clientilor de top. Vă rugăm să reveniți mai târziu și să ne scuzați pentru inconveniență."
        }
      />
    );
  }
  const topFives: TopFiveArr = {} as TopFiveArr;

  if (!isError && !isLoading && topFivesPromise) {
    topTypes.forEach((type) => {
      topFives[type] = [];
    });

    // if (topFives) {
    //   topFivesPromise.forEach((item: ClientModel) => {
    //     topFives[item.clientTag!].push(item);
    //   });
    // }
  }
  if (isLoading || !topFivesPromise) {
    return <TopFiveSkeleton />;
  } else {
    return (
      <section className="flex laptop:flex-row flex-col laptop:justify-center laptop:my-24">
        {topTypes.map((type, i) => (
          <TopFiveContainer
            key={type}
            title={title[i]}
            clients={topFives[type]}
          />
        ))}
      </section>
    );
  }
};

export default TopFives;
