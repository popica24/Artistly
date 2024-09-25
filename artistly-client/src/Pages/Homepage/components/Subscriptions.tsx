import FreeSubscription from "./FreeSubscription";
import PremiumSubscription from "./PremiumSubscription";

const Subscriptions = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <span className="text-center text-[20px] font-semibold text-[#2D3047] tablet:hidden">
        Alege-ți Abonamentul Perfect!
      </span>
      <div className="flex max-w-[93ch] my-8 tablet:hidden">
        <span className="text-start text-[16px]">
          Exploră conținut exclusiv și personalizat cu planul nostru GRATUIT sau
          PREMIUM. Îmbogățește-ți experiența cu resurse de calitate, informații
          relevante și inovații unice!
        </span>
      </div>
      <div className="flex flex-row tablet:flex-col items-start tablet:items-center">
        <div className="flex flex-col items-end justify-end me-12 mt-6 tablet:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="220"
            height="85.42"
            viewBox="0 0 158 114"
            fill="none"
          >
            <g clip-path="url(#clip0_2061_443)">
              <path
                d="M148.786 37.588C146.83 36.8177 144.76 36.2708 142.956 35.2594C126.87 26.1674 109.625 25.8478 92.2286 29.398C86.2268 30.6237 80.1334 33.5979 75.1483 37.2226C60.8957 47.6011 49.4905 60.7105 41.8599 76.7423C39.6624 81.3574 38.3282 86.3952 37.693 91.8696C38.8774 90.6702 40.1051 89.4973 41.2402 88.2586C44.5689 84.5782 47.7203 80.716 51.2449 77.2241C52.7736 75.6948 54.954 74.7016 57.0095 73.8747C57.7691 73.5698 59.4041 74.1163 59.8994 74.8177C60.3524 75.4612 60.2401 77.2659 59.6695 77.778C50.319 86.1988 43.9112 96.9186 36.5366 106.891C33.945 110.386 31.5154 110.874 28.4967 108.176C20.8143 101.338 14.9981 93.063 10.8692 83.635C10.7273 83.3284 11.0716 82.7969 11.4174 81.5976C20.3335 80.9315 21.7264 90.1518 28.4877 94.9651C28.7131 92.9685 28.6839 91.462 29.0425 90.0552C36.1454 62.9139 52.6256 42.6483 75.6113 27.3144C79.1128 24.9809 83.274 23.3349 87.3557 22.2221C102.544 18.0956 117.83 18.174 132.761 23.2249C137.565 24.8488 141.932 27.9779 146.252 30.8031C147.927 31.9052 148.927 34.0329 150.237 35.691C149.757 36.3319 149.29 36.9668 148.804 37.5949L148.786 37.588Z"
                fill="#B3B3B3"
              />
            </g>
            <defs>
              <clipPath id="clip0_2061_443">
                <rect
                  width="146.632"
                  height="57.3778"
                  fill="white"
                  transform="translate(157.802 52.0755) rotate(155.173)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="max-w-[26ch] mt-8">
            Cu abonamentul{" "}
            <span className="font-medium text-[#E6B663]">GRATUIT</span>,
            beneficiezi de <strong>o afișare PREMIUM gratuită</strong>, oferită
            de noi, pentru a accesa informațiile premium ale unui profil de
            artist.
          </span>
        </div>
        <FreeSubscription />
        <div className="w-[120px] tablet:my-4"></div>
        <PremiumSubscription />
        <div className="flex flex-col items-start justify-start ms-12 mt-6 tablet:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="220"
            height="85.42"
            viewBox="0 0 164 114"
            fill="none"
          >
            <g clip-path="url(#clip0_2061_447)">
              <path
                d="M8.96148 39.6571C10.9605 38.7761 13.0872 38.1223 14.9179 36.9972C31.2445 26.8885 49.1389 25.8409 67.3504 28.8056C73.6335 29.8292 80.0844 32.6648 85.4113 36.2218C100.642 46.4074 113.029 59.5469 121.618 75.8777C124.092 80.5788 125.686 85.7547 126.573 91.4129C125.293 90.2166 123.97 89.0496 122.74 87.8105C119.13 84.1269 115.698 80.2472 111.893 76.7675C110.242 75.2429 107.937 74.302 105.768 73.5286C104.966 73.2435 103.291 73.8789 102.806 74.6278C102.362 75.3148 102.554 77.1841 103.168 77.6923C113.227 86.0484 120.325 96.9139 128.397 106.964C131.233 110.485 133.776 110.891 136.799 107.964C144.493 100.545 150.189 91.7103 154.085 81.749C154.22 81.4247 153.84 80.887 153.431 79.6561C144.145 79.3344 143.081 88.9666 136.26 94.2453C135.943 92.1814 135.911 90.6158 135.48 89.1699C126.978 61.2811 109.024 40.9212 84.5194 25.9522C80.7866 23.6745 76.3973 22.138 72.1126 21.1518C56.1696 17.4972 40.3 18.213 25.0054 24.0775C20.0839 25.9631 15.6789 29.3935 11.3106 32.5066C9.61744 33.7204 8.66745 35.9713 7.37527 37.7475C7.90027 38.3931 8.41174 39.033 8.94234 39.665L8.96148 39.6571Z"
                fill="#B3B3B3"
              />
            </g>
            <defs>
              <clipPath id="clip0_2061_447">
                <rect
                  width="152.385"
                  height="59.6288"
                  fill="white"
                  transform="matrix(0.92362 0.38331 0.38331 -0.92362 0.199951 55.0751)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="max-w-[26ch] mt-8">
            Optând pentru planul{" "}
            <span className="font-medium text-[#5B0097]">PREMIUM</span>,
            beneficiezi de acces nelimitat la informațiile premium ale tuturor
            artiștilor, incluzând date de contact și prețuri.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
