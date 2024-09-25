import { useForm } from "react-hook-form";
import { SlMagnifier } from "react-icons/sl";
import { RiArrowDownSLine } from "react-icons/ri";
import { locations } from "../../../data/data";
import "./styles.css";
import { useFilter } from "../../../Contexts/CatalogueFilterContext";

type Inputs = {
  searchbar: string;
  locations: {
    [key: string]: boolean;
  };
};

const LocationsFilterBox = () => {
  const { register, watch } = useForm<Inputs>({
    defaultValues: {
      locations: {},
      searchbar: "",
    },
  });

  const filter = watch("searchbar");

  const { addLocationParam, locationFilter, removeLocationParam } = useFilter();

  const handleAddFilter = (location: string) => {
    console.log(locationFilter);

    if (locationFilter?.length == 0) {
      addLocationParam(location);
    } else {
      if (locationFilter?.indexOf(location) == -1) {
        addLocationParam(location);
      } else {
        removeLocationParam(location);
      }
    }
  };

  return (
    <form>
      <div className="bg-[#EEEEEE] drop-shadow-default p-4">
        <div className="flex flex-row items-center">
          <p className="text-lg">Locatie</p>
          <div className="ms-auto">
            <RiArrowDownSLine />
          </div>
        </div>
        <div className="inline-flex items-center bg-white my-4">
          <span className="mx-4">
            <SlMagnifier />
          </span>
          <input
            placeholder="Cauta..."
            className="p-1 xl:w-[200px] w-[140px]"
            type="text"
            {...register("searchbar")}
          />
        </div>
        <ul className="flex flex-col max-h-[250px] overflow-y-scroll filter-scroll">
          {filter != ""
            ? locations
                .filter((loc) => loc.toLowerCase().startsWith(filter))
                .map((g) => (
                  <li
                    key={g}
                    className="flex flex-row items-center border-b-[.5px] border-transparent w-min hover:border-black transition-colors whitespace-nowrap"
                  >
                    <input
                      onClick={() => handleAddFilter(g)}
                      checked={locationFilter?.indexOf(g) != -1}
                      id={g}
                      value={g}
                      type="checkbox"
                    />
                    <label className="ms-1 cursor-pointer" htmlFor={g}>
                      {g}
                    </label>
                  </li>
                ))
            : locations.map((g) => (
                <li
                  key={g}
                  className="flex flex-row items-center border-b-[.5px] border-transparent w-min hover:border-black transition-colors whitespace-nowrap"
                >
                  <input
                    onClick={() => handleAddFilter(g)}
                    checked={locationFilter?.indexOf(g) != -1}
                    id={g}
                    value={g}
                    type="checkbox"
                  />
                  <label className="ms-1 cursor-pointer" htmlFor={g}>
                    {g}
                  </label>
                </li>
              ))}
        </ul>
      </div>
    </form>
  );
};

export default LocationsFilterBox;
