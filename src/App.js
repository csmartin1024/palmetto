import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import './App.css';
import 'bulma/css/bulma.css';
import LandingPage from './pages/landing/LandingPage';
import WeatherPage from './pages/weather/WeatherPage';
const customHistory = createBrowserHistory();

export default props => {
  return (
    <div className="App">
      <Router history={customHistory}>
        <Switch>
          <Route path="/weather">
            <WeatherPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
