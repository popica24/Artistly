import Skeleton from "react-loading-skeleton";

import { CiCirclePlus } from "react-icons/ci";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getPages } from "../../../services/usersService";
import { useAuth } from "../../../Contexts/AuthContext";
import PageCard from "./components/PageCard";

const AccountPages = () => {
  const { currentUser } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["user-pages"],
    queryFn: async () => {
      if (!currentUser) return;
      const idToken = await currentUser.getIdToken();
      return await getPages(idToken, currentUser.uid);
    },
  });
  return (
    <div className="bg-[#EEEEEE] py-10 rounded-xl px-2 xl:px-20 shadow-xl max-w-[90vmin] mx-auto md:max-w-none">
      {isLoading ? (
        <Skeleton count={3} />
      ) : (
        data?.map((card) => (
          <PageCard
            handler={card.clientHandle}
            approved={card.listed}
            category={card.clientTag}
            name={card.clientName}
          />
        ))
      )}
      <div className="bg-white drop-shadow-default py-4 px-6 rounded-xl relative mt-6">
        <div className="flex flex-row items-center justify-startl mx-3">
          <CiCirclePlus size={30} />
          <Link to={"create"}>
            <span className="text-lg ms-4">Creeaza pagina noua</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountPages;
