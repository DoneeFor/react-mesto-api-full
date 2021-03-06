import headerLogo from '../images/header__logo.svg';
import {Link, Route} from "react-router-dom";

function Header({email,onSignOut}) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      <div className="header__container">
        <Route exact path="/">
          <p className="header__email">{email}</p>
          <button className="header__link" onClick={onSignOut}>Выйти</button>
        </Route>
        <Route exact path="/signin">
          <Link to="/signup" className="header__link">Регистрация</Link>
        </Route>
        <Route exact path="/signup">
          <Link to="/signin" className="header__link">Войти</Link>
        </Route>
      </div>
    </header>
  )
}

export default Header;
