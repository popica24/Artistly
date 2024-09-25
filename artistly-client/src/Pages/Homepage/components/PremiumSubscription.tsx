import { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";

const PremiumSubscription = () => {
  const containerShadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  const heroShadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  const buttonShadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  const [open, setOpen] = useState(!(window.innerWidth <= 1120));

  return (
    <div
      className="w-[190px] tablet:w-[90vmin] bg-[#510087] pt-9 tablet:pt-4 pb-5 rounded-[1.4rem] mb-20"
      style={containerShadow}
    >
      <div className="flex flex-row-reverse tablet:flex-row items-center tablet:justify-start relative">
        <div className="text-end tablet:text-start">
          <span
            style={heroShadow}
            className="bg-white py-3 tracking-[0.45rem] font-semibold text-[#510087] tablet:text-black rounded-s-[2rem] tablet:rounded-s-none tablet:rounded-e-[2rem] px-5"
          >
            PREMIUM
          </span>
        </div>
        <div className="flex flex-row text-white whitespace-nowrap ms-4 laptop:hidden ">
          <span className="text-[1rem] flex items-start leading-[2.1rem]">
            €
          </span>
          <span className="text-[2rem] flex items-center">9</span>
          <span className="text-[1rem] flex items-center mt-2">,90</span>
          <span className="text-[0.75rem] flex items-end leading-[2rem]">
            /luna
          </span>
        </div>
        <div
          className="absolute right-8 laptop:hidden"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="17"
            viewBox="0 0 30 17"
            fill="none"
          >
            <path
              d="M0.173176 2.12617C0.17079 1.70553 0.290632 1.29369 0.517424 0.943161C0.744213 0.59263 1.06768 0.319287 1.44658 0.157984C1.82547 -0.00331846 2.24264 -0.0452744 2.64488 0.0374657C3.04713 0.120206 3.41623 0.323893 3.70513 0.622559L14.6315 11.8467L25.5578 0.62256C25.9467 0.223778 26.4742 -0.000255287 27.0243 -0.000255263C27.2966 -0.000255251 27.5663 0.054746 27.8179 0.161609C28.0696 0.268472 28.2982 0.425104 28.4908 0.62256C28.6833 0.820017 28.8361 1.05443 28.9403 1.31242C29.0446 1.57041 29.0982 1.84692 29.0982 2.12617C29.0982 2.69013 28.8797 3.231 28.4908 3.62978L16.0979 16.3363C15.711 16.7308 15.1875 16.9522 14.6418 16.9522C14.0961 16.9522 13.5726 16.7308 13.1856 16.3363L0.792814 3.62978C0.597652 3.43364 0.442394 3.19975 0.336029 2.94164C0.229664 2.68354 0.174311 2.40636 0.173176 2.12617Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      {open ? (
        <>
          <div className="ms-7 mt-2 tablet:me-7">
            <div className="flex flex-row text-white whitespace-nowrap ms-4 tablet:hidden ">
              <span className="text-[1.5rem] flex items-start leading-[3.3rem]">
                €
              </span>
              <span className="text-[3rem] flex items-center">9</span>
              <span className="text-[1.25rem] flex items-center mt-4">,90</span>
              <span className="text-[0.75rem] flex items-end leading-[2rem]">
                /luna
              </span>
            </div>
            <div className="leading-[0.85rem]">
              <span className="text-[12px] text-start font-medium text-white tablet:hidden">
                Vă oferă acces limitat la informatiile de pe profilul artistului
              </span>
            </div>
            <div className="leading-5 mt-8 laptop:hidden font-medium text-white">
              <span className="">
                Optând pentru planul Premium, beneficiezi de acces nelimitat la
                informațiile premium ale tuturor artiștilor, incluzând date de
                contact și prețuri.
              </span>
            </div>
            <div className="flex flex-row items-center justify-between tablet:my-2">
              <span className="w-[15ch] laptop:hidden text-white font-medium">
                Acces nelimitat la informatiile de pe profilul artistului
              </span>
              <div className="flex flex-col justify-start">
                {" "}
                <div className="flex flex-row items-center justify-start tablet:justify-end  mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26.37"
                    height="26.37"
                    viewBox="0 0 34 34"
                    fill="none"
                  >
                    <path
                      d="M15.4186 29.9894C23.6852 29.9894 30.365 23.2912 30.365 15.043C30.365 6.79478 23.6668 0.0965576 15.4186 0.0965576C7.17038 0.0965576 0.472168 6.79478 0.472168 15.043C0.472168 23.2912 7.17038 29.9894 15.4186 29.9894ZM5.89716 14.7293C6.45073 14.1757 7.3549 14.1757 7.90847 14.7293L12.3186 19.1763L21.1204 8.04952C21.6001 7.44059 22.5043 7.3299 23.1132 7.80966C23.7221 8.28942 23.8329 9.19359 23.3531 9.80252L13.5733 22.184C13.315 22.4977 12.946 22.7007 12.54 22.7192C12.5216 22.7192 12.4847 22.7192 12.4662 22.7192C12.0972 22.7192 11.7281 22.5715 11.4513 22.2947L5.91562 16.7222C5.36204 16.1686 5.36204 15.2644 5.91562 14.7108L5.89716 14.7293Z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-[12px] text-start text-white leading-4 ms-2">
                    Afisari premium nelimitate
                  </span>
                </div>
                <div className="flex flex-row items-center justify-start mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26.37"
                    height="26.37"
                    viewBox="0 0 34 34"
                    fill="none"
                  >
                    <path
                      d="M15.4186 29.9894C23.6852 29.9894 30.365 23.2912 30.365 15.043C30.365 6.79478 23.6668 0.0965576 15.4186 0.0965576C7.17038 0.0965576 0.472168 6.79478 0.472168 15.043C0.472168 23.2912 7.17038 29.9894 15.4186 29.9894ZM5.89716 14.7293C6.45073 14.1757 7.3549 14.1757 7.90847 14.7293L12.3186 19.1763L21.1204 8.04952C21.6001 7.44059 22.5043 7.3299 23.1132 7.80966C23.7221 8.28942 23.8329 9.19359 23.3531 9.80252L13.5733 22.184C13.315 22.4977 12.946 22.7007 12.54 22.7192C12.5216 22.7192 12.4847 22.7192 12.4662 22.7192C12.0972 22.7192 11.7281 22.5715 11.4513 22.2947L5.91562 16.7222C5.36204 16.1686 5.36204 15.2644 5.91562 14.7108L5.89716 14.7293Z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-[12px] text-start text-white leading-4 ms-2">
                    Informatii pret
                  </span>
                </div>
                <div className="flex flex-row items-center justify-start mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26.37"
                    height="26.37"
                    viewBox="0 0 34 34"
                    fill="none"
                  >
                    <path
                      d="M15.4186 29.9894C23.6852 29.9894 30.365 23.2912 30.365 15.043C30.365 6.79478 23.6668 0.0965576 15.4186 0.0965576C7.17038 0.0965576 0.472168 6.79478 0.472168 15.043C0.472168 23.2912 7.17038 29.9894 15.4186 29.9894ZM5.89716 14.7293C6.45073 14.1757 7.3549 14.1757 7.90847 14.7293L12.3186 19.1763L21.1204 8.04952C21.6001 7.44059 22.5043 7.3299 23.1132 7.80966C23.7221 8.28942 23.8329 9.19359 23.3531 9.80252L13.5733 22.184C13.315 22.4977 12.946 22.7007 12.54 22.7192C12.5216 22.7192 12.4847 22.7192 12.4662 22.7192C12.0972 22.7192 11.7281 22.5715 11.4513 22.2947L5.91562 16.7222C5.36204 16.1686 5.36204 15.2644 5.91562 14.7108L5.89716 14.7293Z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-[12px] text-start text-white leading-4 ms-2">
                    Informatii contact
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <Link
              to={"/login"}
              state={{ toRegister: true }}
              className="text-[0.9rem] bg-white px-4 rounded-[2rem] py-1"
              style={buttonShadow}
            >
              Creeaza cont
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PremiumSubscription;
