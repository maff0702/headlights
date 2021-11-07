import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from '../../hooks/hooks';

import styles from './catalog-cards.module.scss';
import { setError } from '../../store/productsSlice';
import { ICategory } from '../../types/main';
import { API_URL_IMG } from '../../utils/constants';
import Spinner from '../../ui/spinner/spinner';

const CatalogCards: FC = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, isError } = useSelector((store) => store.products);
  const categoriesSort = Array.isArray(categories)
  ? [...categories].sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  })
  : null;
  useEffect(() => {
    return () => { dispatch(setError()); };
  }, [dispatch]);

  return (
    <div className={styles.catalog_cards}>
      {isLoading && <Spinner /> }
      {isError && <p>Ошибка, попробуйте обновить страницу...</p>}
      {categoriesSort && categoriesSort?.length > 0
      ? categoriesSort.map((item: ICategory) => (
        <div key={item.id} className={styles.card}>
          <Link className={styles.card} to={{ pathname: `/catalog/${item.name.toLowerCase()}`, state: { id: item.id } }}>
            <img className={styles.card_img} src={`${API_URL_IMG}/${item.img}`} alt={item.name} />
            <p className={styles.card_name}>{item.name.length > 25
            ? item.name.substr(0, 25) + ' ...'
            : item.name}</p>
          </Link>
        </div>
      ))
      : !isError && <p>Не удалось найти товар</p>}
    </div>
  );
};

export default CatalogCards;
