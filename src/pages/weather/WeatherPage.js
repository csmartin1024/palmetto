import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';
import HourlyWeatherGraph from './HourlyWeatherGraph';
import RightNowComponent from './RightNowComponent';
import { v4 } from 'uuid';
const WEATHER_ICON_URL = 'https://www.accuweather.com/images/weathericons';

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
      currentConditions: {},
      dailyForecast: {},
      weeklyForecast: {}
    };
    this.renderRightNow = this.renderRightNow.bind(this);
    this.renderHourly = this.renderHourly.bind(this);
    this.renderWeekly = this.renderWeekly.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderHero = this.renderHero.bind(this);
    this.loadLocation = this.loadLocation.bind(this);
    this.loadLocationData = this.loadLocationData.bind(this);
  }
  async componentDidMount() {
    //TODO: Less of a todo and more of a general comment for prying eyes, I definitely think this pattern is probably out of date
    // but I did not hook up redux and have not looked into react hooks enough to know if they can be useful here so going with
    // the it works for now method. Trying not to pre-optimize
    try {
      await this.loadLocation();
      await this.loadLocationData();
    } catch (err) {
      console.log('Something went wrong', err);
    }
  }

  async loadLocation() {
    const locationListAPIResponse = await fetch(
      `/api/locations?&city=${encodeURIComponent(this.state.city)}&state=${this.state.stateCode}`
    );
    const locationList = await locationListAPIResponse.json();
    const location = locationList.data.locations[0];
    this.setState({ location });
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

    this.setState({ currentConditions, dailyForecast, hourlyForecast, weeklyForecast });
  }
  renderRightNow() {
    const { WeatherText, WeatherIcon, Temperature } = this.state.currentConditions;
    const currentTemperature = Temperature ? Temperature.Imperial.Value : '';
    const iconURL = `${WEATHER_ICON_URL}/${WeatherIcon}.svg`;
    return (
      <div class="tile is-child box right-now">
        <div class="car">
          <div class="card-conten">
            <div class="content">
              <h6 class="subtitle is-6">RIGHT NOW</h6>
              <h6 class="title is-3">
                {currentTemperature} & {WeatherText}
              </h6>
            </div>
          </div>
          <div class="card-imag">
            <figure class="image is-2by1">
              <img src={iconURL}></img>
            </figure>
          </div>
        </div>
      </div>
    );
  }
  renderDaily() {
    const { Headline, DailyForecasts } = this.state.dailyForecast;
    const { Day, Night } = DailyForecasts ? DailyForecasts[0] : {};
    const comingSoonHeadline = Headline ? Headline.Text : '';
    const todayPhrase = Day ? Day.LongPhrase : '';
    const nightPhrase = Night ? Night.LongPhrase : '';
    return (
      <div class="tile is-child box daily">
        <h6 class="title is-6">COMING SOON</h6>
        <p>{comingSoonHeadline}</p>
        <h6 class="title is-6">TODAY</h6>
        <p>{todayPhrase}</p>
        <h6 class="title is-6">TONIGHT</h6>
        <p>{nightPhrase}</p>
      </div>
    );
  }
  renderHourly() {
    return (
      <div class="tile is-child box hourly">
        <h6 class="title is-6">OVER THE NEXT 12 HOURS</h6>
        {this.state.hourlyForecast && <HourlyWeatherGraph hourlyForecast={this.state.hourlyForecast} />}
      </div>
    );
  }
  renderDay(dailyForecast) {
    const { Date: forecastDate, Day, Temperature } = dailyForecast;
    const iconURL = `${WEATHER_ICON_URL}/${Day.Icon}.svg`;
    const { Minimum, Maximum } = Temperature || {};
    const formattedDate = moment(forecastDate).format('dddd');

    return (
      <article key={v4()} class="medi">
        <div class="columns">
          <div class="column is-half">
            <div class="media-content">
              <p>{formattedDate}</p>
              {Maximum.Value}° F / {Minimum.Value}° F
            </div>
          </div>
          <div class="column is-half">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src={iconURL}></img>
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="">{Day.LongPhrase}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
  renderWeekly() {
    const forecast = this.state.weeklyForecast;
    const { DailyForecasts } = forecast;
    const forecasts = DailyForecasts ? DailyForecasts.map(this.renderDay) : [];

    return (
      <div class="tile is-child box weekly">
        <h6 class="title is-6">THIS WEEK</h6>
        {forecasts}
      </div>
    );
  }

  renderHeader() {
    return (
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
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
      <section class="hero">
        {this.renderHeader()}
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-1">
              In {this.state.location.city}, {this.state.location.state}...
            </h1>
          </div>
        </div>
      </section>
    );
  }

  renderBodyTiles() {
    const { WeatherText, WeatherIcon, Temperature } = this.state.currentConditions;
    // const iconURL = `${WEATHER_ICON_URL}/${WeatherIcon}.svg`;
    return (
      <section class="section body">
        <div class="container">
          <div class="tile is-ancestor">
            <div class="tile is-parent is-4 is-vertical">
              <RightNowComponent currentConditions={this.state.currentConditions} />
              {this.renderDaily()}
            </div>
            <div class="tile is-vertical is-parent">
              {this.renderHourly()}
              {this.renderWeekly()}
            </div>
          </div>
        </div>
      </section>
    );
  }

  renderLayout() {
    return (
      <div class="weather-page">
        {this.renderHero()}
        {this.renderBodyTiles()}
      </div>
    );
  }

  render() {
    return <Fragment>{this.renderLayout()}</Fragment>;
  }
}

export default withRouter(WeatherPage);
