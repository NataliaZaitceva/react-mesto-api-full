import React, { useCallback, useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <div className="registration">
      <h2 className="registration__title">Вход</h2>
      <form className="registration__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="registration__input"
          placeholder="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          className="registration__input"
          placeholder="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="button_view_registration">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
