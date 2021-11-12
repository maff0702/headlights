import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

const Contacts: FC = () => {
  return (
    <div>
      <Helmet>
        <title>Контакты</title>
        <meta name="description" content="Контакты - торговый дом LED фары" />
      </Helmet>
      Информация
    </div>
  );
};

export default Contacts;
