type FaqButtonProps = {
  active: boolean;
  text: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  selectedPage: number;
};
const FaqButton = (props: FaqButtonProps) => {
  return (
    <div
      onClick={() => props.setSelectedPage(props.selectedPage)}
      className={`${
        props.active ? "bg-[#7F3F98]" : "bg-[#EEEEEE]"
      } rounded-[30px] h-[110px] w-full mb-6 p-4 cursor-pointer`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-start justify-start text-black">
          <span
            className={`text-[18px] ${
              props.active ? "text-white" : "text-black"
            }`}
          >
            {props.text}
          </span>
        </div>
        {!props.active && (
          <div className="flex flex-row items-center justify-end">
            <svg
              className="me-1"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2353_7156)">
                <path
                  d="M16.13 8.7009L2.24546 0.0537934C2.08103 -0.0493743 1.86407 0.000293824 1.76091 0.164765C1.69528 0.269338 1.68938 0.400697 1.74526 0.510754L5.99043 8.99933L1.74351 17.4893C1.6556 17.6624 1.72463 17.874 1.89771 17.9619C2.00781 18.0178 2.13913 18.0119 2.2437 17.9463L16.1283 9.29916C16.2933 9.19691 16.3442 8.98024 16.2419 8.81521C16.2133 8.76909 16.1744 8.73018 16.1283 8.7016L16.13 8.7009Z"
                  fill="#0077CC"
                />
              </g>
              <defs>
                <clipPath id="clip0_2353_7156">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-[#0077CC] font-medium">Vezi mai mult</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqButton;
