import { useContext, useEffect } from "react";
import { AuthContext } from "../stores/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext?.user === null) {
      navigate("/user/setup-profile");
    }
  }, [authContext?.user]);

  return (
    <div className="home">
      <div className="home__search-bar">
        <input type="text" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Home;
