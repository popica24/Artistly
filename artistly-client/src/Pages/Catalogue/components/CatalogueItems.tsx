import { useSearchParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import CatalogueCard from "./CatalogueCard";
import { categories } from "../../../data/data";
import MobileFilter from "./MobileFilter";
import { useFilter } from "../../../Contexts/CatalogueFilterContext";

const CatalogueItems = () => {
  const { items } = useFilter();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("subcategory");

  const subcategories = categories.find((c) =>
    c.subcategories.find((s) => s.subcategoryId === category)
  )?.subcategories;

  return (
    <>
      <div className="lg:mb-6 hidden lg:block">
        <BackButton />
      </div>
      <div className="pt-8 px-4 bg-[#FAEDCD] md:justify-center flex flex-row items-center overflow-x-scroll lg:overflow-auto md:flex-wrap lg:pt-0 lg:bg-white lg:px-0">
        {subcategories &&
          subcategories.map((s) => (
            <span
              onClick={() =>
                category !== s.subcategoryId &&
                setSearchParams(
                  (params) => {
                    params.set("subcategory", s.subcategoryId);
                    return params;
                  },
                  { replace: true }
                )
              }
              className={`${
                s.subcategoryId === category
                  ? "bg-[#354F52] text-white cursor-default"
                  : "bg-[#EEEEEE] text-black cursor-pointer hover:bg-[#354F52] hover:text-white transition-colors"
              } px-8 py-4 text-lg rounded-[1.2rem] me-4 mb-4 whitespace-nowrap`}
            >
              {s.subcategoryName}
            </span>
          ))}
        <span className="text-sm text-gray-400 hidden lg:block">
          Pentru a pastra filtrele curente, selectati subcategoria din lista de
          mai sus
        </span>
      </div>
      <div className="block lg:hidden">
        <MobileFilter />
      </div>
      <div className="flex flex-col items-center">
        {items?.map((item) => (
          <CatalogueCard {...item} />
        ))}
      </div>
    </>
  );
};

export default CatalogueItems;
