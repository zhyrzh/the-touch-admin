import { FC } from "react";

interface IJournalistCard {
  name: string;
  img: string;
  position: string;
  course: string;
}

const JournalistCard: FC<IJournalistCard> = ({
  course,
  img,
  name,
  position,
}) => {
  return (
    <div className="journalist-card">
      <div className="journalist-card__image-container">
        <img src={img} alt="" />
      </div>
      <h1 className="journalist-card__journalist-name">{name}</h1>
      <p className="journalist-card__details">{course}</p>
      <p className="journalist-card__details">{position}</p>
      <div className="journalist-card__cta-container-sm">
        <p className="journalist-card__cta-container-sm journalist-card__cta-container-sm--bold">
          MORE INFO
        </p>
        <div>
          <p className="journalist-card__cta-container-sm journalist-card__cta-container-sm--bold">
            ACCEPT
          </p>
          <p className="journalist-card__cta-container-sm">DECLINE</p>
        </div>
      </div>
    </div>
  );
};

export default JournalistCard;
