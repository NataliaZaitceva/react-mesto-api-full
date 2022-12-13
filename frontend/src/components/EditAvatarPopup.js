import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar,
    });
  }

  React.useEffect(() => {
    setAvatar("");
  }, [props.isOpen]);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  return (
    <PopupWithForm
      name="#popupeditprofile"
      title="Сменить Аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      button="Создать"
    >
      <input
        type="url"
        name="avatar"
        id="avatar"
        value={avatar}
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_avatar_link"
        minLength={2}
        required=""
        onChange={handleAvatarChange}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
