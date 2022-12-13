import React from "react";
import trash from "../images/Trash.svg";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = `button_view_trash ${
    isOwn ? "button_view_trash" : "button_view_trash_hidden"
  }`;

  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = isLiked
    ? "button_view_like-active"
    : "button_view_like";

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleClick() {
    props.onCardClick({ name: props.card.name, link: props.card.link });
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="gallery__item">
      <img
        src={trash}
        alt="Удалить"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        src={props.card.link}
        alt={props.card.name}
        className="gallery__illustration"
        onClick={handleClick}
      />
      <div className="gallery__description">
        <h2 className="gallery__title">{props.card.name}</h2>
        <div className="gallery__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="gallery__like_number">{`${props.card.likes.length}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
