import { useQuery } from "react-query";
import { getLatestAdded } from "../../../services/clientsService";
import { ClientCard } from "../../../utils/types";
import ErrorBlurOverlay from "../../../components/ErrorOverlay/ErrorBlurOverlay";
import LatestAddedSkeleton from "../skeletons/LatestAddedSkeleton";
import RoundedArtistButton from "../../../components/RountArtistButton/RoundedArtistButton";
// import RoundedArtistButton from "../../../components/RountArtistButton/RoundedArtistButton";
const LatestAdded = () => {
  const {
    data: latestAdded,
    isError,
    isLoading,
  } = useQuery<Array<ClientCard>>(["latestadded"], getLatestAdded, {
    cacheTime: 15 * 60 * 1000,
  });

  if (isError) {
    return (
      <ErrorBlurOverlay
        children={<LatestAddedSkeleton />}
        errorMessage={
          "Ne pare rău, dar momentan nu putem afisa ultimii clienti adaugati. Vă rugăm să reveniți mai târziu și să ne scuzați pentru inconveniență."
        }
      />
    );
  }
  if (isLoading || !latestAdded) {
    return <LatestAddedSkeleton />;
  } else {
    return (
      <div className=" flex flex-col items-start w-full tablet:max-w-[90vmin] mx-auto tablet:my-0 px-2 my-16">
        <span className="text-[#383838] text-[1.3rem] tablet:text-[1.1rem] font-semibold tablet:ms-5 tablet:mt-10 tablet:mb-6">
          Ultimii adăugați
        </span>

        <div className="flex flex-row items-center tablet:justify-start justify-center w-full tablet:overflow-x-scroll h-[160px]">
          {latestAdded.length > 0 ? (
            latestAdded.map((a, i) => {
              return <RoundedArtistButton client={a} key={i} />;
            })
          ) : (
            <span>Nu exista conturi adaugate</span>
          )}
        </div>
      </div>
    );
  }
};
export default LatestAdded;
