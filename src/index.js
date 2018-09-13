import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

import Stores from './stores';
// import UserStore from './stores/user';
// import LanguageStore from './stores/language';

import App from './containers/App';
import EleVirtuesBox from './containers/EleVirtuesBox';
import Test from './containers/Test';
import "./stylesheets/common.css";

// render(<App />, document.getElementById('root'));
registerServiceWorker();

//TODO 获取用户信息
// const userStore = UserStore.create({
//   id: '1',
//   name: 'guest',
//   lastName: 'Casillas',
//   age: 27,
//   xp: 0
// });
// const languageStore = LanguageStore.create({ language: 'en' });

// const store = {
//   user: userStore,
//   language: languageStore
// };

const router = (
  <Provider { ...Stores }>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/elevirtuesbox/:id" component={EleVirtuesBox} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
