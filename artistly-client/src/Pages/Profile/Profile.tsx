import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import ProfileCard from "./components/ProfileCard/ProfileCard";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="xl:grid flex flex-col grid-cols-4 gap-x-12">
        <div className="col col-span-1">
          <ProfileCard />
        </div>
        <div className="col col-span-3 xl:mt-0 mt-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Profile;
