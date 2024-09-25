import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useQuery } from "react-query";
import { Review } from "../../Utils/types";
import { get } from "../../Services/repoService";
import RequestedReviewCard from "./RequestedReviewCard";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [pageIndex] = useState(1);
  const { currentUser } = useAuth();
  const [requestSelected, setRequestSelected] = useState(false);
  const { data: reviews } = useQuery<Array<Review> | undefined>(
    [`list${requestSelected ? "-requested" : ""}-reviews`],
    () =>
      currentUser
        ?.getIdToken(false)
        .then((idToken) =>
          get(
            `list${
              requestSelected ? "-requested" : ""
            }-reviews?pageIndex=${pageIndex}`,
            idToken
          )
        ),
    {
      cacheTime: 10 * 15 * 1000,
      refetchInterval: 10 * 5 * 1000,
    }
  );
  return (
    <div className="mx-24">
      <div className="grid grid-cols-2 w-full">
        <div
          onClick={() => setRequestSelected(false)}
          className={`${
            requestSelected ? "bg-[#EEE]" : "bg-[#354F52] text-white"
          } col-span-1 text-center py-2`}
        >
          Review
        </div>
        <div
          onClick={() => setRequestSelected(true)}
          className={`${
            !requestSelected ? "bg-[#EEE]" : "bg-[#354F52] text-white"
          } col-span-1 text-center py-2`}
        >
          Request Review
        </div>
      </div>
      <div className="flex flex-col mx-24">
        {requestSelected
          ? reviews?.map((review, i) => (
              <RequestedReviewCard review={review} key={i} />
            ))
          : reviews?.map((review, i) => <ReviewCard review={review} key={i} />)}
      </div>
    </div>
  );
};

export default Reviews;
