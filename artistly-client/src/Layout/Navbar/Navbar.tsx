import { Link, useLocation } from "react-router-dom";
import AccountManager from "./AccountManager";
import CategoryButton from "./CategoryButton";
import { CSSProperties, useEffect, useRef, useState } from "react";
import Searchbar from "./Searchbar";
import useUserRole from "../../hooks/useRole";
import { useAuth } from "../../Contexts/AuthContext";
import { useWishlist } from "../../Contexts/WishlistProvider";
import { categories } from "../../data/data";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { currentUser } = useAuth();
  const { role } = useUserRole();
  const wrapperRef = useRef(null);
  const location = useLocation();
  const shadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          //alert("You clicked outside of me!");
          setShowSearch(false);
        } else {
          // alert("You clicked inside of me!");
          setShowSearch(true);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
    useEffect(() => {
      // Set showSearch to false when the route changes
      setShowSearch(false);
    }, [location]);
  }
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 120);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { items } = useWishlist();

  const handleToggleSearch = () => setShowSearch(!showSearch);

  // const wishlistCount =
  //   JSON.parse(localStorage.getItem("wishlist")!).length || 0;

  return (
    <>
      {role !== 333 && !scrolled && (
        <div className="bg-white py-1 container">
          <span className="flex justify-start flex-row ms-2">
            <span className="font-medium text-[0.9rem] me-5">
              Cum devin partener?
            </span>
            <Link
              to={currentUser ? "/account-request" : "/login"}
              state={{ toAccountRequest: true }}
              className="font-medium text-[#07C] text-[0.9rem]"
            >
              Solicita cont partener
            </Link>
          </span>
        </div>
      )}

      <div
        className={`bg-[#FAEDCD] tablet:hidden mobile:hidden ${
          scrolled ? "fixed w-full z-10" : ""
        }`}
      >
        <div className={`mx-auto container ${scrolled ? "py-3" : "py-9"}`}>
          <div className="flex flex-row items-center justify-between">
            <Link to={"/"} state={{ toSubscription: false }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={scrolled ? 150 : 190}
                height="44"
                viewBox="0 0 244 57"
                fill="none"
              >
                <g clipPath="url(#clip0_2042_4304)">
                  <path
                    d="M0 29.1756C0 29.1756 40.4471 33.4224 53.591 55.3701C54.55 56.9727 56.6372 57.4826 58.2204 56.4938C59.0502 55.9766 59.8836 55.2663 61.2102 53.9096C61.2102 53.9096 53.1506 37.9187 24.0441 24.2642C16.2993 20.9498 9.43711 19.6514 3.06624 19.6514C0.818877 19.6514 0.211088 20.9753 0 29.1738L0 29.1756Z"
                    fill="url(#paint0_linear_2042_4304)"
                  />
                  <path
                    d="M20.4064 19.2289C20.4064 19.2289 49.1362 29.0026 61.2101 53.9133C61.2101 53.9133 63.614 51.4184 60.02 43.1834C55.9002 35.0687 40.1486 4.53633 40.1486 4.53633C40.1486 4.53633 38.5581 0.322335 33.9488 0.0163929C29.3394 -0.28955 27.1685 4.20853 27.1685 4.20853L19.8368 15.5157C19.8368 15.5157 18.0607 17.67 20.4045 19.2289H20.4064Z"
                    fill="url(#paint1_linear_2042_4304)"
                  />
                  <path
                    d="M9.86838 33.8613C9.86838 33.8613 7.0842 39.2226 4.6494 46.2174C2.2146 53.2122 4.2436 53.2978 8.71649 55.8946C12.7654 58.0872 14.738 56.4355 16.201 55.0533C17.6641 53.6693 22.0624 40.7723 27.6417 39.5176C27.6417 39.5176 18.0954 34.9103 9.86656 33.8613H9.86838Z"
                    fill="url(#paint2_linear_2042_4304)"
                  />
                  <path
                    d="M107.848 17.1272H113.198V19.4619C114.885 17.5261 117.218 16.3333 120.095 16.3333C120.839 16.3333 121.583 16.4334 122.327 16.5809V23.2352C121.137 23.0367 120.046 23.0367 118.903 23.0367C116.224 23.0367 114.09 24.774 114.09 26.9593V41.9559H106.498V18.4767C106.498 17.7318 107.102 17.1272 107.846 17.1272H107.848Z"
                    fill="#333333"
                  />
                  <path
                    d="M129.574 33.2183V23.1878H124.611V17.129H129.574V12.4197C129.574 11.3999 130.4 10.575 131.417 10.575H137.166V17.129H143.269V23.1878H137.166V33.2183C137.166 34.6588 138.157 35.502 139.398 35.502H143.269V41.9577H139.398C133.99 41.9577 129.574 38.7799 129.574 33.2183Z"
                    fill="#333333"
                  />
                  <path
                    d="M151.407 5.10986C153.789 5.10986 155.774 7.09667 155.774 9.48047C155.774 11.8643 153.789 13.8511 151.407 13.8511C149.025 13.8511 147.09 11.8643 147.09 9.48047C147.09 7.09667 149.025 5.10986 151.407 5.10986ZM147.636 17.1272H155.228V41.9559H147.636V17.1272Z"
                    fill="#333333"
                  />
                  <path
                    d="M159.297 33.6154H166.591C166.591 35.3035 168.03 36.9917 171.007 36.9917C173.091 36.9917 174.53 36.0975 174.53 34.9065C174.53 33.5662 172.843 33.0199 169.568 32.3242C165.3 31.3809 159.694 29.6927 159.694 24.3788C159.694 18.7171 165.897 16.3333 170.659 16.3333C176.812 16.3333 181.725 20.305 181.725 25.1728H174.481C174.481 23.7323 173.142 22.0933 170.512 22.0933C168.578 22.0933 167.288 22.9875 167.288 24.1293C167.288 25.619 169.471 26.2145 172.348 26.81C176.863 27.8534 182.124 29.5416 182.124 34.7062C182.124 40.5155 175.524 42.7518 170.811 42.7518C164.36 42.7518 159.299 38.6798 159.299 33.6154H159.297Z"
                    fill="#333333"
                  />
                  <path
                    d="M189.168 33.2184V23.1879H184.206V17.1292H189.168V13.2375C189.168 11.7661 190.36 10.5732 191.83 10.5732H196.76V17.1273H202.863V23.1861H196.76V33.2166C196.76 34.6571 197.752 35.5003 198.993 35.5003H202.863V41.956H198.993C193.584 41.956 189.168 38.7782 189.168 33.2166V33.2184Z"
                    fill="#333333"
                  />
                  <path
                    d="M208.35 5.60693H213.703C214.322 5.60693 214.822 6.10773 214.822 6.7269V40.8377C214.822 41.4568 214.322 41.9576 213.703 41.9576H208.35C207.731 41.9576 207.231 41.4568 207.231 40.8377V6.7269C207.231 6.10773 207.731 5.60693 208.35 5.60693Z"
                    fill="#333333"
                  />
                  <path
                    d="M220.132 45.4343H224.003C225.391 45.4343 226.138 44.5893 226.632 43.1507L227.377 41.264L217.949 17.1292H225.59L231.196 32.7723L236.803 17.1292H243.998L234.323 41.9578L233.826 43.1488C231.841 48.3626 229.459 51.8882 224.001 51.8882H220.131V45.4325L220.132 45.4343Z"
                    fill="#333333"
                  />
                  <path
                    d="M71.6153 28.9024C71.6153 20.9788 78.1864 14.5649 85.2961 14.5649C88.7972 14.5649 91.8143 16.1274 93.9143 18.7152V15.4263H98.8621C100.145 15.4263 101.184 16.4662 101.184 17.75V42.3766H95.9105C94.8078 42.3766 93.9125 41.4824 93.9125 40.377V39.0877C91.8125 41.6755 88.7954 43.2379 85.2942 43.2379C78.1846 43.2379 71.6135 36.8241 71.6135 28.9005L71.6153 28.9024ZM86.4279 35.9645C90.0364 35.9645 92.999 32.7849 92.999 28.9042C92.999 25.0234 90.0364 21.8438 86.4279 21.8438C82.8194 21.8438 79.8569 25.0234 79.8569 28.9042C79.8569 32.7849 82.8194 35.9645 86.4279 35.9645Z"
                    fill="#333333"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_2042_4304"
                    x1="-3.87784"
                    y1="17.1419"
                    x2="68.5383"
                    y2="59.3131"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFBA08" />
                    <stop offset="1" stopColor="#F7931E" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_2042_4304"
                    x1="19.1944"
                    y1="26.9557"
                    x2="61.9981"
                    y2="26.9557"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFBA08" />
                    <stop offset="1" stopColor="#F7931E" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_2042_4304"
                    x1="21.7803"
                    y1="31.5103"
                    x2="9.30313"
                    y2="52.8508"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFBA08" />
                    <stop offset="1" stopColor="#F7931E" />
                  </linearGradient>
                  <clipPath id="clip0_2042_4304">
                    <rect width="244" height="57" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <div
              className="flex flex-row items-center bg-white rounded-s-[1.96875rem] rounded-e-[1.875rem] relative"
              style={shadow}
            >
              <div className="flex flex-row border-e-2">
                {categories?.map((c, i) => (
                  <CategoryButton
                    to={`/catalogue?subcategory=${c.subcategories[0].subcategoryId}`}
                    categoryName={c.categoryName}
                    subcategories={c.subcategories}
                    categoryId={c.categoryId}
                    key={i}
                  />
                ))}
              </div>
              <div className="absolute flex w-full top-0" ref={wrapperRef}>
                {showSearch && <Searchbar />}
              </div>
              <button
                className=" rounded-e-[1.875rem] px-5 flex items-center justify-center h-full relative"
                onClick={handleToggleSearch}
              >
                {!showSearch && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.3467 12.5064C14.635 13.6601 13.6603 14.6348 12.5064 15.3467L16.5715 19.4118C17.3558 20.1961 18.6274 20.1961 19.4116 19.4118C19.4117 19.4117 19.4117 19.4117 19.4118 19.4116C20.1961 18.6274 20.1961 17.3558 19.4118 16.5715L15.3467 12.5064ZM7.96463 0C3.56884 0 0 3.56884 0 7.96463C0 12.3604 3.56884 15.9292 7.96463 15.9292C12.3604 15.9292 15.9292 12.3604 15.9292 7.96463C15.9292 3.56884 12.3604 0 7.96463 0ZM7.96463 2.73923C10.8486 2.73923 13.19 5.08064 13.19 7.96463C13.19 10.8486 10.8486 13.19 7.96463 13.19C5.08064 13.19 2.73923 10.8486 2.73923 7.96463C2.73923 5.08064 5.08064 2.73923 7.96463 2.73923Z"
                      fill="#362055"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div
              className={`flex flex-row ${
                currentUser ? "justify-end" : "justify-between"
              } items-center w-full max-w-[15rem]`}
            >
              {currentUser ? (
                <div className="me-5 relative">
                  <Link to={"/wishlist"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 26 35"
                      fill="none"
                    >
                      <path
                        d="M24.8182 0H1.18182C0.868383 0 0.567782 0.122915 0.346148 0.341708C0.124514 0.5605 2.36743e-06 0.857247 2.36743e-06 1.16667V33.8333C-0.000440902 34.052 0.0613711 34.2664 0.178388 34.452C0.295405 34.6377 0.462916 34.7871 0.66182 34.8833C0.863375 34.9764 1.08709 35.0126 1.3082 34.9879C1.52931 34.9632 1.73917 34.8785 1.91455 34.7433L13 25.9933L24.0855 34.7433C24.2943 34.9064 24.5519 34.9967 24.8182 35C24.9975 34.9945 25.1741 34.9549 25.3382 34.8833C25.5371 34.7871 25.7046 34.6377 25.8216 34.452C25.9386 34.2664 26.0004 34.052 26 33.8333V1.16667C26 0.857247 25.8755 0.5605 25.6539 0.341708C25.4322 0.122915 25.1316 0 24.8182 0Z"
                        fill="#3B3B3B"
                      />
                    </svg>
                    {items && items.length > 0 && (
                      <div className="absolute -top-2 -left-2">
                        <span className="rounded-full bg-[#C72E1F] flex items-center justify-center text-center w-[17px] h-[17px] text-white text-[12px] ">
                          {items.length}
                        </span>
                      </div>
                    )}
                  </Link>
                </div>
              ) : (
                <></>
              )}
              <AccountManager />
            </div>
          </div>
        </div>
      </div>
      {location.pathname === "/" && (
        <div className="w-full absolute h-[250px] top-[120px] left-0 bg-[#FAEDCD] tablet:hidden" />
      )}
      {scrolled && <div className="tablet:hidden h-[144px]" />}
    </>
  );
};

export default Navbar;
