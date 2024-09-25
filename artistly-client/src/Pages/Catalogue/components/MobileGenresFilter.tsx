import { useForm } from "react-hook-form";
import { useFilter } from "../../../Contexts/CatalogueFilterContext";
import { musicGenres } from "../../../data/data";
import { SlMagnifier } from "react-icons/sl";
type Inputs = {
  searchbar: string;
  genres: {
    [key: string]: boolean;
  };
};
const MobileGenresFilter = () => {
  const { register, watch } = useForm<Inputs>({
    defaultValues: {
      genres: {},
      searchbar: "",
    },
  });
  const filter = watch("searchbar");

  const { addGenreParam, genresFilter, removeGenreParam } = useFilter();

  const handleAddFilter = (genre: string) => {
    if (genresFilter?.length == 0) {
      addGenreParam(genre);
    } else {
      if (genresFilter?.indexOf(genre) == -1) {
        addGenreParam(genre);
      } else {
        removeGenreParam(genre);
      }
    }
  };
  return (
    <form className="max-w-[300px] mx-auto">
      <div className="inline-flex items-center bg-white my-4 drop-shadow-lg w-full">
        <span className="mx-4">
          <SlMagnifier />
        </span>
        <input
          placeholder="Cauta..."
          className="p-1"
          type="text"
          {...register("searchbar")}
        />
      </div>
      <ul className="flex flex-col max-h-[250px] overflow-y-scroll filter-scroll">
        {filter != ""
          ? musicGenres
              .filter((gen) => gen.genreName.toLowerCase().startsWith(filter))
              .map((g) => (
                <li
                  key={g.genreId}
                  className="flex flex-row items-center border-b-[.5px] border-transparent w-min hover:border-black transition-colors whitespace-nowrap"
                >
                  <input
                    id={g.genreId}
                    onClick={() => handleAddFilter(g.genreId)}
                    checked={genresFilter?.indexOf(g.genreId) != -1}
                    value={g.genreId}
                    type="checkbox"
                    className="w-5 aspect-square"
                  />
                  <label className="ms-1 cursor-pointer" htmlFor={g.genreId}>
                    {g.genreName}
                  </label>
                </li>
              ))
          : musicGenres.map((g) => (
              <li
                key={g.genreId}
                className="flex flex-row items-center border-b-[.5px] border-transparent w-min hover:border-black transition-colors whitespace-nowrap"
              >
                <input
                  id={g.genreId}
                  onClick={() => handleAddFilter(g.genreId)}
                  checked={genresFilter?.indexOf(g.genreId) != -1}
                  value={g.genreId}
                  type="checkbox"
                  className="w-5 aspect-square"
                />
                <label className="ms-1 cursor-pointer" htmlFor={g.genreId}>
                  {g.genreName}
                </label>
              </li>
            ))}
      </ul>
    </form>
  );
};

export default MobileGenresFilter;
