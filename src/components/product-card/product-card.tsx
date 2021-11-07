import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import styles from './product-card.module.scss';
import { API_URL_IMG } from '../../utils/constants';

const ProductCard: FC<any> = ({ data }) => {
  const { name }: { name: string } = useParams();

  return (
    <div className={styles.card}>
      <Link className={styles.card} to={`/catalog/${name.toLowerCase()}/${data.name.toLowerCase()}`}>
        <img className={styles.card_img} src={`${API_URL_IMG}/${data?.img[0]?.name}`} alt={data?.name} />
        <p className={styles.card_name}>{data.name} {data.color && data.color}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
