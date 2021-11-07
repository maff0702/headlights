import React, { FC } from 'react';

import styles from './input.module.scss';
// { type, value, onChange, placeholder, name }
const Input: FC<any> = (props) => {
  return (
    <input
      className={styles.input}
      {...props}
    />
  );
};

export default Input;
