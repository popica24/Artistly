import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { imageDb } from "../../Utils/firebase";

type Props = { client: any };

const OwnedPage = (props: Props) => {
  const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {
    const imagePath = `files/${props.client.clientId}/profilePictures/pp`;
    const imageRef = ref(imageDb, imagePath);

    getDownloadURL(imageRef)
      .then((url) => setImgUrl(url))
      .catch((error) =>
        console.error("Error fetching profile picture:", error)
      );
  }, []);
  return (
    <div className="flex flex-row justify-between items-center my-2">
      <div className="flex flex-row items-center">
        <img src={imgUrl} width={90} className="rounded-full" />
        <div className="flex flex-col items-start my-4 ms-5">
          <div className="uppercase leading-3 text-[14px]">
            {props.client.clientTag}
          </div>
          <div className="font-semibold text-[25px]">
            {props.client.clientName}
          </div>
        </div>
      </div>
      <button className="text-red-600 font-medium bg-[#d3d2d2] px-4 py-0.5 rounded-[30px]">
        Sterge
      </button>
    </div>
  );
};

export default OwnedPage;
