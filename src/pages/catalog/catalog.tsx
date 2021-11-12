import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import styles from './catalog.module.scss';
import CatalogCards from '../../components/catalog-cards/catalog-cards';
import SerchBar from '../../ui/serch-bar/search-bar';

const Catalog: FC = () => {
  return (
    <div className={styles.catalog_cards}>
      <Helmet>
        <title>Каталог товаров</title>
        <meta name="description" content="Каталог товаров" />
      </Helmet>
      <SerchBar />
      <h1>Каталог товаров</h1>
      <CatalogCards />
    </div>
  );
};

export default Catalog;
