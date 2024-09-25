import { FaRegUser } from "react-icons/fa";
import { MdOutlineContactPage, MdOutlineContactSupport } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import useUserRole from "../../../../hooks/useRole";

const Navbar = () => {
  const { role } = useUserRole();

  const url = useLocation().pathname;

  const navbarLinks = [
    {
      icon: <FaRegUser />,
      text: "Profilul meu",
      link: "/profile",
      visible: role === 111 || role === 333 || role == 999,
    },
    {
      icon: <MdOutlineContactPage />,
      text: "Pagini",
      link: "/profile/pages",
      visible: role === 333 || role == 999,
    },
    {
      icon: <MdOutlineContactSupport />,
      text: "Suport",
      link: "/faq",
      visible: role === 111 || role === 333 || role == 999,
    },
  ];

  return (
    <div
      className={`grid ${
        role === 333 ? "grid-cols-3" : "grid-cols-2"
      } bg-[#EEEEEE] my-8`}
    >
      {navbarLinks.map((n) => {
        return <NavbarLink {...n} key={n.text} active={n.link == url} />;
      })}
    </div>
  );
};

type NavbarLinkProps = {
  icon: any;
  text: string;
  link: string;
  active?: boolean;
  visible: boolean;
};

const NavbarLink = (props: NavbarLinkProps) => {
  if (!props.visible) return <></>;
  let classes =
    "inline-flex items-center justify-center border-l-2 py-2 text-xl hover:bg-[#354F52] hover:text-white transition-colors";

  if (props.active) {
    classes += " bg-[#354F52] text-white";
  }

  return (
    <Link to={props.link} className={classes}>
      <span>{props.icon}</span>
      <p className="ms-1.5 lg:block hidden">{props.text}</p>
    </Link>
  );
};

export default Navbar;
