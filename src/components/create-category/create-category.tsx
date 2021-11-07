import React, { FC, useState, MouseEvent, ChangeEvent } from 'react';
import { useDispatch } from '../../hooks/hooks';
import { useDropzone } from 'react-dropzone';

import styles from './create-category.module.scss';
import Input from '../../ui/input/input';
import InputImg from '../../ui/input-img/input-img';
import Button from '../../ui/button/button';
import { createCategories } from '../../store/productsSlice';

const CreateCategory: FC = () => {
  const dispatch = useDispatch();
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
    dispatch(createCategories(formData));
  };
  return (
    <div className={styles.form}>
      <h3>Добавить категорию</h3>
      <form onSubmit={onSubmit}>
        {dataInput.map((item, i) => (<Input key={i} {...item} />))}
        <InputImg
          files={files}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
        ><p>Перетащите сюда или нажмите, чтобы выбрать изображение для категории</p></InputImg>
        <Button >Добавить категорию</Button>
      </form>
    </div>
  );
};

export default CreateCategory;
