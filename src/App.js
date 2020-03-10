import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import './App.css';
import 'bulma/css/bulma.css';
import LandingPage from './pages/landing/LandingPage';
import WeatherPage from './pages/weather/WeatherPage';
const customHistory = createBrowserHistory();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
  }
}
