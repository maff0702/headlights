import React, { FC } from 'react';

import styles from './catalog.module.scss';
import CatalogCards from '../catalog-cards/catalog-cards';

const Catalog: FC = () => {
  return (
    <div className={styles.catalog_card}>
      <h1>Каталог товаров</h1>
      <CatalogCards />
    </div>
  );
};

export default Catalog;
