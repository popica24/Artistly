import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { imageDb } from "../../Utils/firebase";

type Props = {
  data: any;
};

const Result = (props: Props) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    getDownloadURL(
      ref(imageDb, `/files/${props.data.clientHandle}/profilePictures/pp`)
    ).then((url) => setUrl(url));
  }, []);
  return (
    <div className="bg-[#EEE] rounded-full flex flex-row items-center my-2 p-1 cursor-pointer hover:bg-[#354F52] hover:text-white transition-colors">
      <div
        className="rounded-full w-[40px] aspect-square bg-cover me-2"
        style={{ backgroundImage: `url(${url})` }}
      ></div>
      <div className="flex flex-col">
        <span>{props.data.clientTag}</span>
        <span className="font-medium">{props.data.clientName}</span>
      </div>
    </div>
  );
};

export default Result;
