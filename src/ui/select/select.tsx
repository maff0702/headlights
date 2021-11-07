import React, { FC } from 'react';

import styles from './select.module.scss';

const Select: FC<any> = ({ onChange, arr, children }) => {
  return (
    <>
    <select defaultValue='DEFAULT' className={styles.select} onChange={onChange}>
      <option disabled value='DEFAULT'>{children}</option>
      {arr && arr.length > 0 && arr.map((item:any) => (
      <option key={item.id} value={item.id}>{item.name.substr(0, 40)}</option>))}
    </select>
    </>
  );
};

export default Select;
