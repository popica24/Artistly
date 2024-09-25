import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useQuery } from "react-query";
import { imageDb } from "../../../utils/firebase";
import Skeleton from "react-loading-skeleton";
import PhotoPreview from "./PhotoPreview";

type Props = {
  handle: string;
  youtubeLinks: string[];
};

const MediaPreview = ({ youtubeLinks, handle }: Props) => {
  const { data, isLoading } = useQuery([handle, "media"], async () => {
    const refs = await listAll(ref(imageDb, `files/${handle}/media`));
    const urlPromises = refs.items.map((item) => {
      return getDownloadURL(item);
    });
    return await Promise.all(urlPromises);
  });

  if (isLoading || !data) {
    return (
      <div className="flex flex-row justify-evenly items-center overflow-x-scroll lg:overflow-x-visible mt-4">
        {[1, 2, 3, 4, 5, 6].map(() => (
          <Skeleton className="flex-shrink-0 bg-cover bg-no-repeat bg-center !h-[68px] !w-[120px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-evenly overflow-x-scroll lg:overflow-x-visible mt-4">
      {youtubeLinks &&
        youtubeLinks.map((i) => {
          const videoIDMatch = i.match(/[?&]v=([^&]+)/);
          const youtubeID = videoIDMatch ? videoIDMatch[1] : "";

          return (
            <iframe
              className="video flex-shrink-0 !h-[68px] !w-[120px] mx-1.5 lg:mx-0"
              title="Youtube player"
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              src={`https://youtube.com/embed/${youtubeID}?autoplay=0`}
              key={youtubeID}
            ></iframe>
          );
        })}

      {data && data.length > 0 && <PhotoPreview data={data} />}
    </div>
  );
};

export default MediaPreview;
