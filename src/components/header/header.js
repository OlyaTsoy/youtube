import "./header.css";

import { NavLink, Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/sibdevLogo.svg";

const Header = () => {
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("activeUser");
  };

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/search">
          <Logo className="header__logo"></Logo>
        </Link>
        <ul className="header__nav">
          <li className="header__nav__item">
            <NavLink
              className={`header__nav__link ${({ isActive }) =>
                isActive ? "active" : ""}`}
              to="/search"
            >
              Поиск
            </NavLink>
          </li>
          <li className="header__nav__item header__nav__item-first">
            <NavLink
              className={`header__nav__link ${({ isActive }) =>
                isActive ? "active" : ""}`}
              to="/favorites"
            >
              Избранное
            </NavLink>
          </li>
          <li
            className="header__nav__item header__nav__item-second"
            onClick={logOut}
          >
            <NavLink
              className={`header__nav__link ${({ isActive }) =>
                isActive ? "active" : ""}`}
              to="/"
            >
              Выйти
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
