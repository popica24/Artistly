import React from "react";

interface Props {
  text: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | null;
  isRequired: boolean;
  height: string;
  width?: string;
  placeholder?: string;
  disabled?: boolean;
  type: string;
  inputMode?: any;
  register?: any;
}

const InputBox = (props: Props) => {
  return (
    <fieldset
      className={` ${
        props.width ? props.width : "w-full"
      } my-2 border-2 border-[#00000059] rounded-[0.625rem] pb-2 focus-within:border-[#354F52] ${
        !props.disabled ? "bg-white" : "bg-[#f5f5f5]"
      } `}
    >
      <legend className="ms-5 px-2 inline-flex text-[14px]">
        {props.text} {props.isRequired && <p className="text-red-600">*</p>}
      </legend>
      <input
        inputMode={props.inputMode ? props.inputMode : "text"}
        type={props.type}
        className={`w-full rounded-[0.625rem] ${props.height} px-4 py-3 focus-visible:outline-0`}
        onChange={props.onChange}
        required={props.isRequired}
        value={props.value ? props.value : ""}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </fieldset>
  );
};

export default InputBox;
