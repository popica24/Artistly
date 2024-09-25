import { Page } from "../../Utils/types";
import OwnedPage from "./OwnedPage";

type Props = { client: Page };

const SmallPageCard = (props: Props) => {
  return (
    <div className="flex flex-col bg-[#EEE] rounded-xl px-8 py-4 my-5">
      <div className="text-[20px]">Email: {props.client.email}</div>
      {props.client.pages?.map((page: any, i) => (
        <OwnedPage client={page} key={i} />
      ))}
    </div>
  );
};

export default SmallPageCard;
