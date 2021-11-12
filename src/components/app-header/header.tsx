import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';

import styles from './header.module.scss';
import logo from '../../images/logo2.gif';

const Header: FC = () => {
  const { user } = useSelector((state) => state.auth);
  const [isBurger, setBurger] = useState(false);
  const handleClickBurger = () => {
    setBurger(!isBurger);
    // isBurger
    // ? document.body.style.overflow = 'hidden'
    // : document.body.style.overflow = 'hidden';
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <NavLink to="/">
              <img src={logo} alt="" />
            </NavLink>
          </div>
          <div onClick={handleClickBurger}
            className={isBurger ? styles.header__burger + ' ' + styles.active : styles.header__burger}>
              <span />
          </div>
          <div className={isBurger ? styles.menu + ' ' + styles.active : styles.menu}>
            <ul>
              <li><NavLink onClick={() => setBurger(false)} exact to="/" activeClassName={styles.activeLink}>Главная</NavLink></li>
              <li><NavLink onClick={() => setBurger(false)} to="/catalog" activeClassName={styles.activeLink}>Каталог</NavLink></li>
              <li><NavLink onClick={() => setBurger(false)} to="/help" activeClassName={styles.activeLink}>Помощь</NavLink></li>
              <li><NavLink onClick={() => setBurger(false)} to="/contacts" activeClassName={styles.activeLink}>Контакты</NavLink></li>
              {user?.role === 'ADMIN' && <li>
                <NavLink onClick={() => setBurger(false)} to="/admin" activeClassName={styles.activeLink}>Админ панель</NavLink></li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
