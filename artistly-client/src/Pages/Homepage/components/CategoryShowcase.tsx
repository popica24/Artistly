import CategoryWithBackground from "./CategoryWithBackground";

const CategoryShowcase = () => {
  return (
    <div className="flex laptop:flex-row flex-col items-center justify-center tablet:mt-5">
      <CategoryWithBackground
        path="/categorie-muzica.avif"
        to="catalogue?subcategory=solisti"
        bgProps="no-repeat center / cover"
        containerClasses="laptop:w-[20rem] w-[90vmin] laptop:h-[24rem] h-[11.5rem] tablet:h-[8.2rem] m-2"
        gradient="180deg, rgba(217, 217, 217, 0.00) 9.9%, rgba(0, 0, 0, 0.94) 89.06%"
        text="Muzica"
        textClasses="bottom-0 left-0 laptop:left-[50%] laptop:-translate-x-[50%] laptop:mb-[2.3rem] mb-[1.3rem]  tablet:ms-[1.6rem]"
      />

      <div className="flex flex-col">
        <div className="flex flex-col laptop:flex-row">
          <CategoryWithBackground
            path="/categorie-locatii.avif"
            to="catalogue?subcategory=corturi"
            bgProps="no-repeat center / cover"
            containerClasses="laptop:w-[34rem] w-[90vmin] h-[11.5rem] tablet:h-[8.2rem] m-2"
            gradient="270deg, #000 0%, rgba(217, 217, 217, 0.00) 100%"
            text="Locatii"
            textClasses="laptop:right-0 tablet:bottom-0 laptop:top-[50%] laptop:-translate-y-[50%] mr-[2.2rem] tablet:ms-[1.6rem] tablet:mb-[1.3rem]"
          />
          <CategoryWithBackground
            path="/categorie-diverse.avif"
            to="catalogue?subcategory=tipografii"
            bgProps="no-repeat bottom / cover"
            containerClasses="laptop:w-[25rem] w-[90vmin] h-[11.5rem] tablet:h-[8.2rem] m-2"
            gradient="180deg, #000 0%, rgba(217, 217, 217, 0.00) 100%"
            text="Diverse"
            textClasses="laptop:top-0 tablet:bottom-0 tablet:left-0 laptop:left-[50%] laptop:translate-x-[-50%] laptop:mt-[1.6rem] mb-[1.3rem] tablet:ms-[1.6rem]"
          />
        </div>
        <div className="flex flex-col laptop:flex-row">
          <CategoryWithBackground
            path="/categorie-cofetarii.avif"
            to="catalogue?subcategory=candy-bar"
            bgProps="no-repeat center / cover"
            containerClasses="laptop:w-[25rem] w-[90vmin] h-[11.5rem] tablet:h-[8.2rem] m-2"
            gradient="180deg, rgba(217, 217, 217, 0.00) 0%, rgba(0, 0, 0, 0.90) 91.67%"
            text="Cofetarii"
            textClasses="bottom-0 tablet:left-0 left-[50%] -translate-x-[50%] tablet:-translate-x-0 laptop:mb-[2.3rem] mb-[1.3rem] tablet:ms-[1.6rem]"
          />
          <CategoryWithBackground
            path="/categorie-foto-video.avif"
            to="catalogue?subcategory=fotografi"
            bgProps="no-repeat bottom / cover"
            containerClasses="laptop:w-[34rem] w-[90vmin] h-[11.5rem] tablet:h-[8.2rem] m-2"
            gradient="270deg, #000 0%, rgba(217, 217, 217, 0.00) 100%"
            text="Foto/Video"
            textClasses="laptop:right-0 tablet:bottom-0 laptop:top-[50%] laptop:-translate-y-[50%] mr-[2.1rem] tablet:ms-[1.6rem] tablet:mb-[1.3rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcase;
