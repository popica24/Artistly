import "./index.css";

type Props = {
  classes: string;
};

const Skeleton = (props: Props) => {
  const classNames = `skeleton ${props.classes} animate-pulse`;
  return <div className={classNames}></div>;
};

export default Skeleton;
