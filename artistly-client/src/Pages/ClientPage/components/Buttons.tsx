import { useState } from "react";
import BackButton from "../../../components/BackButton";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import WishlistButton from "../../../components/WishlistButton/WishlistButton";

const Buttons = ({ id }: { id: string | undefined }) => {
  const [openShare, setOpenShare] = useState(false);
  return (
    <div className="flex flex-row items-center justify-between w-full mb-6 relative">
      <BackButton />
      <WishlistButton size={25} id={id} />
      <button
        onClick={() => setOpenShare(!openShare)}
        className={`inline-flex items-center border border-[#07C] ${
          openShare ? "bg-[#07C] text-white" : "bg-white text-[#07C]"
        } px-2.5 rounded-full text-sm ms-3`}
      >
        <svg
          className="me-1"
          width="12"
          height="12"
          viewBox="0 0 17 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8779 6.27019C12.9885 6.27019 12.1872 5.88312 11.6311 5.26739L6.62878 8.3897C6.76233 8.73424 6.8364 9.10847 6.8364 9.49997C6.8364 9.89162 6.76233 10.2658 6.62878 10.6102L11.6311 13.7327C12.1872 13.117 12.9885 12.7298 13.8779 12.7298C15.5533 12.7298 16.9163 14.1034 16.9163 15.7918C16.9163 17.4803 15.5533 18.8538 13.8779 18.8538C12.2025 18.8538 10.8395 17.4802 10.8395 15.7917C10.8395 15.4002 10.9137 15.026 11.0471 14.6814L6.04501 11.5591C5.48885 12.1748 4.68755 12.562 3.79815 12.562C2.12275 12.562 0.759766 11.1883 0.759766 9.49997C0.759766 7.81151 2.12275 6.4379 3.79815 6.4379C4.68755 6.4379 5.48885 6.82497 6.04501 7.44084L11.0471 4.31854C10.9137 3.97399 10.8395 3.59976 10.8395 3.20812C10.8395 1.51979 12.2025 0.146185 13.8779 0.146185C15.5533 0.146185 16.9163 1.51979 16.9163 3.20812C16.9163 4.89658 15.5533 6.27019 13.8779 6.27019ZM11.9474 15.7917C11.9474 16.8644 12.8135 17.7372 13.8779 17.7372C14.9424 17.7372 15.8084 16.8644 15.8084 15.7917C15.8084 14.7189 14.9424 13.8462 13.8779 13.8462C12.8135 13.8462 11.9474 14.7189 11.9474 15.7917ZM3.79815 7.55445C2.73357 7.55445 1.86754 8.42723 1.86754 9.49997C1.86754 10.5727 2.73357 11.4455 3.79815 11.4455C4.8626 11.4455 5.72848 10.5727 5.72848 9.49997C5.72848 8.42723 4.8626 7.55445 3.79815 7.55445ZM11.9474 3.20826C11.9474 4.281 12.8135 5.15378 13.8779 5.15378C14.9424 5.15378 15.8084 4.281 15.8084 3.20826C15.8084 2.13552 14.9424 1.26274 13.8779 1.26274C12.8135 1.26274 11.9474 2.13552 11.9474 3.20826Z"
            fill={!openShare ? "#07C" : "#FFFFFF"}
          />
        </svg>
        Share
      </button>
      {openShare && (
        <div className="bg-white p-4 absolute right-0 top-[52px] z-50 drop-shadow-default rounded-md">
          <span className="inline-flex items-center">
            <FaFacebook className="text-[#07C] cursor-pointer" size={20} />
            <FaInstagram
              size={20}
              className="mx-4 text-red-700 cursor-pointer"
            />
            <FaWhatsapp size={20} className="text-green-400 cursor-pointer" />
          </span>
        </div>
      )}
    </div>
  );
};

export default Buttons;
