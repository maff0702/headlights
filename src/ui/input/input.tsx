import React, { FC } from 'react';

import styles from './input.module.scss';
// { type, value, onChange, placeholder, name }
const Input: FC<any> = (props) => {
  const { styletype } = props;
  return (
    <div className={styles.input_container}>
      <input className={styletype === 'small'
          ? styles.input + ' ' + styles.small
          : styletype === 'medium'
            ? styles.input + ' ' + styles.medium
            : styles.input + ' ' + styles.normal
      } {...props} />
      {props.info && <p className={styles.input_info}>{props.info}</p>}
    </div>
  );
};

export default Input;
