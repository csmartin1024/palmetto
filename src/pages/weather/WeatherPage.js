import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import DailyForecastComponent from './components/DailyForecastComponent';
import HourlyForecastComponent from './components/HourlyForecastComponent';
import RightNowComponent from './components/RightNowComponent';
import WeeklyForecastComponent from './components/WeeklyForecastComponent';

const WeatherPage = props => {
  const urlParams = new URLSearchParams(props.location.search);
  const cityParam = urlParams.get('city');
  const stateParam = urlParams.get('state');
  const [city] = useState(cityParam);
  const [stateCode] = useState(stateParam);
  const [location, setLocation] = useState({ city, state: stateParam });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const [conditions, setConditions] = useState(null);

  useEffect(() => {
    // Simple fetch call that will get the location used for future conditions/forecast
    const loadLocation = async () => {
      console.log('here222', city, stateCode);
      const locationListAPIResponse = await fetch(`/api/locations?&city=${encodeURIComponent(city)}&state=${stateCode}`);
      const locationList = await locationListAPIResponse.json();

      if (locationList.data.locations.length > 0) {
        const location = locationList.data.locations[0];
        setLocationFound(true);
        setLocation(location);
      } else {
        setLocationFound(false);
      }
    };

    // I know, I know, this is hideous, and in a production system this is moved into a separate file (AT LEAST)
    // and probably this is directly making a fetch call in the page class which is not very sexy
    // And the .json() calls are just not cool, maybe I should use axios? or something different
    // And the unwrapping of API "data" would happen somewhere else too
    const loadLocationData = async () => {
      const currentConditionsResponse = await fetch(`/api/currentConditions?location=${location.id}`);
      const dailyForecastResponse = await fetch(`/api/forecast?location=${location.id}&type=DAILY`);
      const hourlyForecastResponse = await fetch(`/api/forecast?location=${location.id}&type=HOURLY`);
      const weeklyForecastResponse = await fetch(`/api/forecast?location=${location.id}&type=WEEKLY`);

      const currentConditionsData = await currentConditionsResponse.json();
      const dailyForecastData = await dailyForecastResponse.json();
      const hourlyForecastData = await hourlyForecastResponse.json();
      const weeklyForecastData = await weeklyForecastResponse.json();

      const currentConditions = currentConditionsData.data.currentConditions[0];
      const dailyForecast = dailyForecastData.data.forecast;
      const hourlyForecast = hourlyForecastData.data.forecast;
      const weeklyForecast = weeklyForecastData.data.forecast;

      setConditions({ currentConditions, dailyForecast, hourlyForecast, weeklyForecast });
      setDataLoaded(true);
    };

    async function fetchData() {
      console.log('fetching data!');
      try {
        if (!locationFound) {
          await loadLocation();
        }
        // Just adding some basic dont make these calls if we didn't find the location
        if (locationFound && conditions === null) await loadLocationData();
      } catch (err) {
        console.log('Something went wrong', err);
      }
    }
    fetchData();
  }, [location.id]);

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
              <RightNowComponent currentConditions={conditions.currentConditions} />
              <DailyForecastComponent dailyForecast={conditions.dailyForecast} />
            </div>
            <div className="tile is-vertical is-parent">
              <HourlyForecastComponent hourlyForecast={conditions.hourlyForecast} />
              <WeeklyForecastComponent weeklyForecast={conditions.weeklyForecast} />
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
      {locationFound && dataLoaded && renderLayout()}
      {!locationFound && renderNoWeather()}
    </div>
  );
};

export default withRouter(WeatherPage);
