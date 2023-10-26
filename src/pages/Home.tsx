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
          {/* Article 1 */}
          <div className="articles-card">
            <div className="articles-card__img-container">
              <img
                src="https://business.inquirer.net/files/2023/10/MB-chair-and-BSP-Governor-Eli-Remolona-Jr.jpg"
                alt=""
              />
            </div>
            <div className="articles-card__content-container">
              <div>
                <h1 className="articles-card__title">
                  Rate hike looms on inflation woes
                </h1>
                <div className="articles-card__secondary-info">
                  <p>by John Doe</p>
                  <p>October 26, 2023</p>
                </div>
              </div>
              <div className="articles-card__cta-container">
                <p className="articles-card__cta-container articles-card__cta-container--bold">
                  MORE INFO
                </p>
                <div>
                  <p className="articles-card__cta-container articles-card__cta-container--bold">
                    ACCEPT
                  </p>
                  <p>DECLINE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Article 2 */}
          <div className="articles-card">
            <div className="articles-card__img-container">
              <img
                src="https://globalnation.inquirer.net/files/2023/10/Israel-4-620x349.jpg"
                alt=""
              />
            </div>
            <div className="articles-card__content-container">
              <div>
                <h1 className="articles-card__title">
                  DFA: 4th batch of Filipino repatriates from Israel to arrive
                  by end of October
                </h1>
                <div className="articles-card__secondary-info">
                  <p>by John Doe</p>
                  <p>October 26, 2023</p>
                </div>
              </div>
              <div className="articles-card__cta-container">
                <p className="articles-card__cta-container articles-card__cta-container--bold">
                  MORE INFO
                </p>
                <div>
                  <p className="articles-card__cta-container articles-card__cta-container--bold">
                    ACCEPT
                  </p>
                  <p>DECLINE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Article 3 */}
          <div className="articles-card">
            <div className="articles-card__img-container">
              <img
                src="https://newsinfo.inquirer.net/files/2023/10/hot-air-balloon-in-turkey-mayon-volcano.png"
                alt=""
              />
            </div>
            <div className="articles-card__content-container">
              <div>
                <h1 className="articles-card__title">
                  Bicol to revel in tourism rebirth with Mayon light show, hot
                  air balloon fest
                </h1>
                <div className="articles-card__secondary-info">
                  <p>by John Doe</p>
                  <p>October 26, 2023</p>
                </div>
              </div>
              <div className="articles-card__cta-container">
                <p className="articles-card__cta-container articles-card__cta-container--bold">
                  MORE INFO
                </p>
                <div>
                  <p className="articles-card__cta-container articles-card__cta-container--bold">
                    ACCEPT
                  </p>
                  <p>DECLINE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Article 4 */}
          <div className="articles-card">
            <div className="articles-card__img-container">
              <img
                src="https://lifestyle.inquirer.net/files/2023/10/Mexico-museum-dogs-2048x1365.jpg"
                alt=""
              />
            </div>
            <div className="articles-card__content-container">
              <div>
                <h1 className="articles-card__title">
                  In Mexico, modern art is for dogs too as exhibition opens
                </h1>
                <div className="articles-card__secondary-info">
                  <p>by John Doe</p>
                  <p>October 26, 2023</p>
                </div>
              </div>
              <div className="articles-card__cta-container">
                <p className="articles-card__cta-container articles-card__cta-container--bold">
                  MORE INFO
                </p>
                <div>
                  <p className="articles-card__cta-container articles-card__cta-container--bold">
                    ACCEPT
                  </p>
                  <p>DECLINE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="home__view-more">VIEW MORE &gt;</p>
      </div>
    </div>
  );
};

export default Home;
