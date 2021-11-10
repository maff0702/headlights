import React, { FC } from 'react';

import styles from './select.module.scss';

const Select: FC<any> = ({ onChange, styletype, arr, children }) => {
  return (
    <>
    <select defaultValue='DEFAULT' className={styletype === 'small'
          ? styles.select + ' ' + styles.small
          : styletype === 'big'
            ? styles.select + ' ' + styles.big
            : styles.select + ' ' + styles.medium
      } onChange={onChange}>
      <option disabled value='DEFAULT'>{children}</option>
      {arr && arr.length > 0 && arr.map((item:any) => (
      <option key={item.id} value={item.id}>{item.name.substr(0, 40)}</option>))}
    </select>
    </>
  );
};

export default Select;
