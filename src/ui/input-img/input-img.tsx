import React, { FC, useEffect } from 'react';

import styles from './input-img.module.scss';

const InputImg: FC<any> = ({ files, getRootProps, getInputProps, children }) => {
  const thumbs = files?.map((file:any) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img
          src={file.preview}
          className={styles.img}
        />
      </div>
    </div>
  ));
  useEffect(() => () => {
    files?.forEach((file:any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className={styles.dropzone_container}>
      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        {children}
      </div>
      <aside className={styles.thumbs_container}>
        {thumbs}
      </aside>
    </div>
  );
};

export default InputImg;
