import React, { FC, useState, ChangeEvent, SyntheticEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './search-bar.module.scss';
import ProductService from '../../services/product-service';
import { IProduct } from '../../types/main';
import { API_URL_IMG } from '../../utils/constants';

const SerchBar: FC = () => {
  const history = useHistory();
  const [search, setSerach] = useState('');
  const [info, setInfo] = useState<IProduct[]>([]);
  const [count, setCount] = useState(0);
  const [focus, setFocus] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSerach(value);
    ProductService.productGetAll({ search: value, limit: 5, page: 1 })
    .then((res) => {
      setInfo(res.data.rows);
      setCount(res.data.count);
    });
  };
  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    history.push(`/search/${search.toLowerCase()}`);
    setSerach('');
  };
  return (
    <div className={styles.search_container}>
      <form onSubmit={onSubmit}>
        <div className={styles.search}>
          <input type="text" placeholder='Поиск...' value={search} onChange={onChange} onBlur={() => setTimeout(() => setFocus(false), 200)} onFocus={() => setFocus(true)} />
          <span onClick={onSubmit}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/>
            </svg>
          </span>
        </div>
        {focus && info?.length > 0 && <div className={styles.search_result}>
          {info.map((item) => (
            <Link key={item.id} onFocus={() => setFocus(true)} className={styles.card} to={`/catalog/${search?.toLowerCase()}/${item.name.toLowerCase()}`}>
            <div className={styles.search_card}>
              <img src={`${API_URL_IMG}/${item?.mainImg}`} height='50px' width='50px' />
              <p>{item.name}</p>
            </div>
            </Link>
          ))}
          {count > 5 && <div className={styles.search_card}>
              Всего найдено: {count}
          </div>}
        </div>}
      </form>
    </div>
  );
};

export default SerchBar;
