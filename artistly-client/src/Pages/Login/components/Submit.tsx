type Props = {
  loading: boolean;
};

const Submit = (props: Props) => {
  return (
    <button
      type="submit"
      className="w-full py-1.5 border-[#354F52] border-2 rounded-[10px] hover:bg-[#354f52] hover:border-[#354f52] hover:text-white my-4"
      disabled={props.loading}
    >
      Continua
    </button>
  );
};

export default Submit;
