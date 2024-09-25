import { User } from "../../Utils/types";

type Props = {
  user: User;
  premium: boolean;
};

const UserCard = (props: Props) => {
  return (
    <div className="mx-24">
      <div
        className={`w-full bg-[#EEE] my-4 rounded-md px-5 py-2 ${
          props.premium && "border-[#510087]"
        }`}
      >
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <div className="flex flex-col items-start justify-between">
              <div className="inline-flex items-center">
                <span>
                  <b>Nume</b>: {props.user.firstName}
                </span>
                <span className="ms-4">
                  <b>Prenume</b>: {props.user.lastName}
                </span>
              </div>
              <span className="my-2">
                <b className="me-4">Email</b>: {props.user.email}
              </span>
              <span className="inline-flex items-center">
                <b>Newsletter</b>:
                {props.user.newsletterActive ? (
                  <p className=" ms-4 text-green-600"> ACTIV</p>
                ) : (
                  <p className="ms-4 text-red-600"> INACTIV</p>
                )}
              </span>
            </div>
          </div>
          <div className="col-span-1">
            <span>Telefon: {props.user.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
