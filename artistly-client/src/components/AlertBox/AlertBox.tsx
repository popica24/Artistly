const AlertBox = () => {
  return (
    <div className="blur h-screen w-screen z-9999 relative">
      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-red-600 w-[300px] h-[300px]"></div>
    </div>
  );
};

export default AlertBox;
