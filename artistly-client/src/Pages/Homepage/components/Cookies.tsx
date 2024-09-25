import { useState } from "react";

const Cookies = () => {
  const [accepted, setAccepted] = useState(false);
  const handleAccept = () => {
    setAccepted(true);
    localStorage.setItem("cookiesEnabled", "true");
  };
  return (
    <div
      className={`bg-[#D6D6D6] fixed tablet:bottom-[59.8px] bottom-0 w-screen py-6 z-10 left-0 tablet:px-2 ${
        accepted && "fadeOut"
      }`}
    >
      <div className="flex flex-row tablet:flex-col items-center justify-center">
        <div className="tablet:hidden">
          <img src="cookie.png" />
        </div>
        <div className="flex flex-col items-start px-4">
          <div className="flex flex-row items-center ">
            <img
              src="cookie.png"
              className="laptop:hidden"
              width={50}
              height={50}
            />
            <span className="font-medium text-[17px] tablet:ms-3">
              Politica Cookie
            </span>
          </div>
          <span className="max-w-[97ch] leading-4 text-[14px] tablet:text-[12px] mt-1 tablet:py-2">
            Artistly.ro utilizează cookie-uri strict necesare, esențiale pentru
            funcționarea și utilizarea acestui website. De asemenea, atât noi
            cât și partenerii noștri utilizăm cookie-uri opționale de
            performanță și analiză care ne permit să măsurăm traficul, sa
            generam statistici și să personalizăm conținutul și reclamele.
          </span>
        </div>
        <div className="flex flex-row tablet:justify-evenly tablet:pt-4 tablet:w-full">
          <a
            target="_blank"
            href={"docs/Politica_cookie_ARTISTLY.pdf"}
            className="laptop:border-r border-[#969696] h-full px-4 font-medium underline underline-offset-2"
          >
            Mai mult
          </a>
          <button
            className="mx-4 bg-[#354F52] text-white px-4 py-1.5 rounded-[30px] text-[14px]"
            onClick={handleAccept}
          >
            Sunt de acord
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
