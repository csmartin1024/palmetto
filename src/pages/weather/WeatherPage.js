import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router';
// import DailyForecastComponent from './components/DailyForecastComponent';
import HourlyForecastComponent from './components/HourlyForecastComponent';
import RightNowComponent from './components/RightNowComponent';
import WeeklyForecastComponent from './components/WeeklyForecastComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentConditions, getForecast } from '../../redux/actions';

export const MyIncrementButton = React.memo(({ onIncrement }) => <button onClick={onIncrement}>Increment counter</button>);

const WeatherPage = props => {
  const urlParams = new URLSearchParams(props.location.search);
  const cityParam = urlParams.get('city');
  const stateParam = urlParams.get('state');
  const [city] = useState(cityParam);
  const [stateCode] = useState(stateParam);
  const [location] = useState({ city, state: stateParam });
  const dispatch = useDispatch();

  const currentConditions = useSelector(state => state.conditions.currentConditions);
  const forecast = useSelector(state => state.forecast.forecast);

  useEffect(() => {
    dispatch(getCurrentConditions(city, stateCode, 'US'));
  }, [city, stateCode, dispatch]);

  useEffect(() => {
    if (currentConditions && currentConditions.coordinates) {
      const latitude = currentConditions.coordinates.latitude;
      const longitude = currentConditions.coordinates.longitude;
      dispatch(getForecast(latitude, longitude));
    }
  }, [currentConditions, dispatch]);

  const renderHeader = () => {
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
  };

  const renderHero = () => {
    return (
      <section className="hero">
        {renderHeader()}
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">
              In {location.city}, {location.state}...
            </h1>
          </div>
        </div>
      </section>
    );
  };

  const renderBodyTiles = () => {
    return (
      <section className="section body">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-4 is-vertical">
              {currentConditions && <RightNowComponent currentConditions={currentConditions} />}
              {/* <DailyForecastComponent dailyForecast={forecast.daily} /> */}
            </div>
            <div className="tile is-vertical is-parent">
              {forecast.hourly && <HourlyForecastComponent hourlyForecast={forecast.hourly} />}
              <WeeklyForecastComponent weeklyForecast={forecast.weekly} />
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderLayout = () => {
    return (
      <Fragment>
        {renderHero()}
        {renderBodyTiles()}
      </Fragment>
    );
  };

  const renderNoWeather = () => {
    return (
      <section className="hero is-dark is-fullheight">
        {renderHeader()}
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">NO WEATHER FOUND</h1>
            <h2 className="subtitle">Sorry about that</h2>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="weather-page">
      {currentConditions && forecast && renderLayout()}
      {(!currentConditions || !forecast) && renderNoWeather()}
    </div>
  );
};

export default withRouter(WeatherPage);
