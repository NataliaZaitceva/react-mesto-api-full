import React from "react";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container popup__container_confirm">
        <div className="popup__confirmation">
          <img
            className="popup__confirmation_image"
            src={props.image}
            alt="Лого"
          />
          <p className="popup__title">{props.text}</p>
          <button
            type="button"
            className="button_view_close"
            onClick={props.onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
