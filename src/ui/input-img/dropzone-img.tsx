import React, { FC, useEffect } from 'react';
import Dropzone from 'react-dropzone';

import styles from './input-img.module.scss';

const DropzoneImg: FC<any> = ({ setFile, files, multiple, children }) => {
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
    <Dropzone onDrop={(acceptedFiles) => {
      setFile(acceptedFiles.map((file:any) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      }} multiple={multiple}>
      {({ getRootProps, getInputProps }) => (
        <div className={styles.dropzone_container}>
          <div className={styles.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            {children}
          </div>
          <aside className={styles.thumbs_container}>
            {thumbs}
          </aside>
        </div>
      )}
    </Dropzone>
  );
};

export default DropzoneImg;
