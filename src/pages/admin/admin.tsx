import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import styles from './admin.module.scss';
import CreateProduct from '../../components/create-product/create-product';
import CreateCategory from '../../components/create-category/create-category';
import { logout } from '../../store/authSlice';

const Admin: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState('addProduct');

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    history.replace('/');
  };

  return (
    <div className={styles.admin}>
      <Helmet>
        <title>Панель администратора</title>
      </Helmet>
      {/* <h1>Панель администратора</h1> */}
      <div className={styles.tab_containter}>
        <a onClick={() => setCurrentTab('addProduct')} className={currentTab === 'addProduct' ? styles.tab_active : styles.tab}>
          Описание</a>
        <a onClick={() => setCurrentTab('addCategory')} className={currentTab === 'addCategory' ? styles.tab_active : styles.tab}>
          Характеристики</a>
          <a onClick={() => setCurrentTab('settings')} className={currentTab === 'settings' ? styles.tab_active : styles.tab}>
          Настройки</a>
      </div>
      <div className={styles.container}>
        <div className={styles.form_container}>
          {currentTab === 'addProduct' && <CreateProduct />}
          {currentTab === 'addCategory' && <CreateCategory />}
        </div>
        {currentTab === 'settings' && <div>
          <a onClick={handleLogout} className={styles.exit}>
            Выйти из аккаунта</a>
        </div>}
      </div>
    </div>
  );
};

export default Admin;
