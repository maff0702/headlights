import React, { FC } from 'react';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router';
// import { useSelector } from '../../hooks/hooks';

import styles from './product-card.module.scss';

const ProductCard: FC<any> = ({ data }) => {
  // const { products } = useSelector((state) => state.products);
  // const { id }: { id: string } = useParams();
  // const currentProducts = products.filter(elem => elem.categories === id);

  return (
    <div className={styles.card}>
      <Link className={styles.card} to={`/catalog/${data.id}`}>
        <img className={styles.card_img} src={data.img} alt={data.name} />
        <p className={styles.card_name}>{data.name} {data.color && data.color}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
