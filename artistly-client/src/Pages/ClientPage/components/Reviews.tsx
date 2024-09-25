import { useState } from "react";
import Rating from "../../../components/RatingStars/Rating";
import AddReview from "./AddReview";
import ReviewList from "./ReviewList";

type Props = {
  clientRating: number;
  extendedReviews: {
    oneStar: number;
    twoStar: number;
    threeStar: number;
    fourStar: number;
    fiveStar: number;
  };
  minifiedReviews: {
    name: string;
    dateAdded: string;
    title: string;
    review: string;
    rating: number;
  }[];
};

const Reviews = ({ clientRating, extendedReviews, minifiedReviews }: Props) => {
  const [showAddReview, setShowAddReview] = useState(false);

  const handleShowAddReview = () => {
    setShowAddReview(true);
  };

  if (!extendedReviews) return <></>;

  const total =
    extendedReviews.oneStar +
    extendedReviews.twoStar +
    extendedReviews.threeStar +
    extendedReviews.fourStar +
    extendedReviews.fiveStar;

  return (
    <>
      <div className="mt-12">
        <span className="font-medium text-lg">Recenzii</span>
        <div className="bg-[#EEEEEE] mt-3 p-4 drop-shadow-default rounded-xl flex flex-col lg:justify-evenly lg:flex-row">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full text-center text-3xl">{clientRating}/5</div>
            <div className="flex items-center justify-center w-full mb-2">
              <Rating rating={clientRating} size={30} />
            </div>
          </div>
          <div className="max-w-[300px] mx-auto">
            <RatingBar
              color="#7EAC01"
              index={5}
              total={total}
              rating={extendedReviews?.fiveStar}
            />
            <RatingBar
              color="#B2C089"
              index={4}
              total={total}
              rating={extendedReviews?.fourStar}
            />
            <RatingBar
              color="#F6A46F"
              index={3}
              total={total}
              rating={extendedReviews?.threeStar}
            />
            <RatingBar
              color="#FF6602"
              index={2}
              total={total}
              rating={extendedReviews?.twoStar}
            />
            <RatingBar
              color="#EE0000"
              index={1}
              total={total}
              rating={extendedReviews?.oneStar}
            />
          </div>
          <div className="flex items-center justify-center mt-4 mb-2">
            <button
              className="bg-[#FFB703] rounded-[20px] px-6 py-2"
              onClick={handleShowAddReview}
            >
              Adauga recenzia ta
            </button>
          </div>
        </div>
      </div>
      {showAddReview && <AddReview />}
      <ReviewList minifiedReviews={minifiedReviews} />
    </>
  );
};

const RatingBar = ({
  color,
  rating,
  index,
  total,
}: {
  color: string;
  rating: number | undefined;
  index: number;
  total: number;
}) => {
  return (
    <div className="grid grid-cols-12 items-center">
      <div className="col-span-1">
        <span className="inline-flex items-center">
          {index}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5779 4.65402C10.4938 4.40386 10.2838 4.22439 10.0289 4.18527L7.56257 3.80676L6.45725 1.4616C6.34195 1.21418 6.10414 1.06079 5.83716 1.06079C5.57018 1.06079 5.33237 1.21453 5.21707 1.46092L4.11141 3.8071L1.64511 4.18561C1.39049 4.22473 1.18013 4.40455 1.09606 4.65437C1.00958 4.91208 1.07238 5.19244 1.25974 5.3853L3.05447 7.23219L2.63033 9.84432C2.58572 10.1195 2.6969 10.3879 2.92098 10.5454C3.03766 10.6274 3.17286 10.6689 3.30875 10.6689C3.42097 10.6689 3.53318 10.6405 3.63647 10.5835L5.83133 9.35909L8.03819 10.5835C8.26605 10.7101 8.54023 10.6954 8.75334 10.5454C8.97742 10.3882 9.0886 10.1195 9.04399 9.84467L8.61985 7.23253L10.4146 5.38564C10.6019 5.19278 10.6647 4.91277 10.5783 4.65471L10.5779 4.65402Z"
              fill="#FFB703"
            />
          </svg>
        </span>
      </div>
      <div className="w-full bg-white h-[10px] rounded-[7px] relative col-span-9">
        <div
          className="h-full inset-0 rounded-[7px] absolute"
          style={{
            backgroundColor: color,
            width: `${((rating || 0) / (total !== 0 ? total : 1)) * 100}%`,
          }}
        ></div>
      </div>
      <div className="col-span-2 ms-1">
        <p className="whitespace-nowrap text-xs text-[#07C]">
          {rating} recenzii
        </p>
      </div>
    </div>
  );
};

export default Reviews;
