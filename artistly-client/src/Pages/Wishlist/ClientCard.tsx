import { CSSProperties, FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDownloadURL, ref } from "firebase/storage";
import { ClientCard as ClientCardModel } from "../../utils/types";
import { useAuth } from "../../Contexts/AuthContext";
import { imageDb } from "../../utils/firebase";
import Rating from "../../components/RatingStars/Rating";
import Skeleton from "../../components/Skeleton/Skeleton";

type Props = {
  client: ClientCardModel;
  subcategoryId: string | undefined;
};

const ClientCard: FC<Props> = (props: Props) => {
  const [hover, setHover] = useState(false);
  const { currentUser } = useAuth();
  const [pp, setPP] = useState("");
  const [ppLoading, setPPLoading] = useState(true);
  useEffect(() => {
    setPPLoading(true);
    const imagePath = `files/${props.client.clientHandle}/profilePictures/pp`;
    const imageRef = ref(imageDb, imagePath);
    getDownloadURL(imageRef)
      .then((url) => {
        setPP(url);
        setPPLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
        setPPLoading(false);
      });
  }, [props.client.clientHandle]);
  const clientCardStyle: React.CSSProperties = {
    backgroundImage: `url(${pp}`,
  };
  const boxShadow: CSSProperties = {
    boxShadow: !hover
      ? "0px 1.26px 5.03px 0px rgba(0,0,0,0.15)"
      : "0px 0px 10px 0px rgba(0,0,0,0.25)",
    transition: "box-shadow 0.3s ease",
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={boxShadow}
      className="bg-[#EEE] tablet:rounded-[24.95px] rounded-[1.78381rem] w-full ps-[6rem] tablet:ps-0 relative pe-2 py-4 tablet:py-2 tablet:mb-14 mb-10 laptop:client-card laptop:min-h-[147px]"
    >
      <div className="flex-flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col laptop:justify-end items-center">
            <Link
              to={currentUser ? `/${props.client.clientHandle}` : "/login"}
              state={{ toRegister: false, fromRedirect: true }}
            >
              {pp && !ppLoading ? (
                <figure
                  style={clientCardStyle}
                  className="w-[110px] tablet:w-[80px] h-[110px] tablet:h-[80px] bg-center bg-cover rounded-xl absolute tablet:top-[5px] tablet:left-[20px] left-[-45px] top-[50%] -translate-y-[50%]"
                />
              ) : !pp && !ppLoading ? (
                <div className="flex items-center justify-center w-[110px] tablet:w-[80px] h-[110px] tablet:h-[80px] bg-[#FFC727] rounded-xl absolute tablet:top-[5px] tablet:left-[20px] left-[-45px] top-[50%] -translate-y-[50%]">
                  <span className="uppercase font-semibold text-[4rem]">
                    {props.client?.clientName[0]}
                  </span>
                </div>
              ) : (
                <Skeleton classes="w-[110px] tablet:w-[80px] h-[110px] tablet:h-[80px] rounded-xl absolute tablet:top-[5px] tablet:left-[20px] left-[-45px] top-[50%] -translate-y-[50%]" />
              )}
            </Link>

            <div className=" flex-row items-center rating-box font-medium ms-[1.4rem] tablet:flex mt-12 hidden">
              <span className="me text-[0.75rem] me-0.5">5/5</span>
              <Rating rating={props.client.clientRating!} size={10.5} />
            </div>
            <div className="tablet:flex hidden flex-row items-center justify-between w-full ms-[1.1rem] social-box my-2 max-w-[73.8px]">
              <Link to={props.client.facebook!}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M14.0259 7.35204C14.0259 3.50412 10.9073 0.385498 7.05932 0.385498C3.21139 0.385498 0.0927734 3.50412 0.0927734 7.35204C0.0927734 11.2 3.21139 14.3186 7.05932 14.3186C7.10014 14.3186 7.14096 14.3186 7.18178 14.3159V8.89502H5.68506V7.15067H7.18178V5.86621C7.18178 4.37765 8.0907 3.56671 9.4187 3.56671C10.0555 3.56671 10.6025 3.61297 10.7603 3.63474V5.19133H9.84594C9.1248 5.19133 8.98329 5.53421 8.98329 6.03765V7.14794H10.7113L10.4855 8.8923H8.98329V14.0492C11.8951 13.2137 14.0259 10.5333 14.0259 7.35204Z"
                    fill="#4F4F4F"
                  />
                </svg>
              </Link>
              <Link to={props.client.instagram!}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    d="M7.00664 3.77441C5.03104 3.77441 3.43164 5.37556 3.43164 7.34941C3.43164 9.325 5.03278 10.9244 7.00664 10.9244C8.98224 10.9244 10.5816 9.32326 10.5816 7.34941C10.5816 5.37381 8.98049 3.77441 7.00664 3.77441ZM7.00664 9.66984C5.72421 9.66984 4.6862 8.63125 4.6862 7.34941C4.6862 6.06756 5.7248 5.02897 7.00664 5.02897C8.28848 5.02897 9.32708 6.06756 9.32708 7.34941C9.32766 8.63125 8.28906 9.66984 7.00664 9.66984Z"
                    fill="#4F4F4F"
                  />
                  <path
                    d="M9.87682 0.429263C8.59498 0.369467 5.41997 0.37237 4.13697 0.429263C3.00954 0.482093 2.01507 0.754368 1.21334 1.5561C-0.126565 2.896 0.0446961 4.70149 0.0446961 7.34935C0.0446961 10.0593 -0.106246 11.823 1.21334 13.1426C2.55846 14.4871 4.39008 14.3112 7.0066 14.3112C9.69105 14.3112 10.6176 14.313 11.5668 13.9455C12.8573 13.4445 13.8315 12.2909 13.9267 10.219C13.9871 8.93656 13.9836 5.76214 13.9267 4.47914C13.8118 2.03331 12.4991 0.550017 9.87682 0.429263ZM11.9058 12.2561C11.0275 13.1345 9.8089 13.0561 6.98977 13.0561C4.08704 13.0561 2.92304 13.0991 2.0737 12.2474C1.09548 11.2738 1.27255 9.71042 1.27255 7.34006C1.27255 4.13255 0.943381 1.82257 4.16251 1.65769C4.90212 1.63157 5.11983 1.62286 6.98164 1.62286L7.00776 1.64028C10.1015 1.64028 12.5288 1.31633 12.6745 4.53487C12.7076 5.26926 12.7151 5.48987 12.7151 7.34877C12.7145 10.2178 12.7691 11.3888 11.9058 12.2561Z"
                    fill="#4F4F4F"
                  />
                  <path
                    d="M10.7231 4.46866C11.1845 4.46866 11.5585 4.09464 11.5585 3.63325C11.5585 3.17187 11.1845 2.79785 10.7231 2.79785C10.2617 2.79785 9.8877 3.17187 9.8877 3.63325C9.8877 4.09464 10.2617 4.46866 10.7231 4.46866Z"
                    fill="#4F4F4F"
                  />
                </svg>
              </Link>
              <Link to={props.client.youtube!}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 18 13"
                  fill="none"
                >
                  <path
                    d="M17.3576 2.29792C17.165 1.57578 16.6002 1.00653 15.884 0.812085C14.5757 0.451172 9.34209 0.451172 9.34209 0.451172C9.34209 0.451172 4.1087 0.451172 2.80033 0.798401C2.09792 0.992644 1.5194 1.57589 1.32674 2.29792C0.982422 3.61687 0.982422 6.35222 0.982422 6.35222C0.982422 6.35222 0.982422 9.10135 1.32674 10.4065C1.51961 11.1285 2.08414 11.6978 2.80043 11.8922C4.12247 12.2533 9.34229 12.2533 9.34229 12.2533C9.34229 12.2533 14.5757 12.2533 15.884 11.906C16.6003 11.7117 17.165 11.1424 17.3578 10.4204C17.7021 9.10135 17.7021 6.36611 17.7021 6.36611C17.7021 6.36611 17.7158 3.61687 17.3576 2.29792ZM7.67583 8.87922V3.82521L12.0278 6.35222L7.67583 8.87922Z"
                    fill="#4F4F4F"
                  />
                </svg>
              </Link>
              <Link to={props.client.tiktok!}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 15 17"
                  fill="none"
                >
                  <path
                    d="M14.639 4.39364C13.7325 4.39364 12.8962 4.09335 12.2246 3.58677C11.4543 3.00604 10.9009 2.15418 10.7054 1.17234C10.657 0.929748 10.631 0.679402 10.6285 0.422852H8.0391V7.49831L8.036 11.3739C8.036 12.41 7.36128 13.2885 6.42597 13.5975C6.15453 13.6872 5.86137 13.7297 5.55611 13.7129C5.16648 13.6915 4.80135 13.5739 4.484 13.3841C3.80865 12.9802 3.35077 12.2474 3.33836 11.4092C3.31882 10.0992 4.3779 9.03109 5.68703 9.03109C5.94544 9.03109 6.19361 9.07328 6.42597 9.14991V7.21601V6.52081C6.18089 6.48451 5.93148 6.46559 5.67927 6.46559C4.24637 6.46559 2.90623 7.06121 1.94827 8.13425C1.22422 8.94516 0.789919 9.97974 0.722912 11.0646C0.63512 12.4897 1.1566 13.8444 2.16791 14.844C2.3165 14.9907 2.47254 15.1269 2.63572 15.2525C3.50278 15.9198 4.56279 16.2815 5.67927 16.2815C5.93148 16.2815 6.18089 16.2629 6.42597 16.2266C7.46892 16.0721 8.43122 15.5947 9.19063 14.844C10.1238 13.9217 10.6394 12.6973 10.6449 11.394L10.6316 5.6066C11.0768 5.95001 11.5635 6.23417 12.0859 6.45473C12.8984 6.79752 13.7598 6.97125 14.6464 6.97094V5.0907V4.39302C14.6471 4.39364 14.6396 4.39364 14.639 4.39364Z"
                    fill="#4F4F4F"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-between items-start w-full pe-4 relative">
            <div className="flex flex-col justify-start tablet:ms-[20px]">
              <span className="uppercase text-[#969696] text-[0.72581rem] font-normal tablet:leading-3 -mb-1">
                {props.client.clientTag}
              </span>
              <span className="text-[#232323] font-medium text-[1.4rem] tablet:text-[1.1rem] whitespace-nowrap tablet:leading-8 mb-1">
                {props.client.clientName}
              </span>
              <span className="w-full text-[13px] leading-4 tracking-tight tablet:hidden">
                {props.client.clientDescription.length <= 130
                  ? props.client.clientDescription
                  : props.client.clientDescription.substring(0, 130) + "..."}
              </span>
              <span className="w-full text-[13px] leading-3 tracking-tight laptop:hidden">
                {props.client.clientDescription.length <= 78
                  ? props.client.clientDescription
                  : props.client.clientDescription.substring(0, 78) + "..."}
              </span>
              <div className="flex flex-row items-center tablet:hidden mt-3">
                <Link
                  to={currentUser ? `/${props.client.clientHandle}` : "/login"}
                  state={{ toRegister: false, fromRedirect: true }}
                  className="bg-white rounded-[1.41794rem] py-0.5 px-3 text-[0.8rem] tablet:hidden"
                >
                  Vezi profil
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start tablet:hidden">
              <div className="flex flex-row items-center rating-box font-medium ">
                <span className="me-1">{props.client.clientRating}/5</span>
                <Rating rating={props.client.clientRating!} size={14} />
              </div>
              <div className="flex flex-row items-center tablet:justify-center justify-between w-full px-2 social-box my-1">
                <Link to={props.client.facebook!}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M14.0259 7.35204C14.0259 3.50412 10.9073 0.385498 7.05932 0.385498C3.21139 0.385498 0.0927734 3.50412 0.0927734 7.35204C0.0927734 11.2 3.21139 14.3186 7.05932 14.3186C7.10014 14.3186 7.14096 14.3186 7.18178 14.3159V8.89502H5.68506V7.15067H7.18178V5.86621C7.18178 4.37765 8.0907 3.56671 9.4187 3.56671C10.0555 3.56671 10.6025 3.61297 10.7603 3.63474V5.19133H9.84594C9.1248 5.19133 8.98329 5.53421 8.98329 6.03765V7.14794H10.7113L10.4855 8.8923H8.98329V14.0492C11.8951 13.2137 14.0259 10.5333 14.0259 7.35204Z"
                      fill="#4F4F4F"
                    />
                  </svg>
                </Link>
                <Link to={props.client.instagram!}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <path
                      d="M7.00664 3.77441C5.03104 3.77441 3.43164 5.37556 3.43164 7.34941C3.43164 9.325 5.03278 10.9244 7.00664 10.9244C8.98224 10.9244 10.5816 9.32326 10.5816 7.34941C10.5816 5.37381 8.98049 3.77441 7.00664 3.77441ZM7.00664 9.66984C5.72421 9.66984 4.6862 8.63125 4.6862 7.34941C4.6862 6.06756 5.7248 5.02897 7.00664 5.02897C8.28848 5.02897 9.32708 6.06756 9.32708 7.34941C9.32766 8.63125 8.28906 9.66984 7.00664 9.66984Z"
                      fill="#4F4F4F"
                    />
                    <path
                      d="M9.87682 0.429263C8.59498 0.369467 5.41997 0.37237 4.13697 0.429263C3.00954 0.482093 2.01507 0.754368 1.21334 1.5561C-0.126565 2.896 0.0446961 4.70149 0.0446961 7.34935C0.0446961 10.0593 -0.106246 11.823 1.21334 13.1426C2.55846 14.4871 4.39008 14.3112 7.0066 14.3112C9.69105 14.3112 10.6176 14.313 11.5668 13.9455C12.8573 13.4445 13.8315 12.2909 13.9267 10.219C13.9871 8.93656 13.9836 5.76214 13.9267 4.47914C13.8118 2.03331 12.4991 0.550017 9.87682 0.429263ZM11.9058 12.2561C11.0275 13.1345 9.8089 13.0561 6.98977 13.0561C4.08704 13.0561 2.92304 13.0991 2.0737 12.2474C1.09548 11.2738 1.27255 9.71042 1.27255 7.34006C1.27255 4.13255 0.943381 1.82257 4.16251 1.65769C4.90212 1.63157 5.11983 1.62286 6.98164 1.62286L7.00776 1.64028C10.1015 1.64028 12.5288 1.31633 12.6745 4.53487C12.7076 5.26926 12.7151 5.48987 12.7151 7.34877C12.7145 10.2178 12.7691 11.3888 11.9058 12.2561Z"
                      fill="#4F4F4F"
                    />
                    <path
                      d="M10.7231 4.46866C11.1845 4.46866 11.5585 4.09464 11.5585 3.63325C11.5585 3.17187 11.1845 2.79785 10.7231 2.79785C10.2617 2.79785 9.8877 3.17187 9.8877 3.63325C9.8877 4.09464 10.2617 4.46866 10.7231 4.46866Z"
                      fill="#4F4F4F"
                    />
                  </svg>
                </Link>
                <Link to={props.client.youtube!}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="13"
                    viewBox="0 0 18 13"
                    fill="none"
                  >
                    <path
                      d="M17.3576 2.29792C17.165 1.57578 16.6002 1.00653 15.884 0.812085C14.5757 0.451172 9.34209 0.451172 9.34209 0.451172C9.34209 0.451172 4.1087 0.451172 2.80033 0.798401C2.09792 0.992644 1.5194 1.57589 1.32674 2.29792C0.982422 3.61687 0.982422 6.35222 0.982422 6.35222C0.982422 6.35222 0.982422 9.10135 1.32674 10.4065C1.51961 11.1285 2.08414 11.6978 2.80043 11.8922C4.12247 12.2533 9.34229 12.2533 9.34229 12.2533C9.34229 12.2533 14.5757 12.2533 15.884 11.906C16.6003 11.7117 17.165 11.1424 17.3578 10.4204C17.7021 9.10135 17.7021 6.36611 17.7021 6.36611C17.7021 6.36611 17.7158 3.61687 17.3576 2.29792ZM7.67583 8.87922V3.82521L12.0278 6.35222L7.67583 8.87922Z"
                      fill="#4F4F4F"
                    />
                  </svg>
                </Link>
                <Link to={props.client.tiktok!}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="17"
                    viewBox="0 0 15 17"
                    fill="none"
                  >
                    <path
                      d="M14.639 4.39364C13.7325 4.39364 12.8962 4.09335 12.2246 3.58677C11.4543 3.00604 10.9009 2.15418 10.7054 1.17234C10.657 0.929748 10.631 0.679402 10.6285 0.422852H8.0391V7.49831L8.036 11.3739C8.036 12.41 7.36128 13.2885 6.42597 13.5975C6.15453 13.6872 5.86137 13.7297 5.55611 13.7129C5.16648 13.6915 4.80135 13.5739 4.484 13.3841C3.80865 12.9802 3.35077 12.2474 3.33836 11.4092C3.31882 10.0992 4.3779 9.03109 5.68703 9.03109C5.94544 9.03109 6.19361 9.07328 6.42597 9.14991V7.21601V6.52081C6.18089 6.48451 5.93148 6.46559 5.67927 6.46559C4.24637 6.46559 2.90623 7.06121 1.94827 8.13425C1.22422 8.94516 0.789919 9.97974 0.722912 11.0646C0.63512 12.4897 1.1566 13.8444 2.16791 14.844C2.3165 14.9907 2.47254 15.1269 2.63572 15.2525C3.50278 15.9198 4.56279 16.2815 5.67927 16.2815C5.93148 16.2815 6.18089 16.2629 6.42597 16.2266C7.46892 16.0721 8.43122 15.5947 9.19063 14.844C10.1238 13.9217 10.6394 12.6973 10.6449 11.394L10.6316 5.6066C11.0768 5.95001 11.5635 6.23417 12.0859 6.45473C12.8984 6.79752 13.7598 6.97125 14.6464 6.97094V5.0907V4.39302C14.6471 4.39364 14.6396 4.39364 14.639 4.39364Z"
                      fill="#4F4F4F"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="laptop:hidden absolute right-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
