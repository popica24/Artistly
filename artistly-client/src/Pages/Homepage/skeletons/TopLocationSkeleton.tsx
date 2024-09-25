import Skeleton from "../../../components/Skeleton/Skeleton";

const TopLocationSkeleton = () => {
  return (
    <div className="grid laptop:grid-cols-3 grid-cols-1 laptop:h-[24rem] h-[25rem] max-w-6xl laptop:mx-auto mx-5 toplocation-container my-20 shadow-md">
      <Skeleton classes="laptop:col-span-1 col-span-2 laptop:w-30 toplocation-banner" />
      <div className="col-span-2 laptop:w-70 w-full toplocation-description px-10 laptop:py-8 py-2 mx-auto">
        <div className="flex flex-col items-start h-full laptop:justify-between justify-center ">
          <div className="flex flex-row items-center toplocation-details">
            <Skeleton classes="toplocation-logo" />
            <div className="flex flex-col items-start ms-4">
              <Skeleton classes="laptop:text-5xl text-xl toplocation-title" />
            </div>
          </div>
          <Skeleton classes="toplocation-description" />
          <Skeleton classes="toplocation-description" />
          <Skeleton classes="toplocation-description" />
          <Skeleton classes="toplocation-description" />
          <Skeleton classes="toplocation-description" />
        </div>
      </div>
    </div>
  );
};

export default TopLocationSkeleton;
