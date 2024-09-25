import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import { post } from "../../Services/repoService";
import { Review } from "../../Utils/types";
import Rating from "./RatingStars";

type Props = {
  review: Review;
};

const RequestedReviewCard = (props: Props) => {
  const { currentUser } = useAuth();
  const handleReviewApprove = async (reviewId: number | undefined | null) => {
    try {
      const idToken = await currentUser?.getIdToken();
      await post("approve-review/" + reviewId, idToken);
      toast.success("Review aprobat cu succes !");
    } catch (exception: any) {
      toast.error("Eroare la aprobarea reviewului" + exception);
    }
  };

  const handleReviewDeny = async (reviewId: number | undefined | null) => {
    try {
      const idToken = await currentUser?.getIdToken();
      await post("deny-review/" + reviewId, idToken);
      toast.success("Review eliminat cu succes !");
    } catch (exception: any) {
      toast.error("Eroare la eliminarea reviewului" + exception);
    }
  };

  return (
    <div className="bg-[#EEE] rounded-md my-4 py-3 px-4">
      <div className="grid grid-cols-5">
        <div className="col-span-2">
          <div className="flex flex-col items-start justify-between h-full">
            <div className="flex flex-col items-start">
              <span>Nume: {props.review.firstName}</span>
              <span className="my-1">Prenume: {props.review.lastName}</span>
              <span>Email: {props.review.email}</span>
            </div>
            <div className="flex flex-row justify-evenly w-full">
              <button
                className="bg-green-500 px-9 py-1.5 rounded-[5px]"
                onClick={() => handleReviewApprove(props.review.reqId)}
              >
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.65836 15.4714C7.46745 15.6634 7.20698 15.7705 6.93641 15.7705C6.66584 15.7705 6.40537 15.6634 6.21446 15.4714L0.448765 9.70474C-0.149588 9.10638 -0.149588 8.13612 0.448765 7.53889L1.17072 6.81675C1.76926 6.21839 2.7384 6.21839 3.33675 6.81675L6.93641 10.4166L16.6632 0.68961C17.2617 0.0912564 18.2318 0.0912564 18.8292 0.68961L19.5512 1.41175C20.1495 2.0101 20.1495 2.98018 19.5512 3.5776L7.65836 15.4714Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                className="bg-red-500 px-9 py-1.5 rounded-[5px]"
                onClick={() => handleReviewDeny(props.review.reqId)}
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_3759_1624)">
                    <path
                      d="M1.61152 15.8998C1.19473 15.9226 0.784827 15.7922 0.468255 15.536C-0.156085 14.9449 -0.156085 13.9902 0.468255 13.3991L14.1393 0.532244C14.7886 -0.0396496 15.8076 -0.00785834 16.4152 0.603313C16.9647 1.15599 16.9967 2.00547 16.4902 2.59339L2.73866 15.536C2.42617 15.7885 2.02285 15.9186 1.61152 15.8998Z"
                      fill="white"
                    />
                    <path
                      d="M15.2665 15.8998C14.8441 15.8981 14.4392 15.7403 14.1393 15.4603L0.468248 2.59337C-0.110172 1.95765 -0.0315325 1.00091 0.643926 0.456468C1.24679 -0.0294346 2.1359 -0.0294346 2.73871 0.456468L16.4903 13.3234C17.1395 13.8954 17.173 14.8545 16.5653 15.4655C16.5411 15.4898 16.5161 15.5133 16.4903 15.5361C16.1535 15.8117 15.7104 15.9434 15.2665 15.8998Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3759_1624">
                      <rect width="17" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3 ps-5 border-l border-[#7C7C7C]">
          <div className="flex flex-col items-start">
            <span className="uppercase text-[10px]">
              {props.review.clientTag}
            </span>
            <span className="text-[18px] leading-5">
              {props.review.clientName}
            </span>
            <Rating rating={props.review.rating} size={18} />
            <span>{props.review.reviewTitle}</span>
            <span>{props.review.reviewBody}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedReviewCard;
