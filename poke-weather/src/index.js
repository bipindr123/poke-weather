import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Mbti from './mbti';
import Nsfw from './nsfw';

function main()
{
  ReactDOM.render(
    <Router>
    <Switch>
    <Route path="/mbti">
      <Mbti />
    </Route>
    <Route path="/nsfw">
      <Nsfw />
    </Route>
    <Route path="/">
    <App />
    </Route>
  </Switch>
  </Router>,
  document.getElementById('root')
  );
}
main()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
