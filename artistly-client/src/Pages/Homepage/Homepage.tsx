import { CSSProperties, FC } from "react";
import PromotingBanner from "./components/PromotingBanner";
import "./index.css";
import LatestAdded from "./components/LatestAdded";
import CategoryShowcase from "./components/CategoryShowcase";
import FAQ from "./components/FAQ";
import AboutUs from "./components/AboutUs";
import TopClients from "./components/TopClients";
const Homepage: FC = () => {
  const appShadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
  };
  return (
    <>
      <PromotingBanner />
      <span className="text-center flex items-center justify-center text-black tablet:hidden text-[1.2rem] font-medium py-[6.13rem] leading-7 px-5">
        Bine ai venit pe ARTISTLY, destinatia ta unică pentru a găsi cei mai
        talentați artiști, fotografi, videografi și multe altele pentru
        evenimentul tău special. Aici, punem lumea creativității la dispoziția
        ta!"
      </span>
      <CategoryShowcase />
      <TopClients />
      <LatestAdded /> <FAQ />
      <AboutUs />
      <div className="flex flex-row items-center justify-center mb-20 tablet:hidden">
        <div className="bg-[#ff5a5a4d] max-w-[52ch] text-start flex items-center px-5 py-3 rounded-[15px] text-[15px]">
          <span>
            Aplicatia este în dezvoltare și va fi disponibila în curând. Rămâi
            conectat pentru actualizări
          </span>
        </div>
        <div
          className="bg-[#F9F9F9] rounded-[15px] flex items-center justify-center flex-row px-5 py-4 ms-4"
          style={appShadow}
        >
          <svg
            className="me-2"
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="34"
            viewBox="0 0 42 41"
            fill="none"
          >
            <g clip-path="url(#clip0_2042_3765)">
              <path
                d="M29.2538 0.0174561C29.3488 0.0174561 29.4439 0.0174561 29.5444 0.0174561C29.7775 2.89813 28.678 5.05056 27.3417 6.60928C26.0305 8.15723 24.235 9.65856 21.331 9.43076C21.1373 6.59134 22.2386 4.59855 23.5732 3.04342C24.8108 1.59411 27.0798 0.304447 29.2538 0.0174561Z"
                fill="black"
              />
              <path
                d="M38.0448 30.001C38.0448 30.0297 38.0448 30.0548 38.0448 30.0817C37.2287 32.5534 36.0646 34.6718 34.644 36.6376C33.3471 38.4224 31.7579 40.8241 28.9203 40.8241C26.4683 40.8241 24.8397 39.2475 22.3267 39.2044C19.6685 39.1614 18.2066 40.5228 15.7762 40.8654C15.4981 40.8654 15.2201 40.8654 14.9475 40.8654C13.1627 40.6071 11.7224 39.1937 10.6731 37.9201C7.57899 34.157 5.188 29.2961 4.74316 23.0755C4.74316 22.4657 4.74316 21.8576 4.74316 21.2478C4.9315 16.7958 7.09469 13.1761 9.96998 11.4219C11.4874 10.4892 13.5735 9.69459 15.8963 10.0497C16.8918 10.204 17.9088 10.5448 18.8003 10.882C19.6451 11.2067 20.7016 11.7824 21.7025 11.752C22.3805 11.7322 23.0549 11.3789 23.7383 11.1295C25.7401 10.4067 27.7024 9.578 30.2889 9.96723C33.3974 10.4372 35.6036 11.8183 36.9668 13.9492C34.3373 15.6227 32.2584 18.1447 32.6135 22.4513C32.9292 26.3634 35.2036 28.6521 38.0448 30.001Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_2042_3765">
                <rect
                  width="40.8478"
                  height="40.8477"
                  fill="white"
                  transform="translate(0.968994 0.0209961)"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="flex flex-col text-start leading-4">
            <span className="text-[10px]">Descarca din</span>
            <span className="text-[18px] font-medium">App Store</span>
          </div>
        </div>
        <div
          className="bg-[#F9F9F9] rounded-[15px] flex items-center justify-center flex-row px-5 py-4 ms-4"
          style={appShadow}
        >
          <svg
            className="me-2"
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 43 43"
            fill="none"
          >
            <g clip-path="url(#clip0_2042_3776)">
              <path
                d="M3.72091 1.47378C3.24548 1.97697 2.96436 2.75825 2.96436 3.77055V39.9264C2.96436 40.9395 3.24556 41.72 3.72091 42.2232L3.84188 42.341L24.0957 22.0874V21.8486V21.6096L3.84188 1.3551L3.72091 1.47378Z"
                fill="url(#paint0_linear_2042_3776)"
              />
              <path
                d="M30.8468 28.8416L24.0959 22.0874V21.8486V21.6096L30.8484 14.8572L31.0006 14.944L38.9994 19.489C41.2843 20.787 41.2843 22.911 38.9994 24.2098L31.0006 28.7548L30.8468 28.8416Z"
                fill="url(#paint1_linear_2042_3776)"
              />
              <path
                d="M31.0004 28.7536L24.0957 21.8483L3.72095 42.2229C4.4743 43.0202 5.71738 43.1189 7.11831 42.3233L31.0004 28.7536Z"
                fill="url(#paint2_linear_2042_3776)"
              />
              <path
                d="M31.0007 14.9431L7.11855 1.37347C5.71762 0.577825 4.47454 0.676542 3.72119 1.47383L24.096 21.8486L31.0007 14.9431Z"
                fill="url(#paint3_linear_2042_3776)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_2042_3776"
                x1="22.2996"
                y1="3.38934"
                x2="-5.13666"
                y2="30.8255"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00A0FF" />
                <stop offset="0.0066" stop-color="#00A2FF" />
                <stop offset="0.2601" stop-color="#00BEFF" />
                <stop offset="0.5122" stop-color="#00D2FF" />
                <stop offset="0.7604" stop-color="#00DFFF" />
                <stop offset="1" stop-color="#00E3FF" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2042_3776"
                x1="41.9744"
                y1="21.8493"
                x2="2.41669"
                y2="21.8493"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FFE000" />
                <stop offset="0.4087" stop-color="#FFBD00" />
                <stop offset="0.7754" stop-color="#FFA600" />
                <stop offset="1" stop-color="#FF9C00" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2042_3776"
                x1="27.2486"
                y1="25.6004"
                x2="-9.95715"
                y2="62.8061"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF3743" />
                <stop offset="1" stop-color="#E30864" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2042_3776"
                x1="-1.40898"
                y1="-10.5614"
                x2="15.2049"
                y2="6.05252"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00A06F" />
                <stop offset="0.0685" stop-color="#00A86E" />
                <stop offset="0.4762" stop-color="#00CF6E" />
                <stop offset="0.8009" stop-color="#00E76D" />
                <stop offset="1" stop-color="#00EF6D" />
              </linearGradient>
              <clipPath id="clip0_2042_3776">
                <rect
                  width="42.0492"
                  height="42.0492"
                  fill="white"
                  transform="translate(0.813477 0.823242)"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="flex flex-col text-start leading-4">
            <span className="text-[10px]">Descarca din</span>
            <span className="text-[18px] font-medium">Google Play</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
