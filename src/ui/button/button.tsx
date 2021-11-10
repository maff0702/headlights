import React, { FC } from 'react';

import styles from './button.module.scss';
// { type, value, onChange, placeholder, name }
const Button: FC<any> = (props) => {
  const { styletype } = props;
  return (
    <button
      className={styletype === 'small'
          ? styles.button + ' ' + styles.small
          : styletype === 'big'
            ? styles.button + ' ' + styles.big
            : styles.button + ' ' + styles.medium
      }
      {...props}
    />
  );
};

export default Button;
