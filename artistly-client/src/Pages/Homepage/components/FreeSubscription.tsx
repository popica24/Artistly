import { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";

const FreeSubscription = () => {
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
      className="w-[190px] tablet:w-[90vmin] bg-[#E6B663] pt-9 tablet:pt-4 pb-5 rounded-[1.4rem]"
      style={containerShadow}
    >
      <div className="flex flex-row-reverse tablet:flex-row items-center tablet:justify-start relative">
        <div className="text-end tablet:text-start">
          <span
            style={heroShadow}
            className="bg-white py-3 tracking-[0.49131rem] font-semibold text-[#E6B663] tablet:text-black rounded-s-[2rem] tablet:rounded-s-none tablet:rounded-e-[2rem] px-5"
          >
            GRATUIT
          </span>
        </div>
        <div className="flex flex-row text-white whitespace-nowrap ms-4 laptop:hidden ">
          <span className="text-[1rem] flex items-start leading-[2.1rem]">
            €
          </span>
          <span className="text-[2rem] flex items-center">0</span>
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
            <div className="flex flex-row text-white whitespace-nowrap tablet:hidden">
              <span className="text-[1.5rem] flex items-start leading-[3.3rem]">
                €
              </span>
              <span className="text-[3rem] flex items-center">0</span>
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
                Cu abonamentul gratuit, beneficiezi de o afișare PREMIUM
                gratuită, oferită de noi, pentru a accesa informațiile premium
                ale unui profil de artist.
              </span>
            </div>
            <div className="flex flex-row items-center justify-between tablet:my-2">
              <span className="w-[15ch] laptop:hidden text-white font-medium">
                Vă oferă acces limitat la informatiile de pe profilul artistului
              </span>
              <div className="flex flex-col justify-start">
                {" "}
                <div className="flex flex-row items-center justify-start tablet:justify-end  mt-4">
                  <svg
                    className="flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26.37"
                    height="26.37"
                    viewBox="0 0 32 31"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_2061_478)">
                      <path
                        d="M15.7693 0.0252686C7.35142 0.0252686 0.383545 6.87341 0.383545 15.2912C0.383545 23.7091 7.35142 30.677 15.7693 30.677C24.1871 30.677 31.0352 23.7091 31.0352 15.2912C31.0352 6.87341 24.1871 0.0252686 15.7693 0.0252686ZM23.3256 20.3075C24.0261 21.0079 24.0261 22.1472 23.3256 22.8482C22.6306 23.5427 21.4913 23.554 20.7849 22.8482L15.7693 17.8308L10.6333 22.8488C9.93287 23.5492 8.7936 23.5492 8.09257 22.8488C7.39213 22.1484 7.39213 21.0091 8.09257 20.3081L13.1094 15.2912L8.09257 10.2744C7.39213 9.57339 7.39213 8.43413 8.09257 7.73369C8.7936 7.03325 9.93287 7.03325 10.6333 7.73369L15.7693 12.7517L20.7849 7.73369C21.4841 7.03445 22.6234 7.03205 23.3256 7.73369C24.0261 8.43413 24.0261 9.57339 23.3256 10.2744L18.3088 15.2912L23.3256 20.3075Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2061_478">
                        <rect
                          width="30.6517"
                          height="30.6517"
                          fill="white"
                          transform="translate(0.383545 0.0252686)"
                        />
                      </clipPath>
                    </defs>
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
                    viewBox="0 0 32 31"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_2061_478)">
                      <path
                        d="M15.7693 0.0252686C7.35142 0.0252686 0.383545 6.87341 0.383545 15.2912C0.383545 23.7091 7.35142 30.677 15.7693 30.677C24.1871 30.677 31.0352 23.7091 31.0352 15.2912C31.0352 6.87341 24.1871 0.0252686 15.7693 0.0252686ZM23.3256 20.3075C24.0261 21.0079 24.0261 22.1472 23.3256 22.8482C22.6306 23.5427 21.4913 23.554 20.7849 22.8482L15.7693 17.8308L10.6333 22.8488C9.93287 23.5492 8.7936 23.5492 8.09257 22.8488C7.39213 22.1484 7.39213 21.0091 8.09257 20.3081L13.1094 15.2912L8.09257 10.2744C7.39213 9.57339 7.39213 8.43413 8.09257 7.73369C8.7936 7.03325 9.93287 7.03325 10.6333 7.73369L15.7693 12.7517L20.7849 7.73369C21.4841 7.03445 22.6234 7.03205 23.3256 7.73369C24.0261 8.43413 24.0261 9.57339 23.3256 10.2744L18.3088 15.2912L23.3256 20.3075Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2061_478">
                        <rect
                          width="30.6517"
                          height="30.6517"
                          fill="white"
                          transform="translate(0.383545 0.0252686)"
                        />
                      </clipPath>
                    </defs>
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
                    viewBox="0 0 32 31"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_2061_478)">
                      <path
                        d="M15.7693 0.0252686C7.35142 0.0252686 0.383545 6.87341 0.383545 15.2912C0.383545 23.7091 7.35142 30.677 15.7693 30.677C24.1871 30.677 31.0352 23.7091 31.0352 15.2912C31.0352 6.87341 24.1871 0.0252686 15.7693 0.0252686ZM23.3256 20.3075C24.0261 21.0079 24.0261 22.1472 23.3256 22.8482C22.6306 23.5427 21.4913 23.554 20.7849 22.8482L15.7693 17.8308L10.6333 22.8488C9.93287 23.5492 8.7936 23.5492 8.09257 22.8488C7.39213 22.1484 7.39213 21.0091 8.09257 20.3081L13.1094 15.2912L8.09257 10.2744C7.39213 9.57339 7.39213 8.43413 8.09257 7.73369C8.7936 7.03325 9.93287 7.03325 10.6333 7.73369L15.7693 12.7517L20.7849 7.73369C21.4841 7.03445 22.6234 7.03205 23.3256 7.73369C24.0261 8.43413 24.0261 9.57339 23.3256 10.2744L18.3088 15.2912L23.3256 20.3075Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2061_478">
                        <rect
                          width="30.6517"
                          height="30.6517"
                          fill="white"
                          transform="translate(0.383545 0.0252686)"
                        />
                      </clipPath>
                    </defs>
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

export default FreeSubscription;
