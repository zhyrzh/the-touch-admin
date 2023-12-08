import { useContext, useEffect } from "react";
import { AuthContext } from "../stores/auth";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/UI/ArticleCard";
import JournalistCard from "../components/UI/JournalistCard";
import { ArticleContext } from "../stores/article.context";
import { UserContext } from "../stores/user";

const Home = () => {
  const authContext = useContext(AuthContext);
  const articleContext = useContext(ArticleContext);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext?.user === null) {
      navigate("/user/setup-profile");
    }
  }, [authContext?.user]);

  useEffect(() => {
    articleContext.getHomePageArticles();
    userContext.getHomePageJournalist();
  }, []);

  return (
    <div className="home">
      {/* Statistics section */}
      <div className="home__section">
        <h1 className="home__section-title">Statistics</h1>
        <div className="home__section-content-container-flex">
          <div className="home__statistics-item" key={1}>
            <h1>2</h1>
            <p>New journalist application</p>
          </div>
          <div className="home__statistics-item" key={2}>
            <h1>13</h1>
            <p>out of 36 articles approved</p>
          </div>
        </div>
      </div>

      {/* Pending articles section */}
      <div className="home__section">
        <h1 className="home__section-title">Pending articles</h1>
        <div className="home__section-content-container-grid" key={2}>
          {/* {console.log(articleContext.articles, "tanan")} */}
          {articleContext.articles?.map(
            ({ author, headline, createdAt, id, uploadedFiles }) => (
              <ArticleCard
                id={id}
                key={id}
                author={author[0].label}
                date={createdAt}
                img={uploadedFiles[0].url}
                title={headline}
                onAccept={articleContext.acceptArticle}
              />
            )
          )}
        </div>
        <p className="home__view-more">VIEW MORE &gt;</p>
      </div>

      {/* Pending user approval */}
      <div className="home__section">
        <h1 className="home__section-title">Pending journalist approval</h1>
        <div className="home__section-pending-journalist-approval">
          {userContext.journalists?.map(
            ({ course, img, name, position, email }) => (
              <JournalistCard
                key={img}
                course={course}
                img={img}
                name={name}
                position={position}
                onAccept={userContext.acceptJournalist}
                id={email}
              />
            )
          )}
        </div>
        <p className="home__view-more">VIEW MORE &gt;</p>
      </div>
    </div>
  );
};

export default Home;
