import { createContext, FC, useContext, useMemo, useState } from "react";
import { ClientCard } from "../utils/types";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MobileFilterScreen from "../Pages/Catalogue/components/MobileFilterScreen";

const API_URL = import.meta.env.VITE_API_LOCAL_URL;

type CatalogueFilterProviderProps = {
  children: React.ReactNode;
};

type CatalogueFilterContextProps = {
  items: ClientCard[] | undefined;
  locationFilter: string[] | undefined;
  genresFilter: string[] | undefined;
  ratingFilter: string | undefined;
  subcategory: string | null;

  addLocationParam: (filter: string) => void;
  addGenreParam: (filter: string) => void;
  removeLocationParam: (filter: string) => void;
  removeGenreParam: (filter: string) => void;

  updateRatingParam: (filter: string) => void;
  removeRatingParam: () => void;

  openMobileFilter: () => void;
  closeMobileFilter: () => void;
};

const CatalogueFilterContext = createContext<CatalogueFilterContextProps>({
  items: [],
  locationFilter: [],
  genresFilter: [],
  ratingFilter: "0",
  subcategory: "",
  addLocationParam: () => {},
  addGenreParam: () => {},
  removeLocationParam: () => {},
  removeGenreParam: () => {},
  updateRatingParam: () => {},
  removeRatingParam: () => {},
  openMobileFilter: () => {},
  closeMobileFilter: () => {},
});

export const CatalogueFilterProvider: FC<CatalogueFilterProviderProps> = ({
  children,
}) => {
  const [locationParams, setLocationParams] = useSearchParams();
  const [genresParams, setGenresParams] = useSearchParams();
  const [ratingParam, setRatingParam] = useSearchParams();
  const [subcategoryParam] = useSearchParams();

  const [mobileFilter, setMobileFilter] = useState(false);

  const locations = useMemo(
    () => locationParams.getAll("location") || [],
    [locationParams]
  );
  const genres = useMemo(
    () => genresParams.getAll("genre") || [],
    [genresParams]
  );
  const rating = useMemo(
    () => ratingParam.get("rating") || undefined,
    [ratingParam]
  );

  const subcategory = useMemo(
    () => subcategoryParam.get("subcategory"),
    [subcategoryParam]
  );
  const addLocationParam = (location: string) => {
    const updatedParams = new URLSearchParams(locationParams);
    updatedParams.append("location", location);
    setLocationParams(updatedParams, { replace: true });
  };

  const removeLocationParam = (location: string) => {
    const updatedParams = new URLSearchParams(locationParams);
    const updatedLocations = updatedParams
      .getAll("location")
      .filter((l) => l !== location);
    updatedParams.delete("location");
    updatedLocations.forEach((loc) => updatedParams.append("location", loc));
    setLocationParams(updatedParams, { replace: true });
  };

  const addGenreParam = (genre: string) => {
    const updatedParams = new URLSearchParams(genresParams);
    updatedParams.append("genre", genre);
    setGenresParams(updatedParams, { replace: true });
  };

  const removeGenreParam = (genre: string) => {
    const updatedParams = new URLSearchParams(genresParams);
    const updatedGenres = updatedParams
      .getAll("genre")
      .filter((g) => g !== genre);
    updatedParams.delete("genre");
    updatedGenres.forEach((gen) => updatedParams.append("genre", gen));
    setGenresParams(updatedParams, { replace: true });
  };

  const updateRatingParam = (rating: string) => {
    const updatedParams = new URLSearchParams(ratingParam);
    updatedParams.set("rating", rating);
    setRatingParam(updatedParams, { replace: true });
  };

  const removeRatingParam = () => {
    const updatedParams = new URLSearchParams(ratingParam);
    updatedParams.delete("rating");
    setRatingParam(updatedParams, { replace: true });
  };

  const openMobileFilter = () => setMobileFilter(true);
  const closeMobileFilter = () => setMobileFilter(false);

  const fetchClientCards = async (
    locations: string[],
    genres: string[],
    rating: string | undefined,
    subcategory: string | null
  ) => {
    const clientFilterModel = {
      location: locations,
      genres: genres,
      rating: rating,
      subcategory: subcategory,
    };

    const response = await axios.post<Array<ClientCard>>(
      API_URL + "client/filter",
      clientFilterModel,
      {
        params: {
          pageIndex: 1,
        },
      }
    );

    return response.data;
  };

  const { data, isLoading } = useQuery<Array<ClientCard>>(
    ["wishlist", locations, genres, rating, subcategory],
    () => fetchClientCards(locations, genres, rating, subcategory)
  );

  return (
    <CatalogueFilterContext.Provider
      value={{
        items: data,
        locationFilter: locations || [], // Expose the locations array,
        genresFilter: genres || [], //Expose the genres array,
        ratingFilter: rating,
        subcategory: subcategory,
        addLocationParam, // Expose function to add location,
        addGenreParam, //Expose function to add genres,
        removeLocationParam, // Expose function to remove location,
        removeGenreParam, //Expose function to remove genre,
        updateRatingParam,
        removeRatingParam,
        openMobileFilter,
        closeMobileFilter,
      }}
    >
      {isLoading ? <>LOADING</> : children}
      {mobileFilter && (
        <MobileFilterScreen goBack={() => setMobileFilter(false)} />
      )}
    </CatalogueFilterContext.Provider>
  );
};

export const useFilter = () => {
  return useContext(CatalogueFilterContext);
};
