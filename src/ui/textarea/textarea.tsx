import React, { FC } from 'react';

import styles from './textarea.module.scss';
const Textarea: FC<any> = ({ value, name, onChange, children }) => {
  return (
    <div className={styles.textarea_container}>
      <p>{children}</p>
      <textarea name={name} onChange={onChange} value={value}>
        ddsadas
      </textarea>
    </div>
  );
};

export default Textarea;
