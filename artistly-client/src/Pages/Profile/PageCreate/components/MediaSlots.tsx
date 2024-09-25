import {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import MediaSlot from "./MediaSlot";
import { PageCreateInputs } from "./Inputs";

type Props = {
  control: Control<PageCreateInputs, any, PageCreateInputs>;
  register: UseFormRegister<PageCreateInputs>;
  mediaFields: FieldArrayWithId<PageCreateInputs, "mediaSlots", "id">[];
  setValue: UseFormSetValue<PageCreateInputs>;
};

const MediaSlots = (props: Props) => {
  const watchMedias = useWatch({
    control: props.control,
    name: "mediaSlots",
  });

  return (
    <div className="flex flex-row flex-wrap items-center justify-evenly md:justify-between relative">
      {props.mediaFields.map((field, index) => (
        <MediaSlot
          setValue={props.setValue}
          key={field.id}
          innerKey={field.id}
          register={props.register}
          index={index}
          field={field}
          value={watchMedias?.[index]}
        />
      ))}
    </div>
  );
};

export default MediaSlots;
