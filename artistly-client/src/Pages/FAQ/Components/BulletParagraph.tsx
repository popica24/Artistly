type Props = {
  text: string;
};

const BulletParagraph = (props: Props) => {
  return (
    <span className="flex flex-row items-start ms-0.5">
      &#8226;
      <p className="ms-2">{props.text}</p>
    </span>
  );
};

export default BulletParagraph;
