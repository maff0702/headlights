import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './catalog-cards.module.scss';
import { useSelector } from '../../hooks/hooks';

const CatalogCards: FC = () => {
  const { categories } = useSelector((store) => store.products);

  return (
    <div className={styles.catalog_cards}>
      {categories?.length > 0
      ? categories.map((item) => (
        <div key={item.id} className={styles.card}>
          <Link className={styles.card} to={`/catalog/${item.id}`}>
            <img className={styles.card_img} src={process.env.PUBLIC_URL + item.img} alt={item.name} />
            <p className={styles.card_name}>{item.name}</p>
          </Link>
        </div>
      ))
      : <span>Не удалось найти товар</span>}
    </div>
  );
};

export default CatalogCards;
