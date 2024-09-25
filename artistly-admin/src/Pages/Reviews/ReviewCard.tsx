import { useEffect, useState } from "react";
import { Review } from "../../Utils/types";
import { getDownloadURL, ref } from "firebase/storage";
import { imageDb } from "../../Utils/firebase";
import Rating from "./RatingStars";

type Props = {
  review: Review;
};

const ReviewCard = (props: Props) => {
  const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {
    const imagePath = `files/${props.review.clientHandle}/profilePictures/pp`;
    const imageRef = ref(imageDb, imagePath);

    getDownloadURL(imageRef)
      .then((url) => setImgUrl(url))
      .catch((error) =>
        console.error("Error fetching profile picture:", error)
      );
  }, []);
  return (
    <div className="bg-[#EEE] py-2 px-4 my-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <span className="inline-flex">
            <p className="font-medium">Nume:</p> {props.review.firstName}
          </span>
          <span className="inline-flex">
            <p className="font-medium">Prenume:</p> {props.review.lastName}
          </span>
          <span className="inline-flex">
            <p className="font-medium">Email:</p> {props.review.email}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <div
            style={{ backgroundImage: `url(${imgUrl})` }}
            className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
          />
          <div className="flex flex-col items-start ms-3 me-12">
            <span className="uppercase text-xs">{props.review.clientTag}</span>
            <span className="font-medium">{props.review.clientName}</span>
          </div>
          <button className="text-[#D90429] font-medium bg-[#DADADA] px-4 rounded-[20px] inline-flex items-center py-1">
            <svg
              className="mx-1"
              width="14"
              height="17"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8 3.4634L10.9836 2.83033L11.0499 2.54804C11.2461 1.71257 10.711 0.8767 9.85701 0.684774L6.98746 0.0397878C6.5751 -0.0529469 6.14941 0.017671 5.78882 0.238579C5.42827 0.459487 5.17754 0.803337 5.08278 1.20678L5.01647 1.48907L2.20007 0.855994C1.34017 0.66262 0.480385 1.18971 0.282907 2.03067L0.00963833 3.19414C-0.0128938 3.29007 0.00444153 3.39082 0.057851 3.4742C0.111223 3.55762 0.196306 3.61688 0.294362 3.63889L10.4355 5.9184H0.622557C0.515701 5.9184 0.413775 5.96249 0.34193 6.03982C0.270009 6.11719 0.234808 6.22058 0.244936 6.32467L1.35064 17.6773C1.42408 18.4313 2.06332 19 2.83761 19H4.96811H9.43482H11.5653C12.3396 19 12.9789 18.4314 13.0523 17.6773L14.117 6.74593L14.2728 6.78096C14.3014 6.78738 14.33 6.79046 14.3581 6.79046C14.5309 6.79046 14.6872 6.67416 14.7275 6.50238L15.0007 5.33891C15.0961 4.93283 15.0235 4.51365 14.7962 4.15859C14.569 3.80361 14.2151 3.55673 13.8 3.4634ZM12.2971 17.6069C12.261 17.978 11.9464 18.2578 11.5654 18.2578H9.43485H4.96815H2.83765C2.45661 18.2578 2.14203 17.978 2.10592 17.6069L1.03978 6.66061H13.3633L12.2971 17.6069ZM5.8222 1.37296C5.87159 1.16273 6.00276 0.98324 6.19156 0.867572C6.38031 0.751904 6.60248 0.714758 6.8176 0.763111L9.68711 1.40813C10.1334 1.50844 10.4131 1.94528 10.3105 2.38187L10.2442 2.66415L5.7559 1.65528L5.8222 1.37296ZM14.2614 5.17278L14.0731 5.97455L0.833995 2.99869L1.02233 2.19692C1.12615 1.7548 1.57843 1.4779 2.03021 1.57935L10.4439 3.47056C10.444 3.47056 10.444 3.4706 10.4441 3.4706C10.4441 3.4706 10.4441 3.4706 10.4442 3.4706L13.6302 4.18672C14.082 4.28833 14.3652 4.73066 14.2614 5.17278ZM9.65039 17.0896L10.1139 7.79265C10.1241 7.58792 10.3017 7.43069 10.5112 7.44008C10.7205 7.4501 10.8818 7.6241 10.8716 7.82883L10.4081 17.1258C10.3982 17.3244 10.2305 17.4788 10.0296 17.4788C10.0233 17.4788 10.0171 17.4787 10.0108 17.4784C9.80151 17.4684 9.64018 17.2943 9.65039 17.0896ZM3.99486 17.1258L3.53144 7.82879C3.52123 7.62407 3.68256 7.45006 3.89184 7.44004C4.10108 7.43062 4.27902 7.58788 4.28922 7.79261L4.75265 17.0896C4.76285 17.2943 4.60149 17.4683 4.39225 17.4784C4.38595 17.4787 4.37969 17.4788 4.37347 17.4788C4.17239 17.4788 4.00476 17.3244 3.99486 17.1258ZM6.82219 17.1077V7.81072C6.82219 7.60581 6.99205 7.43964 7.20152 7.43964C7.41098 7.43964 7.58085 7.60581 7.58085 7.81072V17.1077C7.58085 17.3126 7.41098 17.4788 7.20152 17.4788C6.99205 17.4788 6.82219 17.3126 6.82219 17.1077Z"
                fill="#D90429"
              />
            </svg>
            Sterge
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div className="inline-flex items-center">
          <span className="me-3 font-medium">{props.review.reviewTitle}</span>
          <Rating rating={props.review.rating} size={16} />
        </div>
        <span className="text-sm">{props.review.reviewBody}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
