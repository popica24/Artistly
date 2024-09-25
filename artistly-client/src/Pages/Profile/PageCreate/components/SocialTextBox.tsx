type Props = {
  field: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  register?: any;
  icon: any;
};

const SocialTextBox = (props: Props) => {
  return (
    <div className="bg-white grid grid-cols-12 md:grid-cols-9 my-4 shadow-sm rounded-[.625rem] border-2 border-[#00000059] py-2 borcer-[#4D4D4D] focus-within:border-[#7F3F98]">
      <div className="col-span-2 md:col-span-2 border-r border-[#4D4D4D] focus-within:border-[#7F3F98]">
        <div className="inline-flex items-center">
          <div className="mx-5">{props.icon}</div>
          <div className="hidden md:block">{props.field}</div>
        </div>
      </div>
      <div className="col-span-7">
        <input
          {...props.register}
          inputMode="text"
          type="text"
          className="w-full rounded-[0.625rem] h-8 px-4 py-3 focus-visible:outline-0"
          required={props.required}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

export default SocialTextBox;
