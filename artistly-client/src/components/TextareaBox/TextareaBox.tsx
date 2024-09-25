import React from "react";

interface Props {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string | null;
  isRequired: boolean;
  height: string;
  width?: string;
  placeholder?: string;
  disabled?: boolean;
  register?: any;
}

const TextareaBox = (props: Props) => {
  return (
    <fieldset
      className={` ${
        props.width ? props.width : "w-full"
      } my-2 border-2 border-[#00000059] rounded-[0.625rem] focus-within:border-[#7F3F98] ${
        !props.disabled ? "bg-white" : "bg-[#f5f5f5]"
      } `}
    >
      <legend className="ms-5 px-2 inline-flex">
        {props.text} {props.isRequired && <p className="text-red-600">*</p>}
      </legend>
      <textarea
        required={props.isRequired}
        className={`w-full rounded-[0.625rem] ${props.height} px-4 focus-visible:outline-0`}
        onChange={props.onChange}
        value={props.value ? props.value : ""}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </fieldset>
  );
};

export default TextareaBox;
