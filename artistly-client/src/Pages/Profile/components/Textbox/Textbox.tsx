type Props = {
  field: string;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  register?: any;
  maxLength?: number;
};

const Textbox = (props: Props) => {
  return (
    <fieldset
      className={`w-full my-2 border-2 border-[#00000059] rounded-[0.625rem] pb-2 focus-within:border-[#7F3F98] ${
        props.disabled ? "bg-[#EEEEEE]" : "bg-white"
      }`}
    >
      <legend className="ms-5 px-2 inline-flex text-[14px]">
        {props.field} {props.required && <p className="text-red-600">*</p>}
      </legend>
      <input
        maxLength={props.maxLength}
        {...props.register}
        defaultValue={props.defaultValue}
        inputMode="text"
        type="text"
        className="w-full rounded-[0.625rem] h-8 px-4 py-3 focus-visible:outline-0"
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </fieldset>
  );
};

export default Textbox;
