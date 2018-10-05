import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './store'
import Articles from './components/Articles/Articles'
import './index.css';

const App = () => (
  <Provider store={store}>
    <Articles />
  </Provider>
)


ReactDOM.render(<App />, document.getElementById('root'));
