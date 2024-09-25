type Props = {
  contactName: string;
  contactType: string;
  contactNumber: string;
  contactEmail: string;
};

const Contacts = ({
  contactName,
  contactType,
  contactNumber,
  contactEmail,
}: Props) => {
  return (
    <div className="mt-12">
      <span className="font-medium text-lg">Date contact</span>
      <div className="bg-[#EEEEEE] mt-3 p-4 drop-shadow-default rounded-xl">
        <div className="bg-white px-6 drop-shadow-default rounded-xl py-6 lg:py-3 lg:grid grid-cols-10 max-w-[600px] mx-auto">
          <div className="w-full border-b border-black lg:border-b-0 pb-1.5 lg:pb-0 col-span-3 lg:border-r">
            <div className="text-center text-sm lg:flex justify-center items-center lg:pt-1">
              Persoana de contact
            </div>
          </div>
          <div className="w-full pt-1.5 lg:pt-0 col-span-7 lg:text-start">
            <div className="text-center inline-flex items-center justify-center w-full font-medium text-lg lg:text-start lg:justify-start lg:ms-4">
              {contactName} <p className="ms-1">({contactType})</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-10 mb-4 mt-6 max-w-[600px] mx-auto lg:px-6">
          <div className="col-span-3 border-r border-black lg:text-end pe-4">
            <span>Telefon</span>
          </div>
          <div className="col-span-7 ms-6 text-[#07C]">{contactNumber}</div>
        </div>
        <div className="grid grid-cols-10 mb-4 max-w-[600px] mx-auto lg:px-6">
          <div className="col-span-3 border-r border-black lg:text-end pe-4">
            <span>Email</span>
          </div>
          <div className="col-span-7 ms-6">{contactEmail}</div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
