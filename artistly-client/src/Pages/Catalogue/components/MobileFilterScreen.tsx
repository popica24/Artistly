import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MobileGenresFilter from "./MobileGenresFilter";
import MobileLocationFilter from "./MobileLocationFilter";
import MobileRaingFilter from "./MobileRatingFilter";
import { useFilter } from "../../../Contexts/CatalogueFilterContext";
import { IoMdClose } from "react-icons/io";
import Rating from "../../../components/RatingStars/Rating";

const MobileFilterScreen = ({ goBack }: { goBack: () => void }) => {
  const [panel, setPanel] = useState(0);
  const handleBack = () => {
    if (panel == 0) {
      goBack();
    } else {
      setPanel(0);
    }
  };
  const {
    locationFilter,
    genresFilter,
    ratingFilter,
    removeLocationParam,
    removeGenreParam,
    removeRatingParam,
  } = useFilter();
  return (
    <div className="fixed inset-0 bg-white z-40">
      <div className="h-[108px] bg-[#FAEDCD]">
        <div className="flex items-end h-full justify-center">
          <span className="text-lg pb-3">Filtreaza</span>
        </div>
      </div>
      <div className="max-w-[90vmin] mx-auto">
        <div className="flex flex-row flex-wrap items-center">
          {locationFilter?.map((filter) => (
            <FilterButton
              text={filter}
              removeFilter={() => removeLocationParam(filter)}
            />
          ))}
          {genresFilter?.map((filter) => (
            <FilterButton
              text={filter}
              removeFilter={() => removeGenreParam(filter)}
            />
          ))}
          {ratingFilter && (
            <RatingButton
              text={ratingFilter}
              removeFilter={() => removeRatingParam()}
            />
          )}
        </div>
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="w-full me-auto mt-4">
            <div
              onClick={handleBack}
              className="flex flex-row items-center bg-[#EEE] w-fit px-4 py-1 rounded-[0.9375rem] font-medium text-sm cursor-pointer hover:bg-[#354F52] hover:text-white transition-colors"
            >
              <FaArrowLeft className="me-1" />
              Inapoi
            </div>
          </div>
        </div>
        {panel == 0 && (
          <>
            <SetPanelButton text="Gen muzical" handler={() => setPanel(1)} />
            <SetPanelButton text="Locatie" handler={() => setPanel(2)} />
            <SetPanelButton text="Rating" handler={() => setPanel(3)} />
          </>
        )}
        {panel == 1 && <MobileGenresFilter />}
        {panel == 2 && <MobileLocationFilter />}
        {panel == 3 && <MobileRaingFilter />}
      </div>
    </div>
  );
};
export default MobileFilterScreen;

const SetPanelButton = ({
  text,
  handler,
}: {
  text: string;
  handler: () => void;
}) => {
  return (
    <div
      className="flex flex-row items-center justify-between bg-[#EEEEEE] py-3 mb-4 ps-8 pe-4"
      onClick={handler}
    >
      <span>{text}</span>
      <FaArrowRight />
    </div>
  );
};

const FilterButton = ({
  removeFilter,
  text,
}: {
  removeFilter: () => void;
  text: string;
}) => {
  return (
    <div
      className="bg-[#07C] text-white px-3 py-1 rounded-full text-xs inline-flex items-center m-2"
      onClick={removeFilter}
    >
      <IoMdClose className="me-1" />
      {text}
    </div>
  );
};

const RatingButton = ({
  removeFilter,
  text,
}: {
  removeFilter: () => void;
  text: string;
}) => {
  const numString = text;
  const num = parseInt(numString, 10);

  return (
    <div
      className="bg-[#07C] text-white px-3 py-1 rounded-full text-xs inline-flex items-center m-2"
      onClick={removeFilter}
    >
      <IoMdClose className="me-1" />
      <Rating rating={num} size={15} />
    </div>
  );
};
