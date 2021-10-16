import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';

import styles from './product.module.scss';

const Product: FC = () => {
  const { id }: { id: string } = useParams();
  const { products } = useSelector((state) => state.products);
  const currentProduct = products.filter(elem => elem.id === id)[0];
  const similarProduct = products.filter(elem => elem.id !== id && elem.name === currentProduct.name);
  const [currentImg, setCurrentImg] = useState(currentProduct?.img[0]);
  useEffect(() => {
    setCurrentImg(currentProduct?.img[0]);
  }, [id]);
  const handleClickImg = (item :string): void => {
    setCurrentImg(item);
  };

  return (
    <section className={styles.content}>
      <h1>{currentProduct.name}</h1>
      <div className={styles.main}>
        <div className={styles.left_container}>
          <div className={styles.other_images}>
            {currentProduct.img.map((item) => (<p key={item} onClick={() => handleClickImg(item)} className={styles.other_image}>
              <img src={item} />
            </p>))}
          </div>
          <div className={styles.main_image}>
            <img src={currentImg} />
          </div>
        </div>
        <div className={styles.right_container}>
          <div>
            {currentProduct?.price && <p>Цена: <span>{currentProduct.price} р</span></p>}
            {currentProduct?.vCode && <p>Артикул: <span>{currentProduct.vCode}</span></p>}
          </div>
          <div className={styles.similar_container}>
            {currentProduct?.color && <p>Цвет:</p>}
            <div className={styles.similar_product}>
              {similarProduct.map((item) => (<div key={item.id}>
                <Link to={`/catalog/${currentProduct.categories}/${item.id}`}>
                  <img src={item.img[0]} />
                </Link>
              </div>))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <p>Описание</p>
        {currentProduct?.description && <pre className={styles.desc}>{currentProduct.description}</pre>}
        <p>Характеристики</p>
        {currentProduct?.lampType && <p>Тип лампы: <span>{currentProduct.lampType}</span></p>}
        {currentProduct?.voltage && <p>Напряжение: <span>{currentProduct.voltage}</span></p>}
        {currentProduct?.power && <p>Мощность: <span>{currentProduct.power}</span></p>}
      </div>
    </section>
  );
};

export default Product;
