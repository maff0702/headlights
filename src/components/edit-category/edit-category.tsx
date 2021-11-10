import React, { FC, useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { useDropzone } from 'react-dropzone';

import styles from './edit-category.module.scss';
import { ICategory } from '../../types/main';
import Input from '../../ui/input/input';
import InputImg from '../../ui/input-img/input-img';
import Button from '../../ui/button/button';
import { editCategory, deleteCategory, setError } from '../../store/productsSlice';

interface IEditCategoryProps {
  readonly category: ICategory;
  readonly setActive: any;
}

const EditCategory: FC<IEditCategoryProps> = ({ category, setActive }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.products);
  const [stateCategory, setStateCategory] = useState({
    name: category?.name
  });
  const [files, setFiles] = useState([]);
  const [isConfirm, setConfirm] = useState(false);
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setStateCategory({
      ...stateCategory,
      [name]: value
    });
  };
  const dataInput = [
    { type: 'text', value: stateCategory.name, onChange: onChange, placeholder: 'Название категории', name: 'name' }
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
    dispatch(editCategory({ id: category.id, formData }));
  };
  const handleClickDelete = () => {
    dispatch(deleteCategory({ id: category.id }));
    setActive();
  };
  useEffect(() => {
    dispatch(setError());
    return () => { dispatch(setError()); };
  }, [dispatch]);
  return (
  <div className={styles.edit_category}>
    <form onSubmit={onSubmit}>
      {dataInput.map((item, i) => (<div className={styles.wrapper_control} key={i}><Input {...item} /></div>))}
      <div className={styles.wrapper_control}>
        <InputImg
          files={files}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
        ><p>Перетащите сюда или нажмите, для изменения изображения</p></InputImg>
      </div>
      <p>{message}</p>
      <div className={styles.wrapper_control}><Button>Сохранить</Button></div>
    </form>
    {!isConfirm && <Button onClick={() => setConfirm(true)}>Удалить категорию</Button>}
    {isConfirm && <div className={styles.confirm}>
      <p>Если вы удалите категорию, то товар относящийся к ней, не будет отображаться</p>
      <p><Button onClick={() => setConfirm(false)}>Отмена</Button>
      <Button onClick={handleClickDelete}>Подтвердить</Button></p>
    </div>}
  </div>
  );
};

export default EditCategory;
