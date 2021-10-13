import React, { FC } from 'react';
import { useParams } from 'react-router';
import { useSelector } from '../../hooks/hooks';

import styles from './products.module.scss';
import ProductCard from '../product-card/product-card';
import SerchBar from '../serch-bar/search-bar';

const Products: FC = () => {
  const { products, categories } = useSelector((state) => state.products);
  const { id }: { id: string } = useParams();
  const currentProducts = products.filter(elem => elem.categories === id);
  const nameCategories = categories.filter(elem => elem.id === id)[0].name;
  return (
    <div className={styles.content}>
      <SerchBar />
      <h1>{nameCategories}</h1>
      <div className={styles.product_cards}>
        {currentProducts.length > 0 && currentProducts.map(item => <ProductCard key={item.id} data={item} />)}
      </div>
    </div>
  );
};

export default Products;
