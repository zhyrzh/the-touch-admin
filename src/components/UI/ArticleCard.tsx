import { FC, useState } from "react";
import dayjs from "dayjs";
import AlertDialog from "./AlertDialog";
interface IArticleCard {
  id: number;
  img: string;
  title: string;
  author: string;
  date: string;
  onAccept: (id: number) => void;
}

const ArticleCard: FC<IArticleCard> = ({
  id,
  author,
  date,
  img,
  title,
  onAccept,
}) => {
  const [showAcceptModal, setShowAcceptModal] = useState<boolean>(false);

  return (
    <>
      <AlertDialog
        onAccept={() => {
          onAccept(id);
          setShowAcceptModal(false);
        }}
        isShowed={showAcceptModal}
      />
      <div className="articles-card">
        <div className="articles-card__img-container">
          <img src={img} alt="" />
        </div>
        <div className="articles-card__content-container">
          <div>
            <h1 className="articles-card__title">{title}</h1>
            <div className="articles-card__secondary-info">
              <p>{author}</p>
              <p>{dayjs(date).format("MMMM DD, YYYY").toString()}</p>
            </div>
          </div>
          <div className="articles-card__cta-container">
            <p className="articles-card__cta-container articles-card__cta-container--bold">
              MORE INFO
            </p>
            <div>
              <p
                className="articles-card__cta-container articles-card__cta-container--bold"
                onClick={() => setShowAcceptModal(true)}
              >
                ACCEPT
              </p>
              <p>DECLINE</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
