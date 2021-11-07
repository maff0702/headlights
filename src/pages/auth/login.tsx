import React, { FC, useState, MouseEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { useHistory } from 'react-router';

import styles from './auth.module.scss';
import Input from '../../ui/input/input';
import Button from '../../ui/button/button';
import { requestLogin } from '../../store/authSlice';

const Login: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { message, token } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    login: '',
    password: ''
  });
  console.log(message);
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
    dispatch(requestLogin(state));
  };

  if (token) history.replace('/');

  return (
    <div className={styles.auth}>
      <h1>Авторизация</h1>
      <form onClick={onSubmit}>
        {dataInput.map((item) => (<Input key={item.name} {...item} />))}
        <Button>Войти</Button>
      </form>
    </div>
  );
};

export default Login;
