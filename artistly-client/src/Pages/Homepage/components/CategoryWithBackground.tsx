import { CSSProperties } from "react";
import { Link } from "react-router-dom";

type Props = {
  path: string;
  containerClasses: string;
  textClasses: string;
  gradient: string;
  text: string;
  to: string;
  bgProps: string;
};

const CategoryWithBackground = (props: Props) => {
  const bgStyle: CSSProperties = {
    background: `url(${props.path}) ${props.bgProps}`,
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  const overlayStyle: CSSProperties = {
    background: `linear-gradient(${props.gradient})`,
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  return (
    <Link
      to={props.to}
      className={`relative cursor-pointer category-cardboard shadow-md ${props.containerClasses}`}
      style={bgStyle}
    >
      <span
        className={`text-white absolute ${props.textClasses} z-[1] font-semibold text-[1.5rem]`}
      >
        {props.text}
      </span>
      <div
        className="category-bg-overlay absolute h-full w-full"
        style={overlayStyle}
      />
    </Link>
  );
};

export default CategoryWithBackground;
