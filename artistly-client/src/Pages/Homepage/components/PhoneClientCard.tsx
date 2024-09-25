import { CSSProperties, useEffect, useState } from "react";
import { ClientCard } from "../../../utils/types";
import { imageDb } from "../../../utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { Link } from "react-router-dom";

type Props = {
  client: ClientCard;
};

const PhoneClientCard = (props: Props) => {
  const [imgUrl, setImgUrl] = useState("");
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
    borderRadius: "1.5085rem 0 0 1.5085rem",
    width: "140px",
    height: "160px",
  };
  const profilePicStyle: CSSProperties = {
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "4rem",
    height: "4rem",
  };
  return (
    <Link
      to={props.client.clientHandle}
      className="w-full max-w-[90vmin] h-full bg-[#EEE] rounded-[1.5085rem] flex-grow-0"
    >
      <div className="flex flex-row items-top justify-center">
        <div className="relative">
          <div style={coverStyle} className="flex-shrink-0" />
          <div
            style={profilePicStyle}
            className="absolute rounded-full left-[100%] -translate-x-[50%] top-[7%] border-[3.5px] border-[#F3F3F3]"
          />
        </div>
        <div className="rounded-[1.5085rem] flex flex-col justify-center items-start bg-[#EEE] w-full h-full">
          <div className="flex flex-col mt-10 ps-2">
            <span className="ms-7 uppercase text-[0.6rem] text-[#969696]">
              {props.client.clientTag}
            </span>
            <span className="ms-7 leading-3 font-medium">
              {props.client.clientName}
            </span>
            <span className="text-xs mt-4 px-1">
              {props.client.clientDescription.length > 90
                ? props.client.clientDescription.substring(0, 90) + "..."
                : props.client.clientDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhoneClientCard;
