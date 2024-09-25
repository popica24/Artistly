import { CSSProperties, useEffect, useState } from "react";
import { ClientCard } from "../../utils/types";
import { Link } from "react-router-dom";
import "./index.css";
import { getDownloadURL, ref } from "firebase/storage";
import { imageDb } from "../../utils/firebase";
import { useAuth } from "../../Contexts/AuthContext";
type Props = {
  client: ClientCard;
};
const RoundedArtistButton = (props: Props) => {
  const { currentUser } = useAuth();
  const [imgUrl, setImgUrl] = useState("");
  const [hover, setHover] = useState(false);
  const clientPicture = {
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: hover ? "120%" : "cover",
    backgroundPosition: "center",
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
    transform: "background-size 0.3s ease",
  };
  useEffect(() => {
    const imagePath = `files/${props.client.clientHandle}/profilePictures/pp`;
    const imageRef = ref(imageDb, imagePath);

    getDownloadURL(imageRef)
      .then((url) => setImgUrl(url))
      .catch((error) =>
        console.error("Error fetching profile picture:", error)
      );
  }, []);
  const shadow: CSSProperties = {
    boxShadow: hover
      ? "0px 0px 15px 0px rgba(0,0,0,0.25)"
      : "0px 2px 8px 0px rgba(0,0,0,0.15)",
    transition: "box-shadow 0.3s ease", // Add transition property
  };
  return (
    <Link
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      to={currentUser ? `${props.client?.clientHandle}` : "/login"}
      className="relative w-[165px] tablet:w-[130px] mx-[1.6rem] tablet:mx-[1rem] flex-shrink-0"
    >
      {imgUrl ? (
        <div
          style={clientPicture}
          className="absolute rounded-full left-[50%] -translate-x-[50%] -top-7 w-[4.5rem] h-[4.5rem] tablet:w-[4rem] tablet:h-[4rem]"
        />
      ) : (
        <div className="flex items-center justify-center absolute rounded-full left-[50%] -translate-x-[50%] -top-7 w-[4.5rem] h-[4.5rem] tablet:w-[4rem] tablet:h-[4rem] bg-[#FFC727]">
          <span className="uppercase font-semibold text-[2rem]">
            {props.client?.clientName[0]}
          </span>
        </div>
      )}
      <div
        className="bg-[#F3F3F3] rounded-[0.878rem] flex flex-col items-center justify-center"
        style={shadow}
      >
        <div className="flex flex-col items-center justify-center mb-5 mt-12 tablet:mt-11 tablet:mb-3">
          <span className="uppercase text-[#969696] text-[0.7rem]">
            {props.client.clientTag}
          </span>
          <span className="text-black font-semibold text-[0.8rem] text-center">
            {props.client.clientName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RoundedArtistButton;
