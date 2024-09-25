import { CSSProperties, useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { Link } from "react-router-dom";
import { ClientCard } from "../../Utils/types";
import { imageDb } from "../../Utils/firebase";

type Props = {
  client: ClientCard;
};

const BigTopClientCard = (props: Props) => {
  console.log(props.client);

  const [imgUrl, setImgUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [hover, setHover] = useState(false);
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
  const containerStyle: CSSProperties = {
    boxShadow: hover
      ? "0px 0px 10px 0px rgba(0,0,0,0.25)"
      : "0px 1.26px 5.03px 0px rgba(0,0,0,0.15)",
    transition: "box-shadow 0.3s ease",
  };
  const buttonStyle: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  const coverStyle: CSSProperties = {
    backgroundImage: `url(${coverUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "1.50894rem 0rem 0rem 1.50894rem",
    width: "200px",
    height: "200px",
  };
  const profilePicStyle: CSSProperties = {
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "4rem",
    height: "4rem",
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-[#F3F3F3] rounded-[1.50894rem] flex flex-row justify-start items-center cursor-pointer
      w-[490px]
      "
      style={containerStyle}
    >
      <div style={coverStyle} />
      <div className="flex flex-col items-start justify-start ps-8">
        <div className="flex flex-row items-center justify-center">
          <div className="rounded-full" style={profilePicStyle}></div>
          <div className="flex flex-col items-start justify-start ms-2">
            <span className="text-[#969696] font-medium uppercase text-[0.525rem] leading-5">
              {props.client.clientTag}
            </span>
            <span className="font-medium text-[1.15rem] leading-4">
              {props.client.clientName}
            </span>
          </div>
        </div>
        <span className="max-w-[40ch] text-[0.75rem] font-medium pb-12 pt-6">
          {props.client.clientDescription}
        </span>
        <Link
          to={props.client.clientHandle}
          className="rounded-[1.19906rem] bg-[#FFF] px-5 py-[0.18rem] text-[12px] font-medium hover:bg-[#354F52] hover:text-white"
          style={buttonStyle}
        >
          Vezi profil
        </Link>
      </div>
    </div>
  );
};

export default BigTopClientCard;
