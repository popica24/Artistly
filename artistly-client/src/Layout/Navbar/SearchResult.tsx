import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

type Props = {
  clientName: string;
  clientTag: string;
  urlPath: string;
};

const SearchResult = (props: Props) => {
  const { currentUser } = useAuth();
  return (
    <Link
      className="flex flex-row items-center cursor-pointer searchbar-result hover:font-medium"
      to={currentUser ? props.urlPath : "/login"}
      state={{ toRegister: false, fromRedirect: true }}
    >
      <svg
        className="mx-5"
        xmlns="http://www.w3.org/2000/svg"
        width="14.41"
        height="14.41"
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
      <span className="my-0.5">{props.clientName}</span>
      <p className="ms-1 opacity-30">- {props.clientTag.toLocaleUpperCase()}</p>
    </Link>
  );
};

export default SearchResult;
