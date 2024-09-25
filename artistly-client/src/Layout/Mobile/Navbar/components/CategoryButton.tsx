import { Subcategory } from "../../../../utils/types";
import { Link } from "react-router-dom";

type Props = {
  categoryName: string;
  key: number;
  index: number;
  subcategories: Subcategory[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryOpenIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  isOpen: boolean;
};

const CategoryButton = (props: Props) => {
  const toggleOpen = () => {
    const newIndex = props.index;
    if (props.isOpen) {
      props.setCategoryOpenIndex(undefined);
    } else {
      props.setCategoryOpenIndex(newIndex);
    }
  };
  return (
    <>
      <span
        onClick={toggleOpen}
        className={`${
          props.isOpen
            ? "bg-[#354F52] text-white"
            : "bg-[#EEE] text-black shadow-xl border-2 border-[#354F52]"
        }  py-4 px-8 my-4 rounded-[5.1875rem] w-full flex flex-row justify-between items-center font-medium`}
        key={props.key}
      >
        {props.categoryName}
        {!props.isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
          >
            <path
              d="M2.47296e-05 1.50748C-0.00162511 1.20979 0.0812397 0.918325 0.238052 0.67025C0.394865 0.422175 0.618521 0.228728 0.880507 0.114572C1.14249 0.000416004 1.43094 -0.0292767 1.70907 0.0292794C1.9872 0.0878356 2.24241 0.231987 2.44216 0.443357L9.99709 8.3868L17.552 0.443357C17.8209 0.161135 18.1857 0.00258383 18.566 0.00258385C18.7543 0.00258385 18.9408 0.0415088 19.1148 0.117137C19.2888 0.192765 19.4468 0.303615 19.58 0.443357C19.7132 0.5831 19.8188 0.748997 19.8908 0.93158C19.9629 1.11416 20 1.30985 20 1.50748C20 1.9066 19.8489 2.28938 19.58 2.5716L11.0111 11.5642C10.7435 11.8433 10.3815 12 10.0042 12C9.62693 12 9.26497 11.8433 8.99738 11.5642L0.428469 2.5716C0.293526 2.43279 0.186174 2.26726 0.112629 2.0846C0.0390834 1.90194 0.000808641 1.70577 2.47296e-05 1.50748Z"
              fill={`#2D3047`}
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
          >
            <path
              d="M20 10.4925C20.0016 10.7902 19.9188 11.0817 19.7619 11.3297C19.6051 11.5778 19.3815 11.7713 19.1195 11.8854C18.8575 11.9996 18.5691 12.0293 18.2909 11.9707C18.0128 11.9122 17.7576 11.768 17.5578 11.5566L10.0029 3.6132L2.44798 11.5566C2.17906 11.8389 1.81432 11.9974 1.434 11.9974C1.24568 11.9974 1.05921 11.9585 0.88523 11.8829C0.711249 11.8072 0.553167 11.6964 0.420008 11.5566C0.286849 11.4169 0.181222 11.251 0.109157 11.0684C0.0370918 10.8858 1.56198e-08 10.6901 1.79765e-08 10.4925C2.2736e-08 10.0934 0.151081 9.71062 0.420008 9.4284L8.98892 0.435828C9.2565 0.156682 9.61847 -8.38975e-07 9.99577 -8.34476e-07C10.3731 -8.29977e-07 10.735 0.156682 11.0026 0.435828L19.5715 9.4284C19.7065 9.56721 19.8138 9.73274 19.8874 9.9154C19.9609 10.0981 19.9992 10.2942 20 10.4925Z"
              fill="white"
            />
          </svg>
        )}
      </span>
      {props.isOpen && (
        <div className="flex flex-col items-center justify-center w-full px-4 ">
          {props.subcategories.map((s, i) => (
            <Link
              onClick={() => props.setIsOpen(false)}
              to={`/catalogue?subcategory=${s.subcategoryId}`}
              key={i}
              className="bg-[#EEE] w-full my-2 py-2 px-4 rounded-[0.625rem] shadow-xl border-2 border-[#354F52]"
            >
              {s.subcategoryName}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryButton;
