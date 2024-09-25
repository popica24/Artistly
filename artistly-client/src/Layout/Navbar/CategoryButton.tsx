import { CSSProperties, useState } from "react";
import { Category } from "../../utils/types";
import { Link } from "react-router-dom";

const CategoryButton = (props: Category) => {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const shadow: CSSProperties = {
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
  };
  return (
    <Link
      to={props.to}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="px-8 lg:px-6 py-3 rounded-s-[1.96875rem]">
        <span className="text-[#362055] font-medium text-[0.9rem]">
          {props.categoryName}
        </span>
        {hovered && (
          <span className="bg-[#354F52] w-[40px] h-[10px] absolute bottom-0 -translate-x-[50%] left-[50%] rounded-t-[1.875rem]" />
        )}
      </div>
      {hovered && (
        <div className="absolute pt-2 z-[2] -translate-x-[50%] left-[50%]">
          <div
            className="shadow-md flex flex-col text-start bg-white px-8 py-6 rounded-[1.25rem]"
            style={shadow}
          >
            {props.subcategories.map((s, i) => (
              <Link
                to={`catalogue?subcategory=${s.subcategoryId}`}
                key={i}
                className="font-normal text-[1rem] my-1 whitespace-nowrap flex flex-row items-center subcategory-link"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-white me-1 subcategory-bullet"></span>
                <span>{s.subcategoryName}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Link>
  );
};

export default CategoryButton;
