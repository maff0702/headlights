import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { Helmet } from 'react-helmet';

import styles from './products.module.scss';
import ProductCard from '../../components/product-card/product-card';
import SerchBar from '../../ui/serch-bar/search-bar';
import { getProductsAll, setError, setPage } from '../../store/productsSlice';
import Spinner from '../../ui/spinner/spinner';
import Pagination from '../../ui/pagination/pagination';

const Products: FC = () => {
  const dispatch = useDispatch();
  const { products, categories, isLoading, isError, currentPage } = useSelector((state) => state.products);
  const { name }: { name: string } = useParams();
  const currentCategory = categories?.filter(elem => elem.name.toLowerCase() === name)[0];
  const screenWidth = screen.width;
  const limitCards = screenWidth < 401
    ? 12
    : screenWidth > 601 && screenWidth < 800
      ? 16
      : 15;
  const params = {
    categoryId: currentCategory?.id,
    limit: limitCards,
    page: currentPage
  };
  useEffect(() => {
    dispatch(getProductsAll({ params }));
    return () => {
      dispatch(setError());
      dispatch(setPage(1));
    };
  }, [dispatch, currentCategory]);
  useEffect(() => {
    dispatch(getProductsAll({ params }));
  }, [dispatch, currentPage]);

  return (
    <div className={styles.content}>
      <Helmet>
        <title>{currentCategory?.name}</title>
        <meta name="description" content={`${currentCategory?.name} - LED фары оптом`} />
      </Helmet>
      <SerchBar />
      {currentCategory?.name && <h1>{currentCategory?.name}</h1>}
      {isLoading && <Spinner />}
      {!currentCategory
        ? !isError && products && products?.length > 0 && <p className={styles.info_errors}>Такой категории не найдено.</p>
        : isError && <p className={styles.info_errors}>Ошибка, попробуйте обновить страницу...</p>}
      {products && products?.length > 0 &&
        <div className={styles.product_cards}>
          {products?.length > 0 && products.map(item => <ProductCard key={item.id} data={item} />)}
        </div>}
      <Pagination limit={params.limit} />
    </div>
  );
};

export default Products;
