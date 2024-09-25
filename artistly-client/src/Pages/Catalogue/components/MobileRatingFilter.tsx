import { useFilter } from "../../../Contexts/CatalogueFilterContext";
import Rating from "../../../components/RatingStars/Rating";

const MobileRaingFilter = () => {
  const { ratingFilter, updateRatingParam, removeRatingParam } = useFilter();

  const handleAddFilter = (rating: string) => {
    if (ratingFilter == rating) {
      removeRatingParam();
    } else updateRatingParam(rating);
  };

  return (
    <form className="max-w-[300px] mx-auto">
      <div className="bg-white p-4">
        <ul className="flex flex-col items-center justify-center max-h-[250px]">
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
                className="w-5 aspect-square"
              />
              <label className="ms-1 cursor-pointer" htmlFor={`rating-${f}`}>
                <Rating rating={f} size={25} />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default MobileRaingFilter;
