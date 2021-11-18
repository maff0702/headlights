import { FC } from 'react';

import styles from './footer.module.scss';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p>Телефон: <a href="tel:+79263231941">89263231941</a></p>
          <p>Почта: <a href="mailto:td.russia.rm@mail.ru">td.russia.rm@mail.ru</a></p>
          <p>Все права защищены. © 2016 - {currentYear}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
