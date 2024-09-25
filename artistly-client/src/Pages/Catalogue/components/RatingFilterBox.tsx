import { RiArrowDownSLine } from "react-icons/ri";
import { useFilter } from "../../../Contexts/CatalogueFilterContext";
import Rating from "../../../components/RatingStars/Rating";

const RatingFilterBox = () => {
  const { ratingFilter, updateRatingParam, removeRatingParam } = useFilter();

  const handleAddFilter = (rating: string) => {
    if (ratingFilter == rating) {
      removeRatingParam();
    } else updateRatingParam(rating);
  };

  return (
    <form>
      <div className="bg-[#EEEEEE] drop-shadow-default p-4">
        <div className="flex flex-row items-center">
          <p className="text-lg">Rating minim</p>
          <div className="ms-auto">
            <RiArrowDownSLine />
          </div>
        </div>

        <ul className="flex flex-col max-h-[250px]">
          {[5, 4, 3, 2, 1].map((f) => (
            <li
              key={f}
              className="flex flex-row items-center border-b-[.5px] border-transparent w-min hover:border-black transition-colors whitespace-nowrap my-1"
            >
              <input
                onClick={() => handleAddFilter(f.toString())}
                checked={ratingFilter === f.toString()}
                id={`rating-${f}`}
                value={f}
                type="checkbox"
              />
              <label className="ms-1 cursor-pointer" htmlFor={`rating-${f}`}>
                <Rating rating={f} size={20} />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default RatingFilterBox;
