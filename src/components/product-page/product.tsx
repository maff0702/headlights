import React, { FC } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';

import styles from './product.module.scss';

const Product: FC = () => {
  const { id }: { id: string } = useParams();
  const { products } = useSelector((state) => state.products);
  const currentProduct = products.filter(elem => elem.id === id)[0];
  const similarProduct = products.filter(elem => elem.id !== id && elem.name === currentProduct.name);
  console.log(similarProduct);
  return (
    <section className={styles.content}>
      <h1>{currentProduct.name}</h1>
      <div className={styles.main}>
        <div>
          <img src={currentProduct.img} />
        </div>
        <div>
          <div>
            {currentProduct?.price && <p>Цена: {currentProduct.price} р</p>}
          </div>
          <div className={styles.similar_product}>
            {similarProduct.map((item) => (<div key={item.id}>
              <Link to={`/catalog/${id}/${item.id}`}>
                <img src={item.img} />
              </Link>
            </div>))}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <p>Характеристики</p>
        {currentProduct?.voltage && <p>Напряжение: {currentProduct.voltage}</p>}
        {currentProduct?.power && <p>Мощность: {currentProduct.power}</p>}
      </div>
    </section>
  );
};

export default Product;
