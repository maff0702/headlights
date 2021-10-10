import React, { FC } from 'react';

import styles from './main.module.scss';
import SerchBar from '../serch-bar/search-bar';
import Catalog from '../catalog/catalog';
import likeImg from '../../images/like.svg';
import dollarImg from '../../images/dollar.svg';
import readyImg from '../../images/ready.svg';
import operatorImg from '../../images/operator.svg';
import rosavtodorImg from '../../images/rosavtodor1.svg';
import rzdImg from '../../images/rzd1.svg';

const Main: FC = () => {
  return (
    <section className={styles.content}>
      <SerchBar />
      <div className={styles.content_catalog}>
        <h2 className={styles.content_name}>Каталог товаров</h2>
        <Catalog />
      </div>
      <div className={styles.info_company}>
        <h3>О нашей компании</h3>
        <p>Наша компания на протяжении пяти лет занимается обеспечением качественной LED оптикой производителей спецтехники в России и ближнего зарубежья. </p>
        <p>Светодиодные фары заняли своё прочное  место  во всём мире из-за своего низкого энергопотребления увеличивая срок службы узлов и агрегатов спецтехники.</p>
        <p>Среди заказчиков дополнительного рабочего света РЖД, Росавтодор, строительные и коммунальные структуры и организации. </p>
        <p>Сегодня  Россия строит, добывает, производит, выращивает  и мы участники этого процесса следим за тем чтобы наш рабочий свет работал качественно как надёжный помощник.</p>
        <p>Наше светодиодное оборудование производится с высокими техническими характеристиками и материалов.</p>
      </div>
      <div className={styles.guarantees}>
        <h3>НАШИ ГАРАНТИИ</h3>
        <div className={styles.guarantees_item}>
          <span>
            <img src={likeImg} />
            <p>Гарантия на всю продукцию</p>
          </span>
          <span>
            <img src={dollarImg} />
            <p>Гарантия возврата денег</p>
          </span>
          <span>
            <img src={readyImg} />
            <p>Товар сертифицирован</p>
          </span>
          <span>
            <img src={operatorImg} />
            <p>Консультация по вопросам</p>
          </span>
        </div>
      </div>
      <div className={styles.partners}>
      <h3>НАШИ ПАРТНЕРЫ</h3>
        <div className={styles.partners_img}>
          <img src={rosavtodorImg} alt="Росавтодор" />
          <img src={rzdImg} alt="РЖД" />
        </div>
      </div>
    </section>
  );
};

export default Main;
