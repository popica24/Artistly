import { useAuth } from "../../../../Contexts/AuthContext";

const ProfileCard = () => {
  const { currentUser, dbUser } = useAuth();
  if (
    !currentUser ||
    !currentUser.email ||
    !dbUser ||
    !dbUser.firstName ||
    !dbUser.lastName
  )
    return <></>;
  let email =
    currentUser.email.length > 18
      ? currentUser.email.substring(0, 15) + "..."
      : currentUser.email;
  let firstName =
    dbUser.firstName.length > 7
      ? dbUser.firstName.substring(0, 7) + "..."
      : dbUser.firstName;
  let lastName =
    dbUser.lastName.length > 7
      ? dbUser.lastName.substring(0, 7) + "..."
      : dbUser.lastName;
  let shortName = "";
  if (dbUser.firstName) {
    shortName += dbUser.firstName[0];
  }
  if (dbUser.lastName) {
    shortName += dbUser.lastName[0];
  }
  return (
    <div className="bg-[#EEEEEE] w-full rounded-xl shadow-md py-8 max-w-[90vmin] mx-auto md:max-w-none">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-full bg-[#FFC727] relative border-[#510087] border-[5px] w-[100px] aspect-square">
          <p className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] text-4xl font-medium">
            {shortName}
          </p>
        </div>
        <span className="text-center mt-6 leading-8">
          <p className="max-w-[18ch] mx-auto">{firstName + " " + lastName}</p>
          <p className="max-w-[18ch] mx-auto">{email}</p>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
