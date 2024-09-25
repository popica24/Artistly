import Skeleton from "react-loading-skeleton";
import { imageDb } from "../../../../utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

type Props = {
  approved: boolean;
  category: string;
  name: string;
  handler: string;
};

const PageCard = (props: Props) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const getProfilePicture = async () => {
    const photoRef = ref(
      imageDb,
      `files/${props.handler}/profile-picture.jpeg`
    );
    const url = await getDownloadURL(photoRef);
    setPhoto(url);
  };
  useEffect(() => {
    getProfilePicture();
  }, []);
  return (
    <div className="bg-white drop-shadow-default py-4 lg:px-6 px-3 rounded-xl relative mb-6">
      {props.approved && (
        <div className="absolute right-3 top-3 lg:right-12 lg:top-6 cursor-pointer">
          <svg
            width="23"
            height="29"
            viewBox="0 0 23 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1014 5.28624L16.7949 4.31997L16.8963 3.88911C17.1963 2.61393 16.378 1.33812 15.0722 1.04518L10.6844 0.0607287C10.0539 -0.0808136 9.40298 0.0269715 8.85161 0.364147C8.30029 0.701323 7.9169 1.22615 7.77201 1.84193L7.67062 2.27279L3.3641 1.30652C2.04924 1.01137 0.73455 1.81588 0.432588 3.09944L0.0147378 4.87527C-0.0197157 5.02168 0.00679148 5.17545 0.0884591 5.30272C0.170069 5.43005 0.300169 5.5205 0.450105 5.55409L15.9568 9.03335H0.951944C0.788551 9.03335 0.632697 9.10064 0.52284 9.21867C0.412868 9.33677 0.359041 9.49457 0.374528 9.65344L2.06525 26.9811C2.17754 28.1321 3.155 29 4.33895 29H7.59666H14.4266H17.6844C18.8683 29 19.8458 28.1321 19.9581 26.9811L21.5861 10.2964L21.8244 10.3499C21.8681 10.3597 21.9118 10.3644 21.9548 10.3644C22.2191 10.3644 22.4579 10.1869 22.5196 9.92469L22.9374 8.14886C23.0833 7.52906 22.9722 6.88926 22.6246 6.34733C22.2772 5.80551 21.7361 5.42869 21.1014 5.28624ZM18.8033 26.8737C18.7481 27.4401 18.2671 27.8672 17.6844 27.8672H14.4267H7.59672H4.33901C3.75637 27.8672 3.27535 27.4401 3.22014 26.8737L1.58991 10.1662H20.4336L18.8033 26.8737ZM8.90265 2.09556C8.97817 1.7747 9.17874 1.50073 9.46742 1.32419C9.75604 1.14764 10.0958 1.09095 10.4247 1.16475L14.8124 2.14926C15.4949 2.30235 15.9225 2.96912 15.7657 3.63548L15.6643 4.06634L8.80126 2.52648L8.90265 2.09556ZM21.8069 7.89529L21.5189 9.11904L1.27525 4.57694L1.56323 3.35319C1.72199 2.67838 2.41355 2.25574 3.10436 2.41059L15.9697 5.29717C15.9697 5.29717 15.9698 5.29723 15.9699 5.29723C15.9699 5.29723 15.97 5.29723 15.97 5.29723L20.8417 6.39026C21.5327 6.54534 21.9656 7.22048 21.8069 7.89529ZM14.7563 26.0842L15.4649 11.894C15.4806 11.5816 15.7521 11.3416 16.0726 11.3559C16.3926 11.3712 16.6393 11.6368 16.6237 11.9493L15.9149 26.1394C15.8998 26.4424 15.6434 26.6782 15.3361 26.6782C15.3266 26.6782 15.317 26.6779 15.3074 26.6775C14.9874 26.6623 14.7407 26.3966 14.7563 26.0842ZM6.10849 26.1394L5.39987 11.9492C5.38427 11.6367 5.63096 11.3711 5.95096 11.3559C6.2709 11.3415 6.54299 11.5815 6.55859 11.894L7.26721 26.0841C7.28281 26.3966 7.03607 26.6622 6.71613 26.6775C6.7065 26.6779 6.69693 26.6782 6.68741 26.6782C6.37994 26.6782 6.12363 26.4424 6.10849 26.1394ZM10.4317 26.1118V11.9216C10.4317 11.6089 10.6915 11.3552 11.0117 11.3552C11.332 11.3552 11.5918 11.6089 11.5918 11.9216V26.1118C11.5918 26.4245 11.332 26.6782 11.0117 26.6782C10.6915 26.6782 10.4317 26.4245 10.4317 26.1118Z"
              fill="#D90429"
            />
          </svg>
        </div>
      )}
      <div className="grid grid-cols-10 lg:grid-cols-12 items-center">
        <div className="col-span-2 lg:col-span-1">
          {photo ? (
            <div
              className="bg-cover bg-center w-[55px] aspect-square rounded-full"
              style={{ backgroundImage: `url(${photo})` }}
            />
          ) : (
            <Skeleton
              style={{
                aspectRatio: "1/1",
                width: "52px",
                borderRadius: "9999px",
              }}
            />
          )}
        </div>
        <div className="col-span-8 lg:col-span-10">
          <div className="flex flex-col items-start justify-startl mx-3">
            <span className="uppercase text text-xs text-[#969696]">
              {props.category}
            </span>
            <span className="text-lg">{props.name}</span>
          </div>
        </div>
      </div>
      {!props.approved && (
        <div className="grid grid-cols-12 mt-3">
          <div className="col-span-12 lg:col-span-10">
            <div className="bg-[#FFECB7] drop-shadow-default px-3 py-1 rounded-md text-xs lg:text-base ">
              <p>
                Profilul este in proces de verificare. Va fi vizibil in cel mai
                scurt timp
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageCard;
