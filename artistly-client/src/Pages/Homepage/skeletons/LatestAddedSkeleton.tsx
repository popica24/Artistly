import Skeleton from "../../../components/Skeleton/Skeleton";

const LatestAddedSkeleton = () => {
  return (
    <div className="latest-added-wrapper flex flex-col">
      <Skeleton classes="latest-added-svg ms-4 my-4" />
      <div className="inline-flex items-center justify-between w-full">
        <div className="prev-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="39"
            viewBox="0 0 38 39"
            fill="none"
          >
            <path
              d="M23.75 8.0113C24.0645 8.00947 24.3724 8.10134 24.6345 8.27519C24.8965 8.44905 25.1009 8.697 25.2215 8.98746C25.3421 9.27791 25.3735 9.5977 25.3116 9.90605C25.2497 10.2144 25.0975 10.4973 24.8742 10.7188L16.4825 19.0946L24.8742 27.4705C25.1723 27.7686 25.3398 28.173 25.3398 28.5946C25.3398 28.8034 25.2987 29.0101 25.2188 29.203C25.1389 29.3959 25.0218 29.5712 24.8742 29.7188C24.7265 29.8664 24.5513 29.9835 24.3584 30.0634C24.1655 30.1433 23.9588 30.1844 23.75 30.1844C23.3283 30.1844 22.924 30.017 22.6258 29.7188L13.1258 20.2188C12.8309 19.9221 12.6654 19.5208 12.6654 19.1026C12.6654 18.6843 12.8309 18.283 13.1258 17.9863L22.6258 8.4863C22.7725 8.3367 22.9473 8.21768 23.1403 8.13614C23.3333 8.05461 23.5405 8.01217 23.75 8.0113Z"
              fill="#323232"
            />
          </svg>
        </div>
        <div className="justify-between latest-added-carousel">
          <span className="w-[150px]">
            <div className="rounded-client-button flex flex-col items-center justify-center text-center p-2 my-2 mx-2">
              <Skeleton classes="rounded-client-image-wrapper rounded-full" />
              <Skeleton classes="rounded-client-tag my-2" />
              <Skeleton classes="my-0.5 rounded-client-name " />
            </div>
          </span>
          <span className="w-[150px]">
            <div className="rounded-client-button flex flex-col items-center justify-center text-center p-2 my-2 mx-2">
              <Skeleton classes="rounded-client-image-wrapper rounded-full" />
              <Skeleton classes="rounded-client-tag my-2" />
              <Skeleton classes="my-0.5 rounded-client-name " />
            </div>
          </span>
          <span className="w-[150px]">
            <div className="rounded-client-button flex flex-col items-center justify-center text-center p-2 my-2 mx-2">
              <Skeleton classes="rounded-client-image-wrapper rounded-full" />
              <Skeleton classes="rounded-client-tag my-2" />
              <Skeleton classes="my-0.5 rounded-client-name " />
            </div>
          </span>
          <span className="w-[150px]">
            <div className="rounded-client-button flex flex-col items-center justify-center text-center p-2 my-2 mx-2">
              <Skeleton classes="rounded-client-image-wrapper rounded-full" />
              <Skeleton classes="rounded-client-tag my-2" />
              <Skeleton classes="my-0.5 rounded-client-name " />
            </div>
          </span>
          <span className="w-[150px]">
            <div className="rounded-client-button flex flex-col items-center justify-center text-center p-2 my-2 mx-2">
              <Skeleton classes="rounded-client-image-wrapper rounded-full" />
              <Skeleton classes="rounded-client-tag my-2" />
              <Skeleton classes="my-0.5 rounded-client-name " />
            </div>
          </span>
          <span className="w-[150px]">
            <div className="rounded-client-button flex flex-col items-center justify-center text-center p-2 my-2 mx-2">
              <Skeleton classes="rounded-client-image-wrapper rounded-full" />
              <Skeleton classes="rounded-client-tag my-2" />
              <Skeleton classes="my-0.5 rounded-client-name " />
            </div>
          </span>
          <span className="w-[150px]">
            <div className="rounded-client-button flex flex-col items-center justify-center text-center p-2 my-2 mx-2">
              <Skeleton classes="rounded-client-image-wrapper rounded-full" />
              <Skeleton classes="rounded-client-tag my-2" />
              <Skeleton classes="my-0.5 rounded-client-name " />
            </div>
          </span>
        </div>
        <div className="next-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="39"
            viewBox="0 0 38 39"
            fill="none"
          >
            <path
              d="M14.25 30.178C13.9355 30.1799 13.6276 30.088 13.3655 29.9141C13.1035 29.7403 12.8991 29.4923 12.7785 29.2019C12.6579 28.9114 12.6265 28.5916 12.6884 28.2833C12.7503 27.9749 12.9025 27.692 13.1258 27.4705L21.5175 19.0947L13.1258 10.7189C12.8277 10.4207 12.6602 10.0163 12.6602 9.59469C12.6602 9.38592 12.7013 9.17919 12.7812 8.9863C12.8611 8.79342 12.9782 8.61816 13.1258 8.47053C13.2735 8.3229 13.4487 8.2058 13.6416 8.1259C13.8345 8.04601 14.0412 8.00488 14.25 8.00488C14.6717 8.00488 15.076 8.17238 15.3742 8.47053L24.8742 17.9705C25.1691 18.2672 25.3346 18.6685 25.3346 19.0868C25.3346 19.5051 25.1691 19.9064 24.8742 20.203L15.3742 29.703C15.2275 29.8526 15.0527 29.9717 14.8597 30.0532C14.6667 30.1347 14.4595 30.1772 14.25 30.178Z"
              fill="#323232"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LatestAddedSkeleton;
