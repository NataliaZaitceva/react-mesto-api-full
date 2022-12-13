import { Link } from "react-router-dom";
import React, { useState } from "react";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password });
  }

  return (
    <div className="registration">
      <h2 className="registration__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="registration__form">
        <input
          type="email"
          value={email}
          name="email"
          className="registration__input"
          placeholder="email"
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          className="registration__input"
          placeholder="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button type="submit" className="button_view_registration">
          Зарегистрироваться
        </button>
      </form>
      <p className="registration__text">
        Уже зарегистрированы?{" "}
        <Link className="registration__link" to="/signin">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
