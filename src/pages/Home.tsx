import { useContext, useEffect } from "react";
import { AuthContext } from "../stores/auth";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/UI/ArticleCard";
import JournalistCard from "../components/UI/JournalistCard";

const dummyArticles = [
  {
    title: "Rate hike looms on inflation woes",
    img: "https://business.inquirer.net/files/2023/10/MB-chair-and-BSP-Governor-Eli-Remolona-Jr.jpg",
    author: "John Doe",
    date: "October 26, 2023",
  },
  {
    title:
      "DFA: 4th batch of Filipino repatriates from Israel to arrive by end of October",
    img: "https://globalnation.inquirer.net/files/2023/10/Israel-4-620x349.jpg",
    author: "Jane Doe",
    date: "October 26, 2023",
  },
  {
    title:
      "Bicol to revel in tourism rebirth with Mayon light show, hot air balloon fest",
    img: "https://newsinfo.inquirer.net/files/2023/10/hot-air-balloon-in-turkey-mayon-volcano.png",
    author: "John Doe",
    date: "October 26, 2023",
  },
  {
    title: "In Mexico, modern art is for dogs too as exhibition opens",
    img: "https://lifestyle.inquirer.net/files/2023/10/Mexico-museum-dogs-2048x1365.jpg",
    author: "Jane Doe",
    date: "October 26, 2023",
  },
];

const dummyJournalistData = [
  {
    name: "John Doe",
    course: "BS Electrical Engineering",
    position: "Graphics Artist",
    img: "https://i.pinimg.com/564x/75/c8/57/75c857c731c01f22a0dbd48f6d4552d9.jpg",
  },
  {
    name: "Jane Doe",
    course: "BS Civil Engineering",
    position: "News Writer",
    img: "https://i.pinimg.com/564x/66/87/47/668747d5af509b6b3378fb9176a6d545.jpg",
  },
  {
    name: "Juan dela Cruz",
    course: "BS Civil Engineering",
    position: "News Writer",
    img: "https://i.pinimg.com/564x/6b/32/3d/6b323d20c7358ade1b31b32bf8ebdd41.jpg",
  },
];

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
      {/* Statistics section */}
      <div className="home__section">
        <h1 className="home__section-title">Statistics</h1>
        <div className="home__section-content-container-flex">
          <div className="home__statistics-item">
            <h1>2</h1>
            <p>New journalist application</p>
          </div>
          <div className="home__statistics-item">
            <h1>13</h1>
            <p>out of 36 articles approved</p>
          </div>
        </div>
      </div>

      {/* Pending articles section */}
      <div className="home__section">
        <h1 className="home__section-title">Pending articles</h1>
        <div className="home__section-content-container-grid">
          {dummyArticles.map(({ author, date, img, title }) => (
            <ArticleCard author={author} date={date} img={img} title={title} />
          ))}
        </div>
        <p className="home__view-more">VIEW MORE &gt;</p>
      </div>

      {/* Pending user approval */}
      <div className="home__section">
        <h1 className="home__section-title">Pending journalist approval</h1>
        <div className="home__section-pending-journalist-approval">
          {dummyJournalistData.map(({ course, img, name, position }) => (
            <JournalistCard
              course={course}
              img={img}
              name={name}
              position={position}
            />
          ))}
        </div>
        <p className="home__view-more">VIEW MORE &gt;</p>
      </div>
    </div>
  );
};

export default Home;
