import { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import { logout, useAuth } from "../../Contexts/AuthContext";
import useUserRole from "../../hooks/useRole";

const AccountManager = () => {
  const buttonShadowStyle: CSSProperties = {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  };
  const containerShadowStyle: CSSProperties = {
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
  };

  const { currentUser, dbUser } = useAuth();

  const { role } = useUserRole();

  const [isHovered, setIsHovered] = useState(false);

  // const uId = currentUser?.uid;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleConfirmLogout = () => {
    logout();
  };

  return currentUser && dbUser && role ? (
    <div
      className="account-wrapper flex flex-row items-center bg-[#FFF] rounded-[1.71875rem] py-0.5 px-1 hover:bg-[#354F52] "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerShadowStyle}
    >
      <span className="text-[#484848] mx-2 text-[0.85rem] font-medium text-center">
        Contul meu
      </span>
      <svg
        className="me-2"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="7"
        viewBox="0 0 17 9"
        fill="none"
      >
        <path
          d="M8.13856 8.99998C7.98755 9.00084 7.83786 8.97247 7.69806 8.91652C7.55827 8.86056 7.43112 8.77811 7.3239 8.6739L0.439492 1.92736C0.223432 1.71563 0.102051 1.42846 0.102051 1.12902C0.102051 0.829588 0.223432 0.542416 0.439492 0.330683C0.655552 0.11895 0.948592 0 1.25415 0C1.5597 0 1.85274 0.11895 2.0688 0.330683L8.13856 6.29012L14.2083 0.341928C14.4278 0.157718 14.7102 0.0614598 14.9989 0.0723905C15.2877 0.0833212 15.5616 0.200635 15.766 0.400889C15.9703 0.601143 16.09 0.869586 16.1012 1.15258C16.1123 1.43557 16.0141 1.71226 15.8262 1.92736L8.94174 8.6739C8.72802 8.88163 8.43957 8.99874 8.13856 8.99998Z"
          fill="#484848"
        />
      </svg>
      <div>
        <div
          className={`relative flex justify-center items-center rounded-full w-[40px] h-[40px] bg-[#FFC727] ${
            (role === 989 || role === 409) && "border-2 border-[#510087]"
          }`}
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <span className="uppercase font-semibold text-[1rem]">
            {dbUser?.firstName[0]}
            {dbUser?.lastName[0]}
          </span>
          {(role === 989 || role === 409) && (
            <div className="-top-[2px] -left-[5px] absolute rounded-full bg-[#510087] flex items-center justify-center text-center p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 43 33"
                fill="none"
              >
                <path
                  d="M2.73925 23.5159C1.88292 17.9497 1.02659 12.3835 0.170251 6.81731C-0.0196549 5.58341 1.38429 4.74186 2.38295 5.49092C5.05092 7.4919 7.71875 9.49273 10.3867 11.4937C11.2652 12.1525 12.5166 11.9381 13.1256 11.0245L19.7889 1.02948C20.4931 -0.026754 22.045 -0.026754 22.7492 1.02948L29.4125 11.0245C30.0215 11.9381 31.2729 12.1524 32.1514 11.4937C34.8194 9.49273 37.4872 7.4919 40.1551 5.49092C41.1538 4.74186 42.5578 5.58341 42.368 6.81731C41.5117 12.3835 40.6553 17.9497 39.799 23.5159H2.73925Z"
                  fill="white"
                />
                <path
                  d="M37.8662 32.7795H4.67091C3.60383 32.7795 2.73877 31.9145 2.73877 30.8474V26.603H39.7985V30.8474C39.7984 31.9145 38.9333 32.7795 37.8662 32.7795Z"
                  fill="white"
                />
              </svg>
            </div>
          )}
          {isHovered ? (
            <div className="w-[220px] pt-14 account-menu-wrapper absolute right-0 top-[0.1rem] rounded-xl z-[2]">
              <div
                className="bg-white w-full whitespace-nowrap px-3 py-1 rounded-xl shadow-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="py-2 px-4 account-menu-list">
                  <li className="my-1 text-center">
                    <Link
                      to={"/profile"}
                      state={{ toSubscription: false }}
                      className="hover:font-semibold inline-flex items-center account-menu-action"
                    >
                      <svg
                        className="me-[5px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                      >
                        <circle cx="4.5" cy="4.5" r="4.5" fill="#FFFFF" />
                      </svg>
                      <span>Profilul Meu</span>
                    </Link>
                  </li>
                  <li className="my-1.5 text-center">
                    {/* <form
                      action={
                        import.meta.env.VITE_API_LOCAL_URL +
                        `checkout/create-${
                          role === 409 || role === 989 ? "portal" : "checkout"
                        }-session`
                      }
                      method="POST"
                    >
                      <input type="hidden" name="uId" value={uId} />
                      <button className="text-[#510087] hover:font-semibold inline-flex items-center account-menu-action">
                        <svg
                          className="me-[5px]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="9"
                          height="9"
                          viewBox="0 0 9 9"
                          fill="none"
                        >
                          <circle cx="4.5" cy="4.5" r="4.5" fill="#FFFFF" />
                        </svg>
                        <span>Abonament</span>
                      </button>
                    </form> */}
                    <button
                      className="text-[#510087] hover:font-semibold inline-flex items-center account-menu-action cursor-not-allowed"
                      disabled={true}
                    >
                      <svg
                        className="me-[5px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                      >
                        <circle cx="4.5" cy="4.5" r="4.5" fill="#FFFFF" />
                      </svg>
                      <span>Abonament</span>
                    </button>
                  </li>
                  <li
                    className="my-1 text-center text-[#c10000] hover:font-semibold "
                    onClick={handleConfirmLogout}
                  >
                    <div className="inline-flex items-center account-menu-action">
                      <svg
                        className="me-[5px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                      >
                        <circle cx="4.5" cy="4.5" r="4.5" fill="#FFFFF" />
                      </svg>
                      <span>Iesi din cont</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>
      <button>
        <Link
          to={"/login"}
          state={{ toRegister: true }}
          className="font-medium text-[0.95rem] px-6 py-2 border-2 hover:border-[#354F52] border-transparent rounded-[4.00219rem]  whitespace-nowrap me-4 hover:text-[#354F52]"
        >
          Creează cont
        </Link>
      </button>
      <Link
        to={"/login"}
        state={{ toRegister: false }}
        style={buttonShadowStyle}
        className="font-normal text-[0.95rem] bg-white px-6 py-2 rounded-[4.00219rem] cursor-pointer hover:bg-[#354F52] hover:text-white whitespace-nowrap"
      >
        Intra in cont
      </Link>
    </>
  );
};

export default AccountManager;
