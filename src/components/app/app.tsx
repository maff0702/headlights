import { FC, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { useSelector, useDispatch } from '../../hooks/hooks';

import styles from './app.module.scss';
import Header from '../app-header/header';
import Main from '../../pages/main/main';
import Catalog from '../../pages/catalog/catalog';
import Products from '../../pages/products/products';
import Product from '../../pages/product-page/product';
import SearchPage from '../../pages/search-page/search-page';
import Contacts from '../../pages/contacts/contacts';
import Auth from '../../pages/auth/auth';
import Admin from '../../pages/admin/admin';
import Footer from '../app-footer/footer';
import NotFound from '../../pages/not-found/not-found';

import { getCategories } from '../../store/productsSlice';
import { requestCheckAuth } from '../../store/authSlice';

const App: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) dispatch(requestCheckAuth());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/catalog" component={Catalog} />
            <Route exact path="/catalog/:name" component={Products} />
            <Route exact path="/catalog/:name/:name" component={Product} />
            <Route exact path="/search/:name" component={SearchPage} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/login" component={Auth} />
            <Route exact path="/registration" component={Auth} />
            {user?.role === 'ADMIN' && <Route exact path="/admin" component={Admin} />}
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
