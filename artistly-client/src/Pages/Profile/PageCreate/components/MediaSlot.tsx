import { useState } from "react";
import {
  FieldArrayWithId,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { PageCreateInputs } from "./Inputs";

type Props = {
  innerKey: string;
  index: number;
  register: UseFormRegister<PageCreateInputs>;
  field: FieldArrayWithId<PageCreateInputs, "mediaSlots", "id">;
  setValue: UseFormSetValue<PageCreateInputs>;
  value: any;
};

const MediaSlot = (props: Props) => {
  const [selected, setSelected] = useState(false);
  const [youtubeSelected, setYoutubeSelected] = useState(false);
  const [youtubeLinkInput, setYoutubeLinkInput] = useState("");

  const handleSetYoutubeLink = () => {
    // Set the value in the form when "Incarca link" is clicked
    props.setValue(`mediaSlots.${props.index}.youtubeLink`, youtubeLinkInput);
    setYoutubeSelected(false);
    setSelected(false);
  };
  if (props.value.image) {
    return (
      <div
        className="w-[250px] aspect-video bg-center bg-cover my-3 rounded-[.625rem]"
        style={{
          backgroundImage: `url(${URL.createObjectURL(props.value.image[0])})`,
        }}
      ></div>
    );
  }
  if (props.value.youtubeLink) {
    return <>youtube link</>;
  }
  return (
    <>
      {selected && (
        <>
          <div className="absolute z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {youtubeSelected ? (
              <>
                <div className="bg-white inline-flex items-center py-2.5 shadow-md rounded-full">
                  <FaYoutube color="#F61C0D" size={25} className="mx-4" />
                  <input
                    placeholder="https://www.youtube.com/watch?v=BrT_kufYoFQ&list"
                    type="text"
                    id={`youtube-${props.index}`}
                    key={props.innerKey}
                    value={youtubeLinkInput}
                    onChange={(e) => setYoutubeLinkInput(e.target.value)}
                    className="w-[400px] text-sm"
                  />
                </div>
                <div className="inline-flex items-center justify-evenly w-full mt-5">
                  <span
                    className="bg-white rounded-full shadow-lg px-7 py-2.5 cursor-pointer hover:bg-[#354F52] hover:text-white transition-colors"
                    onClick={() => {
                      setYoutubeSelected(false);
                      setSelected(false);
                    }}
                  >
                    Renunță
                  </span>
                  <span
                    onClick={handleSetYoutubeLink}
                    className="bg-white rounded-full shadow-lg px-7 py-2.5 cursor-pointer hover:bg-[#354F52] hover:text-white transition-colors"
                  >
                    Incarca link
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col">
                <label
                  htmlFor={`file-${props.index}`}
                  className="bg-white hover:bg-[#354F52] hover:text-white cursor-pointer w-72 text-center inline-flex items-center justify-center py-1.5 rounded-full shadow-lg mb-4 transition-colors"
                >
                  <MdOutlineAddPhotoAlternate color="#0077CC" size={25} />
                  <p className="text-lg ms-2">Incarca fisier media</p>
                </label>
                <span
                  onClick={() => setYoutubeSelected(true)}
                  className="bg-white hover:bg-[#354F52] hover:text-white cursor-pointer w-72 text-center inline-flex items-center justify-center py-1.5 rounded-full shadow-lg
                   transition-colors"
                >
                  <FaYoutube color="#F61C0D" size={25} />
                  <p className="text-lg ms-2">Incarca clip Youtube</p>
                </span>
                <input
                  id={`file-${props.index}`}
                  className="hidden"
                  type="file"
                  key={props.innerKey}
                  {...props.register(
                    `mediaSlots.${props.index}.image` as const
                  )}
                />
              </div>
            )}
          </div>
        </>
      )}
      <div
        onClick={() => setSelected(true)}
        className="w-[175px] md:w-[250px] aspect-video bg-white hover:bg-slate-200 cursor-pointer my-3 rounded-[.625rem] relative"
      >
        <div className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
          <MdOutlineAddPhotoAlternate size={40} />
        </div>
      </div>
    </>
  );
};

export default MediaSlot;
