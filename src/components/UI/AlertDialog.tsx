import { FC } from "react";
import { createPortal } from "react-dom";
interface IAlertDialog {
  isShowed: boolean;
  onAccept: () => void;
}

const AlertDialog: FC<IAlertDialog> = ({ isShowed, onAccept }) => {
  return isShowed
    ? createPortal(
        <div className="alert-dialog-backdrop">
          <div className="alert-dialog">
            <h1 className="alert-dialog__title">Accept article?</h1>
            <p className="alert-dialog__description">
              Are you sure you want to accept selected article? Accepting this
              article will make it visible to the readers of the site.
            </p>
            <div className="alert-dialog__button-container">
              <button>Cancel</button>
              <button onClick={() => onAccept()}>Accept</button>
            </div>
          </div>
        </div>,
        document.getElementById("alert-dialog-overlay")!
      )
    : null;
};

export default AlertDialog;
