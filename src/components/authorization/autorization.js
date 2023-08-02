import "./authorization.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/sibdevLogo.svg";
import { ReactComponent as ClosedEye } from "../../assets/closedEye.svg";
import { ReactComponent as OpenEye } from "../../assets/openEye.svg";

import { users } from "../../users";

const Autorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [eye, setEye] = useState(false);
  const [classNames, setClassNames] = useState("login__form__field");

  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    users.forEach((el) => {
      if (el.login.toUpperCase() === login.toUpperCase() && el.password === password) {
        localStorage.setItem("activeUser", el.id);
      }
    });

    if (localStorage.getItem("activeUser")) {
      navigate("/search");
    } else {
      setClassNames((prev) => prev += " login__form__field-invalid");
      setTimeout(() => setClassNames("login__form__field"), 3000);
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <Logo className="login__logo"></Logo>
      <h3 className="login__title">Вход</h3>
      <form className="login__form">
        <div className="login__form__wrapper">
          <label className="login__form__name">Логин</label>
          <input
            type="text"
            id="login"
            name="login"
            className={classNames}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          ></input>
        </div>
        <div className="login__form__wrapper">
          <label className="login__form__name">Пароль</label>
          <input
            type={eye ? "text" : "password"}
            id="password"
            name="password"
            className={classNames}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <span
            className="login__form__image"
            onClick={() => setEye((prev) => !prev)}
            onMouseDown={onMouseDown}
          >
            {eye ? <OpenEye /> : <ClosedEye />}
          </span>
        </div>
        <button
          type="submit"
          className="login__form__button"
          onClick={(e) => handleLogIn(e)}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Autorization;
