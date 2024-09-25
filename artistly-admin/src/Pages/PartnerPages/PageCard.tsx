import { useEffect, useState } from "react";
import { Page } from "../../Utils/types";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { imageDb } from "../../Utils/firebase";

type Props = {
  client: Page;
  approvePage: (clientId: string) => void;
  dismissPage: (clientId: string) => void;
};

const PageCard = (props: Props) => {
  const [imgUrl, setImgUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [images, setImages] = useState([""]);
  const [expaneded, setExpanded] = useState(false);
  useEffect(() => {
    const imagePath = `files/${props.client.clientId}/profile-picture.jpeg`;
    const coverPath = `files/${props.client.clientId}/cover-picture.jpeg`;
    const imageRef = ref(imageDb, imagePath);
    const coverRef = ref(imageDb, coverPath);

    getDownloadURL(imageRef)
      .then((url) => setImgUrl(url))
      .catch((error) =>
        console.error("Error fetching profile picture:", error)
      );
    getDownloadURL(coverRef)
      .then((url) => setCoverUrl(url))
      .catch((error) => console.error("Error fetching cover picture:", error));
  }, []);
  const fetchData = async () => {
    try {
      const images = await listAll(
        ref(imageDb, `files/${props.client.clientId}/media`)
      );

      const imageUrls = await Promise.all(
        images.items.map((imgRef) => getDownloadURL(imgRef))
      );

      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-[#EEE] text-[20px] px-8 py-4 my-4 rounded-md">
      <div className="grid grid-cols-5 border-b-2 border-black pb-4">
        <div className="col-span-2">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center">
              <span>Nume : {props.client.firstName}</span>
              <span className="ms-7">Prenume : {props.client.lastName}</span>
            </div>
            <span className="my-3">Email : {props.client.email}</span>
            <span className="flex">
              Newsletter:
              {props.client.newsletterActive ? (
                <p className="ms-4 text-green-400">ACTIV</p>
              ) : (
                <p className="ms-4 text-red-400">INACTIV</p>
              )}
            </span>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col items-start">
            <span>Telefon : {props.client.phoneNumber}</span>

            <span className="font-medium my-3">
              Status : {props.client.status}
            </span>
            <span className="font-medium">
              Categorie : {props.client.categories}
            </span>
          </div>
        </div>

        <div className="flex flex-col h-full justify-between">
          <button
            className="bg-green-600"
            onClick={() => props.approvePage(props.client.clientId!)}
          >
            Approve
          </button>
          <button
            className="bg-red-600"
            onClick={() => props.dismissPage(props.client.clientId!)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col items-start">
          <span className="flex flex-col w-full mb-16">
            <div
              className="w-full h-[210px] bg-cover bg-no-repeat bg-center rounded-[10px] my-4 relative"
              style={{ backgroundImage: `url(${coverUrl})` }}
            >
              <div className="absolute -bottom-16 left-16 flex flex-row items-end w-full">
                <img
                  src={imgUrl}
                  className="w-[130px] aspect-square rounded-[30px] border-[6px] border-white "
                />
                <div className="flex flex-row items-center w-full justify-between">
                  <span className="text-[34px] pb-3 ps-3  font-medium tracking-wide">
                    {props.client.name}
                  </span>
                  <span
                    className="cursor-pointer me-16"
                    onClick={() => setExpanded(!expaneded)}
                  >
                    SAGEATA
                  </span>
                </div>
              </div>
            </div>
          </span>
          {expaneded && (
            <div>
              <span>Categorie : {props.client.categories}</span>
              <div className="flex flex-row items-center">
                {images.map((img, i) => (
                  <div className="me-2 max-h-[140px]" key={i}>
                    <img src={img} className="w-[200px]" alt="" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-12 my-4">
                <div className="col-span-2 font-medium">Descriere:</div>
                <div className="col-span-10">{props.client.description}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-3 font-medium">Detalii eveniment:</div>
                <div className="col-span-9">{props.client.eventDetails}</div>
              </div>
              <div className="flex flex-row my-4">
                <span className="font-medium me-2">Tarife:</span>
                <div className="flex flex-col">
                  {props.client.prices.map((price, i) => {
                    return (
                      <div className="grid grid-cols-12 gap-x-4 mb-4" key={i}>
                        <div className="col-span-2 flex flex-col items-center">
                          <span className="font-medium">{price.price}</span>
                          <span className="font-medium">{price.title}</span>
                        </div>
                        <div className="col-span-10">
                          <span>{price.description}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-12 gap-x-8">
                <div className="col-span-2">
                  <span className="font-medium whitespace-nowrap">
                    Date contact:
                  </span>
                </div>
                <div className="col-span-10 flex flex-col">
                  <span>Nume : {props.client.contactName}</span>
                  <span>Telefon : {props.client.contactNumber}</span>
                  <span>Email : {props.client.contactEmail}</span>
                  <span>Locatie : {props.client.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageCard;
