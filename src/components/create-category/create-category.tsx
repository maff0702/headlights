import React, { FC, useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { useDropzone } from 'react-dropzone';

import styles from './create-category.module.scss';
import Input from '../../ui/input/input';
import InputImg from '../../ui/input-img/input-img';
import Button from '../../ui/button/button';
import { createCategory, setError } from '../../store/productsSlice';

const CreateCategory: FC = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.products);
  const [stateCategory, setStateCategory] = useState({
    name: ''
  });
  const [files, setFiles] = useState([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setStateCategory({
      ...stateCategory,
      [name]: value
    });
  };
  const dataInput = [
    { type: 'text', value: stateCategory.name, onChange: onChange, placeholder: 'Введите название категории', name: 'name' }
  ];
  const onDrop = (acceptedFiles: any) => {
    setFiles(acceptedFiles.map((file:any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };
  const { getRootProps, getInputProps } = useDropzone({ accept: 'image/*', onDrop, multiple: false });
  const onSubmit = (e: MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', stateCategory.name);
    formData.append('img', files[0]);
    dispatch(createCategory(formData));
  };
  useEffect(() => {
    dispatch(setError());
    return () => { dispatch(setError()); };
  }, [dispatch]);
  return (
    <div className={styles.form}>
      <h3>Добавить категорию</h3>
      <form onSubmit={onSubmit}>
        {dataInput.map((item, i) => (<div className={styles.wrapper_control} key={i}><Input {...item} /></div>))}
        <InputImg
          files={files}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
        ><p>Перетащите сюда или нажмите, чтобы выбрать изображение для категории</p></InputImg>
        <p className={styles.form_info}>{message}</p>
        <div className={styles.wrapper_control}><Button >Добавить категорию</Button></div>
      </form>
    </div>
  );
};

export default CreateCategory;
