import React, { FC, useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useSelector, useDispatch } from '../../hooks/hooks';

import styles from './product.module.scss';
import { IProduct } from '../../types/main';
import {
  getProduct, getProductsAll,
  deleteImg, createImg,
  createInfo, editInfo, deleteInfo,
  setError
} from '../../store/productsSlice';
import { API_URL_IMG } from '../../utils/constants';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spinner from '../../ui/spinner/spinner';
import Input from '../../ui/input/input';
import Button from '../../ui/button/button';
import DropzoneImg from '../../ui/input-img/dropzone-img';

const Product: FC = () => {
  const dispatch = useDispatch();
  const { name }: { name: string } = useParams();
  const { products, currentProduct, isLoading, isError, message, messageInfo } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const similarProduct = products?.filter(elem => elem.name !== currentProduct?.name && elem.group === currentProduct?.group);
  const [currentImg, setCurrentImg] = useState<string | undefined>(currentProduct?.mainImg);
  const [currentInfo, setCurrentInfo] = useState<number | null>(null);
  const [newInfo, setNewInfo] = useState({
    feature_title: '',
    feature_description: ''
  });
  const [files, setFiles] = useState([]);
  const [mainImg, setMainImg] = useState<any>([]);
  const [isEditMainInfo, setEditMainInfo] = useState(false);
  const [isAddInfo, setAddInfo] = useState(false);
  const [isConfirm, setConfirm] = useState(false);

  const infoSort = currentProduct && Array.isArray(currentProduct.info)
  ? [...currentProduct.info].sort(function (a, b) {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  })
  : null;
  const updateProduct = message === 'Картинка(и) добавлена(ы)!';
  useEffect(() => {
    dispatch(getProduct({ name }));
    return () => { dispatch(setError()); };
  }, [name, updateProduct, dispatch]);
  useEffect(() => {
    if (currentProduct?.group) dispatch(getProductsAll({ params: { group: currentProduct?.group, limit: 11 } }));
    setCurrentImg(currentProduct?.mainImg);
  }, [currentProduct]);
  const handleClickImg = (item: string | undefined): void => {
    setCurrentImg(item);
  };
  const handleCreateImage = (e: MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const productId = currentProduct?.id.toString();
    const formData = new FormData();
    productId && formData.append('productId', productId);
    for (let i = 0; i < files.length; i++) {
      formData.append('img', files[i]);
    }
    dispatch(createImg(formData));
  };
  const deleteImage = (name:string | undefined) => {
    const id = currentProduct?.img.filter((item) => item.name === name)[0].id;
    id && dispatch(deleteImg({ id }));
  };
  const handleEditInfo = (info:any) => {
    setCurrentInfo(info?.id);
    setAddInfo(false);
    info && setNewInfo({
      feature_title: info.feature_title,
      feature_description: info.feature_description
    });
  };
  const handleCreateInfo = () => {
    setAddInfo(true);
    setNewInfo({ feature_title: '', feature_description: '' });
    setCurrentInfo(null);
  };
  const onChangeInfo = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setNewInfo({
      ...newInfo,
      [name]: value
    });
  };
  const saveInfo = () => {
    handleEditInfo(null);
    dispatch(editInfo({
        id: currentInfo,
        title: newInfo.feature_title,
        description: newInfo.feature_description
      }));
  };
  const addInfo = () => {
    dispatch(createInfo({
        productId: currentProduct?.id,
        title: newInfo.feature_title,
        description: newInfo.feature_description
      }));
  };
  const arrImg = [currentProduct?.mainImg];
  currentProduct?.img.forEach((item) => arrImg.push(item?.name));
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: arrImg.length === 2 ? 2 : 3,
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
      ? <><h1>{currentProduct?.name}
          <Input></Input>
        </h1>
      <div className={styles.main}>
        <div className={styles.left_container}>
          <div className={styles.other_images}>
            <Slider {...settings}>
              {arrImg?.length > 1 && arrImg?.map((item) => (<div key={item} onClick={() => handleClickImg(item)} className={styles.other_image}>
                <img src={`${API_URL_IMG}/${item}`} />
              </div>))}
            </Slider>
          </div>
          <div className={styles.main_image}>
          {currentImg !== currentProduct?.mainImg && user?.role === 'ADMIN' &&
          <span onClick={() => deleteImage(currentImg)} className={styles.close} />}
            <img src={`${API_URL_IMG}/${currentImg}`} />
          </div>
        </div>
        <div className={styles.right_container}>
          <div>
            {currentProduct?.price ? <p>Цена: <span>{currentProduct.price} р</span></p> : null}
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
      {user?.role === 'ADMIN' && <div className={styles.similar_container}>
        {message && <p>{message}</p>}
        {isEditMainInfo && <DropzoneImg
          files={mainImg}
          setFiles={setMainImg}
          multiple={false}
        ><p>Перетащите сюда или нажмите, чтобы изменить основное изображение</p></DropzoneImg>}
        <DropzoneImg
          files={files}
          setFiles={setFiles}
          multiple={true}
        ><p>Перетащите сюда или нажмите, чтобы добавить дополнительные изображения</p></DropzoneImg>
        <Button onClick={handleCreateImage} styletype='small'>Добавить</Button>
      </div>}
      <div className={styles.info}>
        <p>Описание</p>
        {currentProduct?.description && <pre className={styles.description}>{currentProduct?.description}</pre>}
        {currentProduct?.info.length > 0 && <p>Характеристики</p>}
        {infoSort?.map((item: any) => (<div key={item.id} className={styles.info_string}>
          {!currentInfo || currentInfo !== item.id
          ? <p>{item.feature_title}: <span>{item.feature_description}</span></p>
          : <><Input styletype='small'
              value={newInfo.feature_title}
              onChange={onChangeInfo}
              name='feature_title'
            ></Input>
            <Input styletype='small'
            value={newInfo.feature_description}
              onChange={onChangeInfo}
              name='feature_description'
            ></Input></>}
          <span className={styles.button_info}>
            {user?.role === 'ADMIN' && <> {!currentInfo || currentInfo !== item.id
              ? <><Button onClick={() => handleEditInfo(item)} styletype='small'>Изменить</Button>
                <Button onClick={() => dispatch(deleteInfo({ id: item.id }))} styletype='small'>Удалить</Button></>
              : <Button onClick={saveInfo} styletype='small'>Сохранить</Button>}</>}
          </span>
        </div>))}
        <div className={styles.add_info}>
        {messageInfo && <span>{messageInfo}</span>}
          {isAddInfo && <div className={styles.add_input_info}>
            <Input styletype='small'
              value={newInfo.feature_title}
              onChange={onChangeInfo}
              name='feature_title'
              placeholder='Название'
            ></Input>
            <Input styletype='small'
              value={newInfo.feature_description}
              onChange={onChangeInfo}
              name='feature_description'
              placeholder='Описание'
            ></Input>
          </div>}
          <div className={styles.add_button_info}>
            {!isAddInfo
            ? <Button onClick={handleCreateInfo} styletype='small'>Добавить характеристику</Button>
            : <Button onClick={addInfo} styletype='small'>Сохранить</Button>}
          </div>
          <div className={styles.product_control}>
            {!isConfirm && <Button onClick={() => setConfirm(true)} styletype='small'>Удалить товар</Button>}
            {isConfirm &&
              <div><Button onClick={() => setConfirm(false)}>Отмена</Button>
              <Button>Подтвердить</Button></div>}
            <div>{!isEditMainInfo
            ? <Button onClick={() => setEditMainInfo(true)} styletype='small'>Редактировать товар</Button>
            : <><Button onClick={() => setEditMainInfo(false)} styletype='small'>Отменить</Button>
              <Button onClick={() => setEditMainInfo(false)} styletype='small'>Сохранить</Button></>}</div>
          </div>
        </div>
      </div></>
      : !isError && <p>Не удалось найти товар</p>}
    </section>
  );
};

export default Product;
