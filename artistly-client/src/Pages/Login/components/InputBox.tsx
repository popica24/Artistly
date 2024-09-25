interface Props {
  text: string;
  isRequired: boolean;
  height: string;
  width?: string;
  placeholder?: string;
  disabled?: boolean;
  register: any;
  type: string;
}

const InputBox = (props: Props) => {
  return (
    <fieldset
      className={` ${
        props.width ? props.width : "w-full"
      } border-2 border-[#00000059] rounded-[0.625rem] pb-2 focus-within:border-[#354F52]  ${
        !props.disabled ? "bg-white" : "bg-[#f5f5f5]"
      } `}
    >
      <legend className="text-[0.9rem] text-[#495057] ms-5 px-2 inline-flex ">
        {props.text} {props.isRequired && <p className="text-red-600">*</p>}
      </legend>
      <input
        type={props.type}
        className={`w-full rounded-[0.625rem] ${props.height} px-4 py-3 focus-visible:outline-0`}
        placeholder={props.placeholder}
        disabled={props.disabled}
        {...props.register}
      />
    </fieldset>
  );
};

export default InputBox;
