import { useContext, useEffect } from "react";
import { AuthContext } from "../stores/user";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.user === null) {
      navigate("/user/setup-profile");
    }
  }, [authContext.user]);

  return (
    <div>
      <h1>Main page</h1>
    </div>
  );
};

export default Home;
