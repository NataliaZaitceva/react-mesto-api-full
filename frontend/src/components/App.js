//import logo from './logo.svg';
import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import api from "../utils/Api";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import auth from "../utils/Auth";
import success from "../images/success.png";
import fail from "../images/fail.png";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAddPhoto, setIsAddPhoto] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [dataInfoTool, setDataInfoTool] = useState({ text: "", image: "" });
  const [email, setEmail] = useState("");
  const history = useNavigate();

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  function handleRegister(registrationData) {
    auth
      .register(registrationData)
      .then(() => {
        setDataInfoTool({
          text: "Вы успешно зарегистрировались",
          image: success,
        });
        handleInfoTooltipOpen();
        history("/signin");
      })
      .catch(() => {
        setDataInfoTool({
          text: "Что-то пошло не так! Попробуйте еще раз",
          image: fail,
        });
        handleInfoTooltipOpen();
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then(res => {
          if (res) {
          setEmail(res.email);
          setIsLoggedIn(true);
           }
          history("/");
        })
        .catch(console.error);
    }
  }, [history]);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          history("/");
        }
      })
      .catch(() => {
        setDataInfoTool({
          text: "Что-то пошло не так! Попробуйте еще раз",
          image: fail,
        });
        handleInfoTooltipOpen();
        history("/signin");
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history("/signin");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((card) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? card : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteUserCard(card._id)
      .then(() => {
        setCards((oldCards) =>
          oldCards.filter((oldCard) => oldCard._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipOpen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(formData) {
    api
      .setUserInfo(formData)
      .then((formData) => {
        setCurrentUser(formData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCards(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(formData) {
    api
      .updateUserPhoto(formData)
      .then((formData) => {
        setCurrentUser(formData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })

        api.getInitialCards('jwt').then(({cards}) => {
        setCards(cards)
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, isAddPhoto]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header email={email} signOut={signOut} isLoggedIn={isLoggedIn} />
          <Routes>
            <Route
              path="*"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    card={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    isLoggedIn={isLoggedIn}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} />}
            />

            <Route path="/signin" element={<Login onLogin={handleLogin} />} />

            <Route
              path="*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signup" />
              }
            />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            text={dataInfoTool.text}
            image={dataInfoTool.image}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
