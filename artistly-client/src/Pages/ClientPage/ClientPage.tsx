import ClientHero from "./components/ClientHero";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";
import MediaPreview from "./components/MediaPreview";
import EventDetails from "./components/EventDetails";
import PriceDetails from "./components/PriceDetails";
import Contacts from "./components/Contacts";
import Reviews from "./components/Reviews";
import Buttons from "./components/Buttons";

const API_URL = import.meta.env.VITE_API_LOCAL_URL;

const ClientPage = () => {
  const clientHandle = useParams().urlPath;
  const { currentUser } = useAuth();

  const { data } = useQuery([clientHandle], async () => {
    const idToken = await currentUser?.getIdToken();
    const response = await axios.get(`${API_URL}client/${clientHandle}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  });

  return (
    <div className="max-w-[90vmin] xl:max-w-[790px] mx-auto mt-12">
      <Buttons id={clientHandle} />
      <ClientHero {...data} />
      <MediaPreview {...data} handle={clientHandle} />
      <EventDetails {...data} />
      <PriceDetails {...data} />
      <Contacts {...data} />
      <Reviews {...data} />
    </div>
  );
};

export default ClientPage;
