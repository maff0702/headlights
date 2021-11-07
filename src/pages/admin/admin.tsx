import React, { FC } from 'react';

import styles from './admin.module.scss';
import CreateProduct from '../../components/create-product/create-product';
import CreateCategory from '../../components/create-category/create-category';

const Admin: FC = () => {
  return (
    <div className={styles.admin}>
      <h1>Панель администратора</h1>
      <div className={styles.form_container}>
        <CreateProduct />
        <br /><br /><br /><br />
        <CreateCategory />
      </div>
    </div>
  );
};

export default Admin;
