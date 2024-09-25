import { useFilter } from "../../Contexts/CatalogueFilterContext";
import CatalogueItems from "./components/CatalogueItems";
import GenresFilterBox from "./components/GenresFilterBox";
import LocationsFilterBox from "./components/LocationsFilterBox";
import RatingFilterBox from "./components/RatingFilterBox";

const Catalogue = () => {
  const { subcategory } = useFilter();
  return (
    <div className="lg:mt-6 flex flex-col lg:grid grid-cols-5 md:grid-cols-7 lg:grid-cols-9">
      <div className="col-span-2 hidden lg:block">
        <div className="flex flex-col">
          {(subcategory == "solisti" ||
            subcategory == "orchestre" ||
            subcategory == "banduri" ||
            subcategory == "dj") && (
            <div className="mb-6">
              <GenresFilterBox />
            </div>
          )}
          <div className="mb-6">
            <LocationsFilterBox />
          </div>
          <RatingFilterBox />
        </div>
      </div>
      <div className="col-span-5 ps-0 lg:ps-20">
        <CatalogueItems />
      </div>
      <div className="col-span-2 hidden lg:block"></div>
    </div>
  );
};

export default Catalogue;
