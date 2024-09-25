type Props = {
  prices: {
    ammount: number;
    currency: string;
    title: string;
    description: string;
  }[];
};

const bgArr = [
  "bg-[#EC9704]",
  "bg-[#583E26]",
  "bg-[#F86D13]",
  "bg-[#F86D13]",
  "bg-[#F86D13]",
];
const borderArr = [
  "border-[#EC9704]",
  "border-[#583E26]",
  "border-[#F86D13]",
  "border-[#F86D13]",
  "border-[#F86D13]",
];

function PriceDetails({ prices }: Props) {
  if (!prices || prices.length == 0) {
    return <></>;
  }

  return (
    <div className="mt-12">
      <span className="font-medium text-lg">Tarife</span>
      <div className="bg-[#EEEEEE] mt-3 p-4 drop-shadow-default rounded-xl">
        {prices.map((p, i) => (
          <PriceBox {...p} index={i} />
        ))}
        <div className="bg-white border-2 border-[#FF9C9C] text-sm flex flex-row rounded-xl max-w-[600px] mx-auto">
          <div className="bg-[#FFEEEE] flex items-center justify-center px-4 rounded-xl">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6667 25.3333C19.6623 25.3333 25.3333 19.6623 25.3333 12.6667C25.3333 5.67106 19.6623 0 12.6667 0C5.67106 0 0 5.67106 0 12.6667C0 19.6623 5.67106 25.3333 12.6667 25.3333Z"
                fill="#FF5C4E"
              />
              <path
                d="M11.7918 16.6714C11.7477 16.7749 11.6816 16.971 11.7389 17.1957C11.8314 17.557 12.1971 17.8367 12.6641 17.9072C13.1311 17.8367 13.4968 17.5548 13.5871 17.1957C13.6444 16.9732 13.5805 16.7771 13.5365 16.6736C13.6775 12.8097 13.8162 8.94583 13.9572 5.07974C14.0982 4.16994 13.3096 3.49365 12.6641 3.49365C12.0187 3.49365 11.23 4.16994 11.371 5.07974C11.512 8.94362 11.6508 12.8075 11.7918 16.6736V16.6714Z"
                fill="white"
              />
              <path
                d="M12.6665 21.8396C13.5108 21.8396 14.1953 21.1551 14.1953 20.3108C14.1953 19.4665 13.5108 18.782 12.6665 18.782C11.8222 18.782 11.1377 19.4665 11.1377 20.3108C11.1377 21.1551 11.8222 21.8396 12.6665 21.8396Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-start px-4 py-2 text-xs">
            <p>
              Prețurile afișate sunt orientative și pot varia în funcție de
              perioada, locație, specificul evenimentului, etc.
            </p>
            <p>
              Pentru detalii exacte, vă recomandăm să contactați direct
              prestatorul / impresarul.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;

const PriceBox = ({
  ammount,
  currency,
  title,
  description,
  index,
}: {
  ammount: number;
  currency: string;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <div className="bg-white rounded-xl drop-shadow-default px-4 mb-6 lg:mb-12 relative lg:py-2">
      <div className="flex flex-col lg:grid grid-cols-9 items-center justify-center">
        <div
          className={`flex flex-row lg:flex-col col-span-2 items-center w-full justify-evenly border-b-2 lg:border-b-0 lg:border-r-2 py-4 ${borderArr[index]}`}
        >
          <p
            className={`text-white lg:absolute -top-4 text-lg lg:text-xl font-bold px-4 lg:px-6 lg:w-[140px] text-center py-1 lg:py-1.5 rounded-full drop-shadow-default ${bgArr[index]}`}
          >
            {ammount}
            {currency == "EUR" ? "€" : "RON"}
          </p>
          <p className="max-w-[10ch] sm:max-w-[20ch] lg:max-w-[15ch] text-center text-sm sm:text-base lg:mt-3">
            {title}
          </p>
          <svg
            className="lg:hidden"
            width="16"
            height="8"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.93745 -5.13261e-05C9.14525 -5.13079e-05 9.35325 0.0793698 9.51189 0.238011L17.6369 8.36301C17.9544 8.6805 17.9544 9.19461 17.6369 9.51189C17.3194 9.82917 16.8053 9.82937 16.488 9.51189L8.93745 1.96132L1.38689 9.51189C1.0694 9.82937 0.555292 9.82937 0.23801 9.51189C-0.0792713 9.1944 -0.0794734 8.68029 0.238011 8.36301L8.36301 0.238011C8.52165 0.0793697 8.72965 -5.13443e-05 8.93745 -5.13261e-05Z"
              fill="black"
            />
          </svg>
        </div>
        <p className="text-sm py-4 col-span-7 lg:ps-7">{description}</p>
      </div>
    </div>
  );
};
