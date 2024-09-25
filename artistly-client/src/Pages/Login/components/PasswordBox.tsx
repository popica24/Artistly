import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
interface Props {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | null;
  isRequired: boolean;
  height: string;
  width?: string;
  placeholder?: string;
  disabled?: boolean;
}
const PasswordBox = (props: Props) => {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <fieldset
      className={` ${
        props.width ? props.width : "w-full"
      }  border-2 border-[#00000059] rounded-[0.625rem] pb-2 focus-within:border-[#354F52] relative  ${
        !props.disabled ? "bg-white" : "bg-[#f5f5f5]"
      } `}
    >
      <legend className="text-[0.9rem] text-[#495057] ms-5 px-2 inline-flex ">
        {props.text} {props.isRequired && <p className="text-red-600">*</p>}
      </legend>
      <input
        type={viewPassword ? "text" : "password"}
        required={true}
        className={`w-full rounded-[0.625rem] ${props.height} px-4 py-3 focus-visible:outline-0`}
        onChange={props.onChange}
        value={props.value ? props.value : ""}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      <div
        className="absolute top-1/3 -translate-y-1/2 right-5 cursor-pointer"
        onClick={() => setViewPassword(!viewPassword)}
      >
        {!viewPassword ? <FaEye /> : <FaEyeSlash />}
      </div>
    </fieldset>
  );
};

export default PasswordBox;
