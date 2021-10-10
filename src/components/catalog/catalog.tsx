import React, { FC } from 'react';

import styles from './catalog.module.scss';
import headlightsImg from '../../images/headlights.svg';

const Catalog: FC = () => {
  return (
    <div className={styles.catalog_card}>
      <div className={styles.card}>
        <img className={styles.card_img} src={headlightsImg} alt="" />
        <p className={styles.card_name}>Промышленное освещение</p>
      </div>
      <div className={styles.card}>
        <img className={styles.card_img} src={headlightsImg} alt="" />
        <p className={styles.card_name}>Промышленное освещение</p>
      </div>
      <div className={styles.card}>
        <img className={styles.card_img} src={headlightsImg} alt="" />
        <p className={styles.card_name}>Промышленное освещение</p>
      </div>
      <div className={styles.card}>
        <img className={styles.card_img} src={headlightsImg} alt="" />
        <p className={styles.card_name}>Промышленное освещение</p>
      </div>
      <div className={styles.card}>
        <img className={styles.card_img} src={headlightsImg} alt="" />
        <p className={styles.card_name}>Промышленное освещение</p>
      </div>
    </div>
  );
};

export default Catalog;
