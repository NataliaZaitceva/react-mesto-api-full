import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameCard(e) {
    setName(e.target.value);
  }

  function handleLinkCard(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="#popupaddphoto"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      button="Создать"
    >
      <label htmlFor="name_gallery">
        <input
          type="text"
          id="name_gallery"
          name="name"
          value={name}
          className="popup__input popup__input_description_place"
          minLength={2}
          maxLength={40}
          placeholder="Название"
          required=""
          onChange={handleNameCard}
        />
      </label>
      <label htmlFor="link">
        <input
          type="url"
          id="link"
          name="link"
          value={link}
          className="popup__input popup__input_description_link"
          placeholder="Ссылка на картинку"
          required=""
          onChange={handleLinkCard}
        />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
