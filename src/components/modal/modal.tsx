import { useEffect, FC, ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { History } from 'history';
import ReactDOM from 'react-dom';

import styles from './modal.module.scss';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('modals');

interface IModalProps {
  readonly active: boolean;
  readonly setActive: any;
  title?: string;
  readonly children: ReactNode;
}

const Modal: FC<IModalProps> = ({ active, setActive, title, children }) => {
  const history: History = useHistory();
  const location = useLocation<{background:{pathname: string}}>();

  const closeModal = () => {
    if (setActive) setActive();
    history.replace({
      pathname: location?.state
      ? `${location?.state?.background?.pathname}`
      : '/'
    });
  };

  const closeModalEsc = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') closeModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModalEsc);
    return () => document.removeEventListener('keydown', closeModalEsc);
  });

  return (
    active && modalRoot
    ? ReactDOM.createPortal((
    <ModalOverlay
      active={active}
      closeModal={closeModal}
    >
      <div className={active ? styles.modal__body + ' ' + styles.modal__body_active : styles.modal__body} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>{title}</div>
        <span onClick={closeModal} className={styles.modal__close} />
        {children}
      </div>
    </ModalOverlay>
    ), modalRoot)
    : null);
};

export default Modal;
