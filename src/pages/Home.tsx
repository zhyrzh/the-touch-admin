import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../stores/auth";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/UI/ArticleCard";
import JournalistCard from "../components/UI/JournalistCard";
import { homeAPI } from "../api/home";
import { ArticleContext } from "../stores/articles";

interface IHomePageData {
  pendingArticles: Array<{
    id: number;
    headline: string;
    date: string;
    // author: Array<{ name: string; email: string }>;
    images: Array<{ publicId: string; url: string }>;
    img: string;
    title: string;
    author: string;
  }>;
  pendingJournalist: Array<{
    name: string;
    course: string;
    position: string;
    img: string;
  }>;
}

const Home = () => {
  const authContext = useContext(AuthContext);
  const articleContext = useContext(ArticleContext);
  const navigate = useNavigate();
  const [homePageDetails, setHomePageDetails] = useState<IHomePageData>();

  useEffect(() => {
    if (authContext?.user === null) {
      navigate("/user/setup-profile");
    }
  }, [authContext?.user]);

  useEffect(() => {
    const fetchHomePageData = async () => {
      const data = await homeAPI.getAllHomePageData();

      setHomePageDetails((_prevData: any) => ({
        pendingArticles: data.pendingArticles.map((artcle: any) => ({
          id: artcle.id,
          title: artcle.headline,
          author: artcle.authors[0].name,
          date: artcle.createdAt,
          img: artcle.images[0].url,
        })),
        pendingJournalist: data.pendingJournalists.map((jrnlst: any) => ({
          name: jrnlst.name,
          position: jrnlst.position,
          course: jrnlst.course,
          img: jrnlst.img,
        })),
      }));
    };
    fetchHomePageData();
  }, []);

  const acceptArticle = async (id: number) => {
    const updatedArticleList = await articleContext.acceptArticle(id);
    if (updatedArticleList) {
      setHomePageDetails((prevData: any) => ({
        pendingArticles: updatedArticleList?.updatedArticleList.map(
          (artcle: any) => ({
            id: artcle.id,
            title: artcle.headline,
            author: artcle.authors[0].name,
            date: artcle.createdAt,
            img: artcle.images[0].url,
          })
        ),
        pendingJournalist: prevData?.pendingJournalist,
      }));
    }
  };

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
          {homePageDetails?.pendingArticles?.map(
            ({ author, date, img, title, id }) => (
              <ArticleCard
                id={id}
                key={title}
                author={author}
                date={date}
                img={img}
                title={title}
                onAccept={(id) => {
                  acceptArticle(id);
                }}
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
          {homePageDetails?.pendingJournalist.map(
            ({ course, img, name, position }) => (
              <JournalistCard
                key={img}
                course={course}
                img={img}
                name={name}
                position={position}
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
