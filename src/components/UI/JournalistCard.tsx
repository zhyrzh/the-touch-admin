import { FC, useState } from "react";
import AlertDialog from "./AlertDialog";

interface IJournalistCard {
  id: string;
  name: string;
  img: string;
  position: string;
  course: string;
  onAccept: (id: string) => void;
}

const JournalistCard: FC<IJournalistCard> = ({
  course,
  img,
  name,
  position,
  id,
  onAccept,
}) => {
  const [showAcceptModal, setShowAcceptModal] = useState<boolean>(false);
  return (
    <>
      <AlertDialog
        isShowed={showAcceptModal}
        title="Accept journalist?"
        description="Are you sure you want to accept selected journalist? Accepting this journalist will add him to active journalist list"
        onAccept={() => {
          onAccept(id);
          setShowAcceptModal(false);
        }}
        onCancel={() => {
          setShowAcceptModal(false);
        }}
      />
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
            <p
              className="journalist-card__cta-container-sm journalist-card__cta-container-sm--bold"
              onClick={() => setShowAcceptModal(true)}
            >
              ACCEPT
            </p>
            <p className="journalist-card__cta-container-sm">DECLINE</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalistCard;
