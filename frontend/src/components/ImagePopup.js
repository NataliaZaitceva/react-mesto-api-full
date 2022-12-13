function ImagePopup(props) {
  return (
    <div
      className={`popup popup_image_max ${props.card.name} ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__subtitle">{props.card.name}</h2>
        <button
          type="button"
          className="button button_view_close"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
