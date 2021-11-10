import React, { FC, useState, MouseEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';

import styles from './create-product.module.scss';
import Input from '../../ui/input/input';
import Button from '../../ui/button/button';
import DropzoneImg from '../../ui/input-img/dropzone-img';
import Select from '../../ui/select/select';
import Textarea from '../../ui/textarea/textarea';
import { createProduct } from '../../store/productsSlice';

const infoTitle = [
  { title: 'Мощность светильника', description: '', number: 1 },
  { title: 'Световой поток', description: '', number: 2 },
  { title: 'Температура свечения, К', description: '', number: 3 },
  { title: 'Габаритный размер, мм', description: '', number: 4 },
  { title: 'Коэффициент пульсации, %', description: '', number: 5 },
  { title: 'Коэффициент мощности', description: '', number: 6 },
  { title: 'Тик КСС', description: '', number: 7 },
  { title: 'Индекс цветопередачи, Ra', description: '', number: 8 },
  { title: 'Масса изделия, кг', description: '', number: 9 },
  { title: 'Диапазон рабочих температур, C', description: '', number: 10 },
  { title: 'Гарантийный срок, г', description: '', number: 11 },
  { title: 'Функция диммирования', description: '', number: 12 },
  { title: 'Степень защиты от влаги и пыли, IP', description: '', number: 13 }
];

const CreateProduct: FC = () => {
  const dispatch = useDispatch();
  const { categories, message } = useSelector((state) => state.products);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '' as any,
    vcode: '',
    group: '',
    description: ''
  });
  const [info, setInfo] = useState<any>([...infoTitle]);
  const [files, setFiles] = useState([]);
  const [mainImg, setMainImg] = useState<any>([]);
  const [categoryId, setCategoryId] = useState('');
  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = (number:any) => {
      setInfo(info.filter((i:any) => i.number !== number));
  };
  const changeInfo = (key:any, value:any, number:any) => {
      setInfo(info.map((i:any) => i.number === number ? { ...i, [key]: value } : i));
  };

  const handleChangeSelect = (event: ChangeEvent< HTMLSelectElement>): void => {
    setCategoryId(event.target.value);
  };
  const clearForm = () => {
    setStateProduct({ name: '', price: '' as any, vcode: '', group: '', description: '' });
    setMainImg([]);
    setFiles([]);
    setCategoryId('');
    setInfo([...infoTitle]);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setStateProduct({
      ...stateProduct,
      [name]: value
    });
  };

  const dataInput = [
    { type: 'text', value: stateProduct.name, onChange: onChange, placeholder: 'Наименование', name: 'name' },
    { type: 'number', value: stateProduct.price, onChange: onChange, placeholder: 'Цена', name: 'price' },
    { type: 'text', value: stateProduct.vcode, onChange: onChange, placeholder: 'Артикул', name: 'vcode' },
    { type: 'text', value: stateProduct.group, onChange: onChange, placeholder: 'Общие товары', name: 'group' }
  ];
  const onSubmit = (e: MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newInfo = info.filter((i:any) => i.description !== '');
    const formData = new FormData();
    formData.append('name', stateProduct.name);
    formData.append('mainImg', mainImg[0]);
    formData.append('price', stateProduct.price);
    formData.append('vcode', stateProduct.vcode);
    formData.append('group', stateProduct.group);
    formData.append('categoryId', categoryId);
    formData.append('description', stateProduct.description);
    formData.append('info', JSON.stringify(newInfo));
    for (let i = 0; i < files.length; i++) {
      formData.append('img', files[i]);
    }
    dispatch(createProduct(formData));
  };
  return (
    <div className={styles.form}>
      <h3>Добавить товар</h3>
      {/* <form onSubmit={onSubmit}> */}
        {dataInput.map((item, i) => (<div className={styles.wrapper_control} key={i}><Input {...item} /></div>))}
        <div className={styles.wrapper_control}><Select arr={categories} onChange={handleChangeSelect}>Выберите категорию товара</Select></div>
        <div className={styles.wrapper_control}>
          <Textarea name='description' value={stateProduct.description} onChange={onChange}>Описание товара</Textarea>
        </div>
        <div className={styles.wrapper_control}>
          <DropzoneImg
            files={mainImg}
            setFiles={setMainImg}
            multiple={false}
          ><p>Перетащите сюда или нажмите, чтобы выбрать основное изображение</p></DropzoneImg>
        </div>
        <div className={styles.wrapper_control}>
          <DropzoneImg
            files={files}
            setFiles={setFiles}
            multiple={true}
          ><p>Перетащите сюда или нажмите, чтобы выбрать дополнительные изображения</p></DropzoneImg>
        </div>
        <div className={styles.wrapper_control}><Button onClick={addInfo}>Добавить новую характеристику</Button></div>
        <div className={styles.info_block}>
          {info.map((i:any) =>
            <div key={i.number} className={styles.info_control}>
              <div className={styles.left_input}>
                <Input
                  value={i.title}
                  onChange={(e:any) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Название свойства"
                />
              </div>
              <div className={styles.right_input}>
                <Input
                  value={i.description}
                  onChange={(e:any) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Описание свойства"
                />
              </div>
              <div className={styles.button}>
                  <Button onClick={() => removeInfo(i.number)}>Удалить</Button>
              </div>
            </div>
          )}
        </div>
        <p className={styles.form_info}>{message}</p>
        <div className={styles.button_container}>
          <Button onClick={clearForm}>Очистить форму</Button>
          <Button onClick={onSubmit}>Добавить товар</Button>
        </div>
      {/* </form> */}
    </div>
  );
};

export default CreateProduct;
