import React, { FC } from 'react';
import styles from './not-found.module.scss';

const NotFound: FC = () => {
  return (
    <div className={styles.content}>
      <h1>404</h1>
      <p>Страница не найдена.</p>
    </div>
  );
};

export default NotFound;
