import React, { FC, useState, MouseEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import styles from './auth.module.scss';
import Input from '../../ui/input/input';
import Button from '../../ui/button/button';
import { requestLogin, requestRegister } from '../../store/authSlice';

const Auth: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { message, token } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    login: '',
    password: ''
  });
  const [currentPage, setCurrentPage] = useState(history.location.pathname.slice(1));
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };
  const dataInput = [
    { type: 'text', value: state.login, onChange: onChange, placeholder: 'Введите login', name: 'login' },
    { type: 'password', value: state.password, onChange: onChange, placeholder: 'Введите пароль', name: 'password' }
  ];
  const onSubmit = (e: MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();
    currentPage === 'login' && dispatch(requestLogin(state));
    currentPage === 'registration' && dispatch(requestRegister(state));
  };
  const handleClickLink = (link) => {
    setCurrentPage(link);
    history.replace(`/${link}`);
  };

  if (token) history.replace('/');

  return (
    <div className={styles.auth}>
      <Helmet>
        <title>Вход</title>
      </Helmet>
      <h1>
        {currentPage === 'login' && <>Авторизация</>}
        {currentPage === 'registration' && <>Регистрация</>}
      </h1>
      <form onSubmit={onSubmit}>
        {dataInput.map((item) => (<div className={styles.wrapper_controller} key={item.name}><Input {...item} /></div>))}
        {message && <p className={styles.auth_info_form}>{message}</p>}
        <div className={styles.wrapper_controller}><Button>Войти</Button></div>
        {currentPage === 'login'
          ? <a onClick={() => handleClickLink('registration')} className={styles.link}>Регистрация</a>
          : <a onClick={() => handleClickLink('login')} className={styles.link}>Авторизация</a>
        }
      </form>
    </div>
  );
};

export default Auth;
