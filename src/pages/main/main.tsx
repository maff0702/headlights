import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import styles from './main.module.scss';
import SerchBar from '../../ui/serch-bar/search-bar';
import CatalogCards from '../../components/catalog-cards/catalog-cards';
import garantImg from '../../images/garant.gif';
import moneyImg from '../../images/money.gif';
import sercImg from '../../images/serc.gif';
import feedbackImg from '../../images/feedback.gif';
import rosavtodorImg from '../../images/rosavtodor1.svg';
import rzdImg from '../../images/rzd1.svg';

const Main: FC = () => {
  return (
    <section className={styles.content}>
      <Helmet>
        <title>Торговый Дом - LED фары</title>
        <meta name="description" content="LED фары оптом" />
      </Helmet>
      <SerchBar />
      <div className={styles.content_catalog}>
        <h2 className={styles.content_name}>Каталог товаров</h2>
        <CatalogCards />
      </div>
      <div className={styles.info_company}>
        <h3>О нашей компании</h3>
        <p>Наша компания на протяжении пяти лет занимается обеспечением качественной LED оптикой производителей спецтехники в России и ближнего зарубежья.</p>
        <p>Светодиодные фары заняли своё прочное  место  во всём мире из-за своего низкого энергопотребления увеличивая срок службы узлов и агрегатов спецтехники.</p>
        <p>Среди заказчиков дополнительного рабочего света РЖД, Росавтодор, строительные и коммунальные структуры и организации.</p>
        <p>Сегодня  Россия строит, добывает, производит, выращивает  и мы участники этого процесса следим за тем чтобы наш рабочий свет работал качественно как надёжный помощник.</p>
        <p>Наше светодиодное оборудование производится с высокими техническими характеристиками и материалов.</p>
      </div>
      <div className={styles.guarantees}>
        <h3>НАШИ ГАРАНТИИ</h3>
        <div className={styles.guarantees_item}>
          <span>
            <img src={garantImg} width='100%' alt='garantImg' />
            <p>Гарантия на всю продукцию</p>
          </span>
          <span>
            <img src={moneyImg} width='100%' alt='moneyImg' />
            <p>Гарантия возврата денег</p>
          </span>
          <span>
            <img src={sercImg} width='100%' alt='sercImg' />
            <p>Товар сертифицирован</p>
          </span>
          <span>
            <img src={feedbackImg} width='100%' alt='feedbackImg' />
            <p>Консультация по вопросам</p>
          </span>
        </div>
      </div>
      <div className={styles.partners}>
        <h3>НАШИ ПАРТНЕРЫ</h3>
        <div className={styles.partners_img}>
          <img src={rosavtodorImg} alt="Росавтодор" width='100%' />
          <img src={rzdImg} alt="РЖД" width='100%' />
        </div>
      </div>
    </section>
  );
};

export default Main;
