import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header.module.scss';
import logo from '../../images/logo2.gif';

const Header: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <NavLink to="/">
              <img src={logo} alt="" />
            </NavLink>
          </div>
          <div className={styles.menu}>
            <ul>
              <li><NavLink exact to="/" activeClassName={styles.activeLink}>Главная</NavLink></li>
              <li><NavLink to="/a" activeClassName={styles.activeLink}>Доставка/оплата</NavLink></li>
              <li><NavLink to="/s" activeClassName={styles.activeLink}>Помощь</NavLink></li>
              <li><NavLink to="/d" activeClassName={styles.activeLink}>Контакты</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
