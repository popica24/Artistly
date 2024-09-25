import { NavLinkProps } from "../../../../utils/types";
type Props = {
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchOpen: boolean;
} & NavLinkProps;
const MobileSearchLink = (props: Props) => {
  return (
    <span
      onClick={() => props.setSearchOpen(true)}
      className={
        props.searchOpen
          ? "mobile-active-navlink flex flex-col items-center justify-center text-center py-3 px-3 rounded-t-[1.25rem]"
          : `flex flex-col items-center justify-center text-center py-3 px-3 rounded-t-[1.25rem]
        bg-transparent`
      }
    >
      {props.svg}
      <span className="text-[0.7rem]">{props.text}</span>
    </span>
  );
};

export default MobileSearchLink;
