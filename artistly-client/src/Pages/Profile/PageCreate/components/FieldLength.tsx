import { useWatch } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  maxLength: string;
};

const FieldLength = ({ control, name, maxLength }: Props) => {
  const lengthValue = useWatch({
    control,
    name,
    defaultValue: 0,
  });
  return (
    <p className="ms-auto pe-5 font-thin text-sm">
      {lengthValue.length ?? 0}/{maxLength}
    </p>
  );
};

export default FieldLength;
