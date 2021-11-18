import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from '../../hooks/hooks';

import styles from './catalog-cards.module.scss';
import { setError } from '../../store/productsSlice';
import { ICategory } from '../../types/main';
import { API_URL_IMG } from '../../utils/constants';
import Spinner from '../../ui/spinner/spinner';
import Modal from '../modal/modal';
import EditCategory from '../edit-category/edit-category';
import Button from '../../ui/button/button';

const CatalogCards: FC = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, isError } = useSelector((store) => store.products);
  const role = useSelector((store) => store.auth.user?.role);
  const [isModal, semModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<ICategory>({
    id: 0,
    name: '',
    img: []
  });
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
    dispatch(setError());
    return () => { dispatch(setError()); };
  }, [dispatch, categories]);

  return (
    <>
      <div className={styles.info_block}>
        {isLoading && <Spinner /> }
        {isError && <p>Ошибка, попробуйте обновить страницу...</p>}
      </div>
      <div className={styles.catalog_cards}>
        {categoriesSort && categoriesSort?.length > 0
        ? categoriesSort.map((item: ICategory) => (
          <div key={item.id} className={styles.card}>
            <Link className={styles.card} to={{ pathname: `/catalog/${item.name.toLowerCase()}`, state: { id: item.id } }}>
              <img className={styles.card_img} src={`${API_URL_IMG}/${item.img}`} alt={item.name} />
              <p className={styles.card_name}>{item.name.length > 25
              ? item.name.substr(0, 25) + ' ...'
              : item.name}</p>
            </Link>
            {role && role === 'ADMIN' && <Button
              onClick={() => {
                semModal(true);
                setCurrentCategory(item);
                }}>Редактировать</Button>}
          </div>
        ))
        : !isError && !isLoading && categoriesSort?.length === 0 && <p>В данный момент каталог пустой.</p>}
        <Modal
          active={isModal}
          setActive={semModal}
          title="Редактирование категории"
        >
          <EditCategory category={currentCategory} setActive={semModal} />
        </Modal>
      </div>
    </>
  );
};

export default CatalogCards;
