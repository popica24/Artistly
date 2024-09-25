import { FC, useEffect, useState } from "react";
import "./index.css";
// import { createUser, getUser } from "../../services/usersService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BackButton from "../../components/BackButton";
import MobileNavbar from "../../Layout/Mobile/Navbar/MobileNavbar";
// import { signInWithGoogle, signup } from "../../Contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";

const Authenticate: FC = () => {
  document.title = "Artistly | Inregistrare";
  const navigate = useNavigate();

  const location = useLocation();

  const [isLogin, setIsLogin] = useState(
    location.state?.toRegister !== undefined
      ? !location.state.toRegister
      : false
  );

  const [loading, setLoading] = useState(false);
  const [success, setsuccess] = useState(false);

  useEffect(() => {
    setIsLogin(isLogin);

    setLoading(false);
    setsuccess(false);
  }, [isLogin]);

  const handlesuccess = (message: string) => {
    toast.success(message);
    setsuccess(true);
    setLoading(false);

    setTimeout(() => {
      if (location.state?.fromRedirect !== undefined) {
        navigate(-1);
      } else if (location.state.toAccountRequest !== undefined) {
        window.location.href = "/account-request";
      } else {
        window.location.href = "/";
      }
    }, 3000);
  };

  const handleError = (errorMessage: string) => {
    setLoading(false);
    setsuccess(false);
    toast.error(errorMessage);
  };

  const handleRegisterState = () => {
    setIsLogin(false);
  };

  const handleLoginState = () => {
    setIsLogin(true);
  };

  return (
    <section className="laptop:h-screen flex">
      <div id="login-button" />
      <div
        className={`login-banner w-3/5 laptop:block hidden ${
          isLogin ? "bg-login" : "bg-register"
        }`}
      ></div>
      <div className="login-form px-8 py-10 laptop:w-2/5 w-full ">
        <div className="tablet:hidden">
          <BackButton toHome={location.state?.fromRedirect} />
        </div>
        <div className="login-header-group text-center tablet:my-10 ">
          <span className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="58"
              height="53"
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
            <svg
              className="ms-2"
              xmlns="http://www.w3.org/2000/svg"
              width="170"
              height="46"
              viewBox="0 0 170 46"
              fill="none"
            >
              <path
                d="M35.57 11.7258H40.8231V14.003C42.4793 12.113 44.7688 10.9499 47.5944 10.9499C48.3251 10.9499 49.0558 11.0467 49.7866 11.1926V17.6848C48.6171 17.4912 47.5464 17.4912 46.4249 17.4912C43.794 17.4912 41.6991 19.1875 41.6991 21.3189V35.9519H34.2451V13.0422C34.2451 12.3153 34.8378 11.7258 35.5686 11.7258H35.57Z"
                fill="#464646"
              />
              <path
                d="M56.8974 27.4239V17.6358H52.0264V11.7244H56.8974V7.12805C56.8974 6.13392 57.708 5.32764 58.7075 5.32764H64.3514V11.723H70.344V17.6343H64.3514V27.4224C64.3514 28.8269 65.3262 29.6505 66.5436 29.6505H70.344V35.9491H66.5436C61.2339 35.9491 56.8989 32.8482 56.8989 27.421L56.8974 27.4239Z"
                fill="#464646"
              />
              <path
                d="M78.3315 0C80.6704 0 82.6185 1.93768 82.6185 4.26406C82.6185 6.59044 80.6704 8.52812 78.3315 8.52812C75.9926 8.52812 74.0938 6.59044 74.0938 4.26406C74.0938 1.93768 75.994 0 78.3315 0ZM74.6299 11.7258H82.0839V35.9519H74.6299V11.7258Z"
                fill="#464646"
              />
              <path
                d="M86.0775 27.811H93.2381C93.2381 29.4583 94.6516 31.1055 97.5731 31.1055C99.6185 31.1055 101.032 30.2328 101.032 29.071C101.032 27.7633 99.3759 27.2302 96.161 26.551C91.9713 25.6306 86.4668 23.9833 86.4668 18.7989C86.4668 13.2748 92.5567 10.9499 97.2331 10.9499C103.274 10.9499 108.097 14.8267 108.097 19.5748H100.984C100.984 18.1703 99.6694 16.5707 97.0864 16.5707C95.1862 16.5707 93.9194 17.4435 93.9194 18.5575C93.9194 20.0112 96.0622 20.592 98.8878 21.1744C103.32 22.1916 108.485 23.8389 108.485 28.8789C108.485 34.5474 102.005 36.7278 97.3784 36.7278C91.0459 36.7278 86.076 32.7542 86.076 27.8125L86.0775 27.811Z"
                fill="#464646"
              />
              <path
                d="M115.402 27.4239V17.6358H110.531V11.7245H115.402V7.92857C115.402 6.49229 116.572 5.3291 118.016 5.3291H122.855V11.7245H128.847V17.6358H122.855V27.4239C122.855 28.8284 123.83 29.652 125.047 29.652H128.847V35.9506H125.047C119.737 35.9506 115.402 32.8497 115.402 27.4224V27.4239Z"
                fill="#464646"
              />
              <path
                d="M134.233 0.48407H139.489C140.096 0.48407 140.587 0.973909 140.587 1.57645V34.8581C140.587 35.4621 140.095 35.9505 139.489 35.9505H134.233C133.626 35.9505 133.135 35.4606 133.135 34.8581V1.57645C133.135 0.972464 133.627 0.48407 134.233 0.48407Z"
                fill="#464646"
              />
              <path
                d="M145.8 39.3432H149.6C150.965 39.3432 151.695 38.5196 152.182 37.1151L152.913 35.2742L143.657 11.7258H151.159L156.664 26.9889L162.168 11.7258H169.231L159.732 35.9519L159.245 37.1151C157.297 42.2028 154.958 45.6432 149.6 45.6432H145.8V39.3447V39.3432Z"
                fill="#464646"
              />
              <path
                d="M0 23.2146C0 15.4827 6.45162 9.22458 13.4306 9.22458C16.8678 9.22458 19.8285 10.7505 21.8914 13.2748V10.067H26.7493C28.0089 10.067 29.0301 11.0828 29.0301 12.3356V36.3637H23.8526C22.7688 36.3637 21.8914 35.491 21.8914 34.413V33.1559C19.8299 35.6802 16.8678 37.2061 13.4306 37.2061C6.45017 37.2061 0 30.948 0 23.2161V23.2146ZM14.5405 30.1042C18.0837 30.1042 20.9921 27.0004 20.9921 23.2146C20.9921 19.4288 18.0837 16.3251 14.5405 16.3251C10.9973 16.3251 8.08887 19.4274 8.08887 23.2146C8.08887 27.0019 10.9973 30.1042 14.5405 30.1042Z"
                fill="#464646"
              />
            </svg>
          </span>
          <div className="flex flex-row items-center justify-center mt-10 mb-6">
            <button
              className={
                isLogin
                  ? "login-switch-button-left-toggled text-[0.9rem]"
                  : "login-switch-button-left-untoggled text-[0.9rem]"
              }
              onClick={handleLoginState}
              disabled={loading}
            >
              Intra in cont
            </button>
            <button
              className={
                isLogin
                  ? "login-switch-button-right-untoggled text-[0.9rem]"
                  : "login-switch-button-right-toggled text-[0.9rem]"
              }
              onClick={handleRegisterState}
              disabled={loading}
            >
              Creeaza cont
            </button>
          </div>
        </div>
        {isLogin ? (
          <Login
            success={success}
            setSuccess={setsuccess}
            loading={loading}
            setLoading={setLoading}
            handlesuccess={handlesuccess}
            handleError={handleError}
          />
        ) : (
          <Register
            success={success}
            setSuccess={setsuccess}
            loading={loading}
            setLoading={setLoading}
            handlesuccess={handlesuccess}
            handleError={handleError}
          />
        )}
      </div>

      <MobileNavbar />
    </section>
  );
};

export default Authenticate;
