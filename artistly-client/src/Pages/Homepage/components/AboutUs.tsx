import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const containerStyle: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  const shadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  const buttonShadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  return (
    <div
      style={shadow}
      className="bg-[#FAEDCD] rounded-[1rem] tablet:max-w-[90vmin] max-w-[1100px] mx-auto relative my-24"
    >
      <div
        className="bg-white flex items-center justify-center absolute rounded-full tablet:left-[50%] tablet:-translate-x-[50%] left-10 -translate-y-[50%] p-4 shadow-md"
        style={containerStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="63"
          viewBox="0 0 58 53"
          fill="none"
        >
          <g clip-path="url(#clip0_1669_2406)">
            <path
              d="M0 27.1288C0 27.1288 37.8376 31.0775 50.1345 51.4854C51.0325 52.9747 52.984 53.4497 54.4665 52.5313C55.2426 52.05 56.023 51.3906 57.2641 50.1288C57.2641 50.1288 49.7247 35.2589 22.4952 22.5629C15.2513 19.4811 8.83014 18.274 2.86961 18.274C0.7677 18.274 0.198014 19.5053 0.0010589 27.1277L0 27.1288Z"
              fill="url(#paint0_linear_1669_2406)"
            />
            <path
              d="M19.0908 17.8791C19.0908 17.8791 45.9688 26.9666 57.263 50.1288C57.263 50.1288 59.5121 47.8085 56.1501 40.1513C52.2968 32.6068 37.5601 4.21619 37.5601 4.21619C37.5601 4.21619 36.0713 0.298065 31.7605 0.0136849C27.4487 -0.270695 25.4188 3.91285 25.4188 3.91285L18.5603 14.4265C18.5603 14.4265 16.8989 16.4298 19.0919 17.8791H19.0908Z"
              fill="url(#paint1_linear_1669_2406)"
            />
            <path
              d="M9.23251 31.4851C9.23251 31.4851 6.62762 36.4702 4.34994 42.9751C2.07225 49.479 3.97085 49.559 8.15561 51.9741C11.9433 54.0122 13.7889 52.4776 15.1581 51.1916C16.5272 49.9045 20.6421 37.9121 25.8614 36.7461C25.8614 36.7461 16.9307 32.4625 9.23357 31.4861L9.23251 31.4851Z"
              fill="url(#paint2_linear_1669_2406)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1669_2406"
              x1="-3.62778"
              y1="15.939"
              x2="63.908"
              y2="55.5087"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFBA08" />
              <stop offset="1" stop-color="#F7931E" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1669_2406"
              x1="17.9568"
              y1="25.0644"
              x2="58"
              y2="25.0644"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFBA08" />
              <stop offset="1" stop-color="#F7931E" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1669_2406"
              x1="20.3753"
              y1="29.2985"
              x2="8.80833"
              y2="49.2031"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFBA08" />
              <stop offset="1" stop-color="#F7931E" />
            </linearGradient>
            <clipPath id="clip0_1669_2406">
              <rect width="58" height="53" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="flex tablet:flex-col flex-row-reverse tablet:justify-center tablet:items-center items-end tablet:pt-12 py-3">
        <span className="text-[#2D3047] tablet:text-[0.875rem] text-[0.9rem] tablet:px-5 py-4 tablet:ms-0 pe-10 leading-5">
          Conectăm lumea evenimentelor cu cei mai talentați artiști, fotografi,
          videografi și oferim acces la cele mai căutate locații și trupe. Aici
          veți descoperi profesioniștii perfecți pentru orice tip de eveniment.
          Fie că planificați o nuntă de vis, un eveniment corporativ de neuitat
          sau o petrecere privată, platforma noastră este puntea către o
          experiență memorabilă.
        </span>
        <Link
          style={buttonShadow}
          to={"/about"}
          className="bg-white px-5 py-0.5 text-[0.9rem] rounded-[6.69475rem] mb-4 flex-shrink-0 mx-11 tablet:mx-0 hover:bg-[#354F52] hover:text-white"
        >
          Mai mult
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
