import { FC } from "react";
import { createPortal } from "react-dom";
interface IAlertDialog {
  isShowed: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onAccept: () => void;
}

const AlertDialog: FC<IAlertDialog> = ({
  isShowed,
  title,
  description,
  onAccept,
  onCancel,
}) => {
  return isShowed
    ? createPortal(
        <div className="alert-dialog-backdrop">
          <div className="alert-dialog">
            <h1 className="alert-dialog__title">{title}</h1>
            <p className="alert-dialog__description">{description}</p>
            <div className="alert-dialog__button-container">
              <button onClick={() => onCancel()}>Cancel</button>
              <button onClick={() => onAccept()}>Accept</button>
            </div>
          </div>
        </div>,
        document.getElementById("alert-dialog-overlay")!
      )
    : null;
};

export default AlertDialog;
