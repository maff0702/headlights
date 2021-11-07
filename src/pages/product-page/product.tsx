import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useSelector, useDispatch } from '../../hooks/hooks';

import styles from './product.module.scss';
import { IProduct, IProductImg } from '../../types/main';
import { getProduct, getProductsAll, setError } from '../../store/productsSlice';
import { API_URL_IMG } from '../../utils/constants';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spinner from '../../ui/spinner/spinner';

const Product: FC = () => {
  const dispatch = useDispatch();
  const { name }: { name: string } = useParams();
  const { products, currentProduct, isLoading, isError } = useSelector((state) => state.products);
  const similarProduct = products?.filter(elem => elem.name !== currentProduct?.name && elem.group === currentProduct?.group);
  const [currentImg, setCurrentImg] = useState(currentProduct?.mainImg);
  useEffect(() => {
    dispatch(getProduct({ name }));
    return () => { dispatch(setError()); };
  }, [name, dispatch]);
  useEffect(() => {
    if (currentProduct?.group) dispatch(getProductsAll({ params: { group: currentProduct?.group, limit: 11 } }));
    setCurrentImg(currentProduct?.mainImg);
  }, [currentProduct]);
  const handleClickImg = (item: string): void => {
    setCurrentImg(item);
  };
  // const leftBarImg = currentProduct ? [...currentProduct?.img].unshift({ currentProduct}) : [];
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    swipeToSlide: true,
    centerPadding: '100px',
    verticalSwiping: true,
    arrows: false
  };

  return (
    <section className={styles.content}>
      {isLoading && <Spinner />}
      {isError && <p>Ошибка, попробуйте обновить страницу...</p>}
      {currentProduct
      ? <><h1>{currentProduct?.name}</h1>
      <div className={styles.main}>
        <div className={styles.left_container}>
          <div className={styles.other_images}>
            <Slider {...settings}>
              {currentProduct?.mainImg && <img src={`${API_URL_IMG}/${currentProduct?.mainImg}`} />}
              {currentProduct?.img.map((item: IProductImg) => (<div key={item.id} onClick={() => handleClickImg(item.name)} className={styles.other_image}>
                <img src={`${API_URL_IMG}/${item.name}`} />
              </div>))}
            </Slider>
          </div>
          <div className={styles.main_image}>
            <img src={`${API_URL_IMG}/${currentImg}`} />
          </div>
        </div>
        <div className={styles.right_container}>
          <div>
            {currentProduct?.price && <p>Цена: <span>{currentProduct?.price} р</span></p>}
            {currentProduct?.vcode && <p>Артикул: <span>{currentProduct?.vcode}</span></p>}
          </div>
          <div className={styles.similar_container}>
            {similarProduct && similarProduct?.length > 0 && <p>Похожие товары:</p>}
            <div className={styles.similar_product}>
              {similarProduct?.map((item: IProduct) => (<div key={item.id}>
                <Link to={`/catalog/${currentProduct?.name?.toLowerCase()}/${item?.name?.toLowerCase()}`}>
                  <img src={`${API_URL_IMG}/${item?.mainImg}`} />
                </Link>
              </div>))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <p>Описание</p>
        {currentProduct?.description && <pre className={styles.description}>{currentProduct?.description}</pre>}
        {currentProduct?.info.length > 0 && <p>Характеристики</p>}
        {[...currentProduct?.info].reverse().map((item: any) => (<p key={item.id}>{item.feature_title} <span>{item.feature_description}</span></p>))}
      </div></>
      : !isError && <p>Не удалось найти товар</p>}
    </section>
  );
};

export default Product;
