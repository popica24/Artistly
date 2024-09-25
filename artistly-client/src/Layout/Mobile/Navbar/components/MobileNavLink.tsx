import { NavLinkProps } from "../../../../utils/types";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  isUnfocused: boolean;
  isRedirectingToLogin?: boolean;
} & NavLinkProps;

const MobileNavLink = (props: Props) => {
  return (
    <NavLink
      state={{ toRegister: false }}
      to={props.isRedirectingToLogin ? "/login" : props.to}
      className={({ isActive }) =>
        isActive && !props.isUnfocused
          ? "mobile-active-navlink flex flex-col items-center justify-center text-center py-3 px-3 rounded-t-[1.25rem]"
          : "flex flex-col items-center justify-center text-center py-3 px-3 rounded-t-[1.25rem] bg-transparent"
      }
    >
      {props.svg}
      <span className="text-[0.7rem]">{props.text}</span>
    </NavLink>
  );
};

export default MobileNavLink;
