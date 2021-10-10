import { FC } from 'react';

import styles from './footer.module.scss';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p>Все права защищены.</p>
          <p>© 2016 - {currentYear}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
