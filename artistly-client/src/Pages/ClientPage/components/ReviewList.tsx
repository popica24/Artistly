import { Rating } from "react-simple-star-rating";

type Props = {
  minifiedReviews: {
    name: string;
    dateAdded: string;
    title: string;
    review: string;
    rating: number;
  }[];
};

const ReviewList = ({ minifiedReviews }: Props) => {
  if (!minifiedReviews || minifiedReviews.length == 0) {
    return <></>;
  }
  return (
    <>
      {minifiedReviews?.map((review) => (
        <ReviewCard {...review} />
      ))}
    </>
  );
};

export default ReviewList;

const ReviewCard = ({
  name,
  dateAdded,
  title,
  review,
  rating,
}: {
  name: string;
  dateAdded: string;
  title: string;
  review: string;
  rating: number;
}) => {
  console.log(name.split(" ")[0][0] + name.split(" ")[1][0]);

  const shortName = name.split(" ")[0][0] + name.split(" ")[1][0];

  return (
    <div className="my-8 flex flex-col rounded-xl bg-[#EEEEEE] p-4 drop-shadow-lg md:grid md:bg-white md:drop-shadow-none md:grid-cols-12 items-center md:border-b">
      <div className="col-span-3 border-b border-[#A7A7A7] md:border-b-0 w-full">
        <div className="flex flex-row items-center justify-between md:flex-col">
          <div className="flex flex-row items-center md:flex-col">
            <div className="relative rounded-full bg-[#FFC727] p-5">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
                {shortName}
              </div>
            </div>
            <span className="ms-2">{name}</span>
          </div>
          <span className="text-xs font-light text-[#575757]">{dateAdded}</span>
        </div>
        <div className="block md:hidden">
          <Rating readonly initialValue={rating} size={20} />
        </div>
        <p className="pb-2 text-lg font-medium md:hidden">{title}</p>
      </div>
      <div className="col-span-9 flex flex-col md:ps-10 md:border-l border-[#A7A7A7] justify-start w-full">
        <p className="hidden md:block text-lg font-medium">{title}</p>
        <div className="hidden md:block">
          <Rating readonly initialValue={rating} size={25} />
        </div>
        <p className="pt-2 md:mt-2 md:pt-0 leading-4 text-sm text-start w-full">
          {review}
        </p>
      </div>
    </div>
  );
};
