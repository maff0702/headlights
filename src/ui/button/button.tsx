import React, { FC } from 'react';

import styles from './button.module.scss';
// { type, value, onChange, placeholder, name }
const Button: FC<any> = (props) => {
  return (
    <button
      className={styles.button}
      {...props}
    />
  );
};

export default Button;
