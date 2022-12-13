import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="#popupeditprofile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      button="Сохранить"
    >
      <label htmlFor="name">
        <input
          name="name"
          type="text"
          id="name"
          className="popup__input popup__input_description_name"
          value={name ?? ""}
          minLength={2}
          maxLength={40}
          placeholder="Имя"
          required=""
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="description">
        <input
          name="about"
          type="text"
          id="description"
          className="popup__input popup__input_description_profession"
          value={description ?? ""}
          minLength={2}
          maxLength={200}
          placeholder="Профессия"
          required=""
          onChange={handleDescriptionChange}
        />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
