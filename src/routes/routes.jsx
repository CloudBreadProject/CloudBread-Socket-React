import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'layouts/App';
import HomePage from 'containers/HomePage';
import ContentPage from 'containers/ContentPage';
import ChattingPage from 'containers/ChattingPage';

const routeContainer = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="chatting" component={ChattingPage} />
    <Route path="page/:pageId" component={ContentPage} />
  </Route>
);

export default routeContainer;
