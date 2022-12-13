import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        />

        <button
          className="button button_view_avatar"
          onClick={props.onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="button button_view_edit"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button button_view_add"
          onClick={props.onAddPlace}
        />
      </section>

      <ul className="gallery">
        {props.card.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </ul>
    </>
  );
}

export default Main;
