import { useFilter } from "../../../Contexts/CatalogueFilterContext";

const MobileFilter = () => {
  const { openMobileFilter, locationFilter, genresFilter, ratingFilter } =
    useFilter();
  return (
    <>
      <div className="grid grid-cols-2 bg-[#EEEEEE] text-center py-3">
        <div
          className="col-span-1 border-r border-black"
          onClick={openMobileFilter}
        >
          <span className="inline-flex items-center">
            <p>Filtreaza</p>
            {((locationFilter?.length || 0) > 0 ||
              (genresFilter?.length || 0) > 0 ||
              (ratingFilter?.length || 0) > 0) && (
              <span className="bg-[#07C] rounded-full p-1.5 ms-1"></span>
            )}
          </span>
        </div>
        <div className="col-span-1">
          <span>
            <div className="col-span-1">
              <div className="flex flex-row items-center justify-center">
                <svg
                  className="me-1"
                  width="13"
                  height="11"
                  viewBox="0 0 13 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 0.785714C13 1.22048 12.6371 1.57143 12.1875 1.57143H0.8125C0.362917 1.57143 0 1.22048 0 0.785714C0 0.350952 0.362917 0 0.8125 0H12.1875C12.6371 0 13 0.350952 13 0.785714ZM7.85417 9.42857H5.14583C4.69625 9.42857 4.33333 9.77952 4.33333 10.2143C4.33333 10.649 4.69625 11 5.14583 11H7.85417C8.30375 11 8.66667 10.649 8.66667 10.2143C8.66667 9.77952 8.30375 9.42857 7.85417 9.42857ZM10.0208 4.71429H2.97917C2.52958 4.71429 2.16667 5.06524 2.16667 5.5C2.16667 5.93476 2.52958 6.28571 2.97917 6.28571H10.0208C10.4704 6.28571 10.8333 5.93476 10.8333 5.5C10.8333 5.06524 10.4704 4.71429 10.0208 4.71429Z"
                    fill="#2D3047"
                  />
                </svg>

                <span> Sorteaza</span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default MobileFilter;
