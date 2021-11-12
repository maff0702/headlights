import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from '../../hooks/hooks';

import styles from './search-page.module.scss';
import ProductCard from '../../components/product-card/product-card';
import SerchBar from '../../ui/serch-bar/search-bar';
import { getProductsAll, setError, setPage } from '../../store/productsSlice';
import Spinner from '../../ui/spinner/spinner';
import Pagination from '../../ui/pagination/pagination';
import { Helmet } from 'react-helmet';

const SearchPage: FC = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, currentPage, totalCount } = useSelector((state) => state.products);
  const { name }: { name: string } = useParams();
  const params = {
    search: name,
    limit: 15,
    page: currentPage
  };

  useEffect(() => {
    dispatch(getProductsAll({ params }));
    return () => {
      dispatch(setError());
      dispatch(setPage(1));
    };
  }, [dispatch, name]);
  useEffect(() => {
    dispatch(getProductsAll({ params }));
  }, [dispatch, currentPage]);

  return (
    <div className={styles.content}>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={`Поиск по запросу ${name} - найдено ${totalCount} товаров. LED фары оптом`} />
      </Helmet>
      <SerchBar />
      {name && <h1>Поиск по запросу: {name}</h1>}
      <p>всего найдено товаров: {totalCount}</p>
      {isLoading && <Spinner /> }
      <div className={styles.info_errors}>
        {isError && <p>Ошибка, попробуйте обновить страницу...</p>}
      </div>
      {products && products?.length > 0
      ? <div className={styles.product_cards}>
        {products?.length > 0 && products.map(item => <ProductCard key={item.id} data={item} />)}
      </div>
      : !isError && <p>По вашему запросу ничего не найдено.</p>}
      <Pagination limit={params.limit} />
    </div>
  );
};

export default SearchPage;
