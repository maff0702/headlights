import React, { FC } from 'react';

import styles from './spinner.module.scss';

const Spinner: FC = () => {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.loading}>
        <div className={styles.arc}></div>
        <div className={styles.arc}></div>
        <div className={styles.arc}></div>
      </div>
    </div>
  );
};

export default Spinner;
