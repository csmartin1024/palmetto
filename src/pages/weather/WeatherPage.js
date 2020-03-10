import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import DailyForecastComponent from './DailyForecastComponent';
import HourlyForecastComponent from './HourlyForecastComponent';
import RightNowComponent from './RightNowComponent';
import WeeklyForecastComponent from './WeeklyForecastComponent';

class WeatherPage extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(props.location.search);
    const city = urlParams.get('city');
    const state = urlParams.get('state');
    this.state = {
      city,
      stateCode: state,
      location: { city, state },
      dataLoaded: false
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.renderHero = this.renderHero.bind(this);
    this.loadLocation = this.loadLocation.bind(this);
    this.loadLocationData = this.loadLocationData.bind(this);
    this.renderLayot = this.renderLayot.bind(this);
  }
  async componentDidMount() {
    //TODO: Less of a todo and more of a general comment for prying eyes, I definitely think this pattern is probably out of date
    // but I did not hook up redux and have not looked into react hooks enough to know if they can be useful here so going with
    // the it works for now method. Trying not to pre-optimize
    try {
      await this.loadLocation();
      // Just adding some basic dont make these calls if we didn't find the location
      if (this.state.locationFound) await this.loadLocationData();
    } catch (err) {
      console.log('Something went wrong', err);
    }
  }

  // Simple fetch call that will get the location used for future conditions/forecast
  async loadLocation() {
    const locationListAPIResponse = await fetch(
      `/api/locations?&city=${encodeURIComponent(this.state.city)}&state=${this.state.stateCode}`
    );
    const locationList = await locationListAPIResponse.json();

    if (locationList.data.locations.length > 0) {
      const location = locationList.data.locations[0];
      this.setState({ location, locationFound: true });
    } else {
      this.setState({ locationFound: false });
    }
  }

  // I know, I know, this is hideous, and in a production system this is moved into a separate file (AT LEAST)
  // and probably this is directly making a fetch call in the page class which is not very sexy
  // And the .json() calls are just not cool, maybe I should use axios? or something different
  // And the unwrapping of API "data" would happen somewhere else too
  async loadLocationData() {
    const currentConditionsResponse = await fetch(`/api/currentConditions?location=${this.state.location.id}`);
    const dailyForecastResponse = await fetch(`/api/forecast?location=${this.state.location.id}&type=DAILY`);
    const hourlyForecastResponse = await fetch(`/api/forecast?location=${this.state.location.id}&type=HOURLY`);
    const weeklyForecastResponse = await fetch(`/api/forecast?location=${this.state.location.id}&type=WEEKLY`);

    const currentConditionsData = await currentConditionsResponse.json();
    const dailyForecastData = await dailyForecastResponse.json();
    const hourlyForecastData = await hourlyForecastResponse.json();
    const weeklyForecastData = await weeklyForecastResponse.json();

    const currentConditions = currentConditionsData.data.currentConditions[0];
    const dailyForecast = dailyForecastData.data.forecast;
    const hourlyForecast = hourlyForecastData.data.forecast;
    const weeklyForecast = weeklyForecastData.data.forecast;

    this.setState({ dataLoaded: true, currentConditions, dailyForecast, hourlyForecast, weeklyForecast });
  }

  renderHeader() {
    return (
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                Go Back
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  renderHero() {
    return (
      <section className="hero">
        {this.renderHeader()}
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">
              In {this.state.location.city}, {this.state.location.state}...
            </h1>
          </div>
        </div>
      </section>
    );
  }

  renderBodyTiles() {
    return (
      <section className="section body">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-4 is-vertical">
              <RightNowComponent currentConditions={this.state.currentConditions} />
              <DailyForecastComponent dailyForecast={this.state.dailyForecast} />
            </div>
            <div className="tile is-vertical is-parent">
              <HourlyForecastComponent hourlyForecast={this.state.hourlyForecast} />
              <WeeklyForecastComponent weeklyForecast={this.state.weeklyForecast} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  renderLayot() {
    return (
      <Fragment>
        {this.renderHero()}
        {this.renderBodyTiles()}
      </Fragment>
    );
  }

  renderNoWeather() {
    return (
      <section className="hero is-dark is-fullheight">
        {this.renderHeader()}
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">NO WEATHER FOUND</h1>
            <h2 className="subtitle">Sorry about that</h2>
          </div>
        </div>
      </section>
    );
  }

  render() {
    return (
      <div className="weather-page">
        {this.state.locationFound && this.state.dataLoaded && this.renderLayot()}
        {!this.state.locationFound && this.renderNoWeather()}
      </div>
    );
  }
}

export default withRouter(WeatherPage);
