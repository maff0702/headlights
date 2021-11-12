import React, { FC } from 'react';
import styles from './not-found.module.scss';
import { Helmet } from 'react-helmet';

const NotFound: FC = () => {
  return (
    <div className={styles.content}>
      <Helmet>
        <title>Страница не найдена</title>
      </Helmet>
      <h1>404</h1>
      <p>Страница не найдена.</p>
    </div>
  );
};

export default NotFound;
