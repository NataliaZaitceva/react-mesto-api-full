import React from "react";
import logo from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Лого" />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <p className="header__menu-email">{props.email}</p>
              <button className="button_view_header" onClick={props.signOut}>
                Выйти
              </button>
            </>
          }
        />

        <Route
          path="signin"
          element={
            <Link to="/signup" className="button_view_header">
              Регистрация
            </Link>
          }
        />

        <Route
          path="/signup"
          element={
            <Link to="/signin" className="button_view_header">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
