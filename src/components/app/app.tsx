import { FC } from 'react';
import { Switch, Route } from 'react-router';

import styles from './app.module.scss';
import Header from '../app-header/header';
import Main from '../main/main';
import Catalog from '../catalog/catalog';
import Products from '../products/products';
import Product from '../product-page/product';
import Contacts from '../contacts/contacts';
import Footer from '../app-footer/footer';

const App: FC = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/catalog" component={Catalog} />
            <Route exact path="/catalog/:id" component={Products} />
            <Route exact path="/catalog/:id/:id" component={Product} />
            <Route exact path="/contacts" component={Contacts} />
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
