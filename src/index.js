import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

import UserStore from './stores/user';
import LanguageStore from './stores/language';

import App from './containers/App';
import EleVirtuesBoxWrapper from './containers/EleVirtuesBox';
import "./stylesheets/common.css";

// render(<App />, document.getElementById('root'));
registerServiceWorker();

//TODO 获取用户信息
const userStore = UserStore.create({
  id: '1',
  name: 'guest',
  lastName: 'Casillas',
  age: 27,
  xp: 0
});
const languageStore = LanguageStore.create({ language: 'en' });

const store = {
  user: userStore,
  language: languageStore
};

const router = (
  <Provider {...store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/elevirtuesbox/:id" component={EleVirtuesBoxWrapper} />
      </Switch>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
