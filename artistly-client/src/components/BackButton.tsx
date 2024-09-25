import { useNavigate } from "react-router";

type Props = {
  toHome?: boolean;
};

const BackButton = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="w-full me-auto">
      <div
        style={{ boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)" }}
        className="flex flex-row items-center bg-[#EEE] w-fit px-4 py-1 rounded-[0.9375rem] font-medium text-sm cursor-pointer hover:bg-[#354F52] hover:text-white transition-colors"
        onClick={props.toHome ? () => navigate("/") : () => navigate(-1)}
      >
        <svg
          className="mr-1"
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
        >
          <path
            d="M0.431175 6.47053L4.73331 10.8447C4.85611 10.9695 5.01979 11.0381 5.19432 11.0381C5.36904 11.0381 5.53262 10.9695 5.65543 10.8447L6.04603 10.4475C6.16874 10.3228 6.23634 10.1563 6.23634 9.97874C6.23634 9.80129 6.16874 9.62917 6.04603 9.5045L3.53623 6.94712L11.51 6.94712C11.8695 6.94712 12.1536 6.66097 12.1536 6.29535L12.1536 5.73377C12.1536 5.36815 11.8695 5.05314 11.51 5.05314L3.50775 5.05314L6.04593 2.48148C6.16864 2.35662 6.23624 2.19464 6.23624 2.0171C6.23624 1.83975 6.16864 1.6754 6.04593 1.55064L5.65533 1.15469C5.53252 1.02983 5.36894 0.961787 5.19422 0.961787C5.0197 0.961787 4.85602 1.03072 4.73321 1.15558L0.431078 5.52964C0.30798 5.65489 0.240282 5.8221 0.240766 5.99984C0.240379 6.17817 0.30798 6.34547 0.431175 6.47053Z"
            className="fill-current"
          />
        </svg>
        Inapoi
      </div>
    </div>
  );
};

export default BackButton;
