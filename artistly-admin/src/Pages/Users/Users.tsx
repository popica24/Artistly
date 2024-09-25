import { useQuery } from "react-query";
import { get } from "../../Services/repoService";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { User } from "../../Utils/types";
import UserCard from "./UserCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Users = () => {
  const [pageIndex] = useState(1);
  const { currentUser } = useAuth();
  const { data: users, isLoading } = useQuery<Array<User> | undefined>(
    [`get-users`],
    () =>
      currentUser
        ?.getIdToken(false)
        .then((idToken) =>
          get(`list-free-users?pageIndex=${pageIndex}`, idToken)
        ),
    {
      cacheTime: 10 * 15 * 1000,
      refetchInterval: 10 * 5 * 1000,
    }
  );

  return (
    <>
      {" "}
      <div className="w-full">
        <div className="bg-[#354F52] text-white text-center py-2 mx-24">
          Utilizatori
        </div>
      </div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col">
          {users?.map((user, i) => (
            <UserCard user={user} premium={false} key={i} />
          ))}
        </div>
      )}
    </>
  );
};

export default Users;
