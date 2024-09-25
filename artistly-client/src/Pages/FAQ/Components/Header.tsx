import Bullet from "../Pages/Bullet";
type Props = {
  text: string;
};
const Header = (props: Props) => {
  return (
    <span className="flex flex-row items-center">
      <Bullet /> {props.text}
    </span>
  );
};

export default Header;
