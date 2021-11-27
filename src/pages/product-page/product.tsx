import React, { FC, useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { Helmet } from 'react-helmet';

import styles from './product.module.scss';
import { IProduct } from '../../types/main';
import {
  getProduct, getProductsAll, editProduct, deleteProduct,
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
import Textarea from '../../ui/textarea/textarea';
import Select from '../../ui/select/select';
import DropzoneImg from '../../ui/input-img/dropzone-img';

const Product: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name }: { name: string } = useParams();
  const { products, currentProduct, categories, isLoading, isError, message, messageInfo } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const similarProduct = currentProduct?.group ? products?.filter(elem => elem.name !== currentProduct?.name && elem.group === currentProduct?.group) : null;
  const [currentImg, setCurrentImg] = useState<string | undefined>(currentProduct?.mainImg);
  const [currentInfo, setCurrentInfo] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState('description');
  const [newInfo, setNewInfo] = useState({
    feature_title: '',
    feature_description: ''
  });
  const [files, setFiles] = useState([]);
  const [mainImg, setMainImg] = useState<string[]>([]);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    vcode: '',
    group: '',
    categoryId: '',
    description: ''
  });
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
  const updateProduct = message === 'Картинка(и) добавлена(ы)!' || message === 'Успешно изменен!';

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

  const clickEditProduct = () => {
    setEditMainInfo(true);
    setCurrentTab('description');
    currentProduct && setStateProduct({
      name: currentProduct?.name,
      price: currentProduct?.price.toString(),
      vcode: currentProduct?.vcode,
      group: currentProduct?.group,
      categoryId: currentProduct?.categoryId.toString(),
      description: currentProduct?.description
    });
  };
  const onChangeProduct = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setStateProduct({
      ...stateProduct,
      [name]: value
    });
  };
  const handleChangeSelect = (event: ChangeEvent< HTMLSelectElement>): void => {
    setStateProduct({ ...stateProduct, categoryId: event.target.value });
  };
  const handleEditProduct = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    currentProduct && formData.append('id', currentProduct.id.toString());
    formData.append('name', stateProduct.name);
    formData.append('price', stateProduct.price);
    formData.append('description', stateProduct.description);
    formData.append('categoryId', stateProduct.categoryId);
    formData.append('vcode', stateProduct.vcode);
    formData.append('group', stateProduct.group);
    formData.append('img', mainImg[0]);
    dispatch(editProduct(formData));
    setEditMainInfo(false);
  };
  const handleDeleteProduct = () => {
    currentProduct?.id && dispatch(deleteProduct({ id: currentProduct.id }));
    message === 'Товар удален!' &&
      history.replace(`/catalog/${history.location?.pathname?.split('/')?.slice(-2)[0]}`);
  };

  const arrImg = [currentProduct?.mainImg];
  currentProduct?.img.forEach((item) => arrImg.push(item?.name));
  const screenWidth = screen.width;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: arrImg.length === 2 ? 2 : 3,
    slidesToScroll: 1,
    vertical: screenWidth > 420 && true,
    swipeToSlide: true,
    centerPadding: '100px',
    verticalSwiping: screenWidth > 420 && true,
    arrows: false
  };

  return (
    <section className={styles.content}>
      <Helmet>
        <title>{currentProduct?.name}</title>
        <meta name="description" content={`${currentProduct?.name} - LED фары оптом`} />
      </Helmet>
      {isLoading && <Spinner />}
      {isError && <p>Ошибка, попробуйте обновить страницу...</p>}
      {currentProduct
      ? <><h1>{!isEditMainInfo
        ? <>{currentProduct?.name}</>
        : <Input styletype='big' onChange={onChangeProduct} value={stateProduct.name} name='name' />}
        </h1>
      <div className={styles.main}>
        <div className={styles.left_container}>
          <div className={arrImg.length > 1 ? styles.other_images : styles.hidden}>
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
            {!isEditMainInfo
              ? <>{currentProduct?.price ? <p>Цена: <span>{currentProduct.price} р</span></p> : null}</>
              : <div className={styles.flex}><p>Цена: </p>
              <Input onChange={onChangeProduct} value={stateProduct.price} name='price' /></div>}
            {!isEditMainInfo
              ? <>{currentProduct?.vcode && <p>Артикул: <span>{currentProduct?.vcode}</span></p>}</>
              : <div className={styles.flex}><p>Артикул:</p>
              <Input onChange={onChangeProduct} value={stateProduct.vcode} name='vcode' /></div>}
          </div>
          {isEditMainInfo && <Select arr={categories} onChange={handleChangeSelect}>Изменить категорию товара</Select>}
          <div className={styles.similar_container}>
          {isEditMainInfo &&
              <div className={styles.flex}><p>Похожие товары: </p><span>
                <Input onChange={onChangeProduct} value={stateProduct.group} name='group' /></span></div>}
            {!isEditMainInfo && similarProduct && similarProduct?.length > 0 && <p>Похожие товары:</p>}
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
        {!isEditMainInfo && <><DropzoneImg
          files={files}
          setFiles={setFiles}
          multiple={true}
        ><p>Перетащите сюда или нажмите, чтобы добавить дополнительные изображения</p></DropzoneImg>
        <div className={styles.wrapper_controller}><Button onClick={handleCreateImage}>Добавить</Button></div></>}
      </div>}
      <div className={styles.info}>
        <div className={styles.tab_containter}>
          <a onClick={() => setCurrentTab('description')} className={currentTab === 'description' ? styles.tab_active : styles.tab}>
            Описание</a>
          <a onClick={() => setCurrentTab('specifications')} className={currentTab === 'specifications' ? styles.tab_active : styles.tab}>
            Характеристики</a>
        </div>
        {currentProduct?.description
          ? !isEditMainInfo && currentTab === 'description' && <pre className={styles.description}>{currentProduct?.description}</pre>
          : currentTab === 'description' && !isEditMainInfo && <p>Описания товара нет</p>}
        {isEditMainInfo && currentTab === 'description' && <Textarea onChange={onChangeProduct} value={stateProduct.description} name='description' />}
        {infoSort && infoSort?.length > 0
          ? currentTab === 'specifications' && <>{infoSort?.map((item: any) => (<div key={item.id} className={styles.info_string}>
            {!currentInfo || currentInfo !== item.id
            ? <p>{item.feature_title}: <span>{item.feature_description}</span></p>
            : <><Input
                value={newInfo.feature_title}
                onChange={onChangeInfo}
                name='feature_title'
              ></Input>
              <Input
              value={newInfo.feature_description}
                onChange={onChangeInfo}
                name='feature_description'
              ></Input></>}
            <span className={styles.button_info}>
              {user?.role === 'ADMIN' && <> {!currentInfo || currentInfo !== item.id
                ? <><Button onClick={() => handleEditInfo(item)}>Изменить</Button>
                  <Button onClick={() => dispatch(deleteInfo({ id: item.id }))}>Удалить</Button></>
                : <Button onClick={saveInfo}>Сохранить</Button>}</>}
            </span>
          </div>))}</>
          : currentTab === 'specifications' && <p>Пока пусто ...</p>}
        <div className={styles.add_info}>
          {messageInfo && <span>{messageInfo}</span>}
          {isAddInfo && currentTab === 'specifications' && <div className={styles.add_input_info}>
            <Input
              value={newInfo.feature_title}
              onChange={onChangeInfo}
              name='feature_title'
              placeholder='Название'
            ></Input>
            <Input
              value={newInfo.feature_description}
              onChange={onChangeInfo}
              name='feature_description'
              placeholder='Описание'
            ></Input>
          </div>}
          <div className={styles.add_button_info}>
            {!isAddInfo
            ? currentTab === 'specifications' && user?.role === 'ADMIN' && <Button onClick={handleCreateInfo}>Добавить характеристику</Button>
            : currentTab === 'specifications' && <>
            <div><Button onClick={() => setAddInfo(false)}>Отменить</Button></div>
            <div><Button onClick={addInfo}>Сохранить</Button></div></>}
          </div>
          {user?.role === 'ADMIN' && <div className={styles.product_control}>
            {!isConfirm && <div><Button onClick={() => setConfirm(true)}>Удалить товар</Button></div>}
            {isConfirm &&
              <div><Button onClick={() => setConfirm(false)}>Отмена</Button>
              <Button onClick={handleDeleteProduct}>Подтвердить</Button></div>}
            <div>{!isEditMainInfo
            ? <div><Button onClick={clickEditProduct}>Редактировать товар</Button></div>
            : <><Button onClick={() => setEditMainInfo(false)}>Отменить</Button>
              <Button onClick={handleEditProduct}>Сохранить</Button></>}</div>
          </div>}
          <p>{message}</p>
        </div>
      </div></>
      : !isError && <p>Не удалось найти товар</p>}
    </section>
  );
};

export default Product;
