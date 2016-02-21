import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from 'lib/context';
import App from 'layouts/App';
import HomePage from 'containers/HomePage';
import ContentPage from 'containers/ContentPage';
import ChattingPage from 'containers/ChattingPage';

const routeContainer = (
  <Router
    history={history}
  >
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="chatting" component={ChattingPage} />
      <Route path="page/:pageId" component={ContentPage} />
    </Route>
  </Router>
);

export default routeContainer;
