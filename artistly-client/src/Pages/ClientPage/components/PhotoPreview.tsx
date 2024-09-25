import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Props = {
  data: string[];
};

const PhotoPreview = ({ data }: Props) => {
  const [selectedPhoto, setSelectedPhoto] = useState(-1);
  return (
    <>
      {data.map((url, i) => (
        <div
          onClick={() => setSelectedPhoto(i)}
          key={url}
          style={{
            backgroundImage: `url(${url})`,
          }}
          className="flex-shrink-0 bg-cover bg-no-repeat bg-center !h-[68px] !w-[120px] mx-1.5 lg:mx-0"
        />
      ))}
      <Lightbox
        open={selectedPhoto != -1}
        index={selectedPhoto}
        close={() => setSelectedPhoto(-1)}
        slides={data?.map((p) => {
          return {
            src: p,
          };
        })}
      />
    </>
  );
};

export default PhotoPreview;
