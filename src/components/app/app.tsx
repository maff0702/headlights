import { FC } from 'react';
import { Switch, Route } from 'react-router';

import styles from './app.module.scss';
import Header from '../app-header/header';
import Main from '../main/main';
import Footer from '../app-footer/footer';

const App: FC = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Switch>
            <Route exact path="/"><Main /></Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
