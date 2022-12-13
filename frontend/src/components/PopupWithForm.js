import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup ${props.name} ${props.isOpen && `popup_opened`}`}
    >
      <div className="popup__container">
        <form
          className={`popup__form form`}
          name={`${props.name}`}
          action="#"
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="button button_view_submit">
            {props.button}
          </button>
        </form>

        <button
          className={`button_view_close button_view_close_${props.name}`}
          type="button"
          onClick={props.onClose}
        />
      </div>
    </section>
  );
}

export default PopupWithForm;
