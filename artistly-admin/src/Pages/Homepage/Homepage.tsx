import { useAuth } from "../../Context/AuthContext";

const Homepage = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return <div>Homepage</div>;
};

export default Homepage;
