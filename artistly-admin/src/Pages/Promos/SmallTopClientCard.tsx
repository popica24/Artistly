import { CSSProperties, useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";

import { Link } from "react-router-dom";
import { imageDb } from "../../Utils/firebase";
import { ClientCard } from "../../Utils/types";
type Props = {
  client: ClientCard;
};
const SmallClientCard = (props: Props) => {
  const [imgUrl, setImgUrl] = useState("");
  const [hover, setHover] = useState(false);
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    const imagePath = `files/${props.client.clientHandle}/profilePictures/pp`;
    const coverPath = `files/${props.client.clientHandle}/coverPictures/cover`;
    const imageRef = ref(imageDb, imagePath);
    const coverRef = ref(imageDb, coverPath);

    getDownloadURL(imageRef)
      .then((url) => setImgUrl(url))
      .catch((error) =>
        console.error("Error fetching profile picture:", error)
      );
    getDownloadURL(coverRef)
      .then((url) => setCoverUrl(url))
      .catch((error) =>
        console.error("Error fetching profile picture:", error)
      );
  }, []);
  const coverStyle: CSSProperties = {
    backgroundImage: `url(${coverUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "1.5085rem 1.5085rem 0 0",
  };
  const buttonStyle: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  const containerStyle: CSSProperties = {
    boxShadow: hover
      ? "0px 0px 10px 0px rgba(0,0,0,0.25)"
      : "0px 1.26px 5.03px 0px rgba(0,0,0,0.15)",
    transition: "box-shadow 0.3s ease",
  };
  const profilePicStyle: CSSProperties = {
    backgroundImage: `url(${imgUrl})`,

    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "3.8rem",
    height: "3.8rem",
  };
  const profilePicPlaceholder: CSSProperties = {
    width: "5rem",
  };
  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-[#F3F3F3] rounded-[1.5085rem] tablet:max-w-[90vmin] w-[185px] flex flex-col justify-center items-center pb-4 relative h-full shadow-md tablet:shadow-none cursor-pointer
      tablet:min-h-[300px]
      "
    >
      <div className="leading-4 font-medium pb-4 h-full w-full">
        <div style={coverStyle} className="h-[80px] w-full tablet:h-[150px]" />

        <div className="flex flex-row items-end justify-start pb-2 px-4">
          <div
            className="absolute rounded-full left-[20px] border-[4px] border-[#F3F3F3]"
            style={profilePicStyle}
          ></div>
          <div style={profilePicPlaceholder} />
          <div className="flex flex-col items-start mb-[3.5px] my-1 ms-0.25">
            <span className="text-[#969696] font-medium uppercase text-[0.525rem] tablet:text-[0.725rem] leading-3">
              {props.client.clientTag}
            </span>
            <span className="font-medium text-[1.15rem] leading-4 whitespace-nowrap">
              {props.client.clientName}
            </span>
          </div>
        </div>
        <div className="ps-8">
          <span className="text-[#2D3047] text-[0.675rem]">
            {props.client.clientDescription}
          </span>
        </div>
      </div>
      <Link
        to={props.client.clientHandle}
        className="tablet:hidden rounded-[1.19906rem] bg-[#FFF] px-5 py-[0.18rem] text-[12px] font-medium hover:bg-[#354F52] hover:text-white"
        style={buttonStyle}
      >
        Vezi profil
      </Link>
    </div>
  );
};

export default SmallClientCard;
