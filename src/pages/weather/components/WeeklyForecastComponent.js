import React from 'react';
import moment from 'moment';
import { v4 } from 'uuid';

const renderDay = dailyForecast => {
  const { timestamp, weather, temperature } = dailyForecast;
  const iconURL = `${weather.iconURL}`;
  const { low, high } = temperature;
  const formattedDate = moment.unix(timestamp).format('dddd');

  return (
    <article key={v4()} className="medi">
      <div className="columns">
        <div className="column is-half">
          <div className="media-content">
            <p>{formattedDate}</p>
            {high.toFixed(0)}° F / {low.toFixed(0)}° F
          </div>
        </div>
        <div className="column is-half">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={iconURL} alt="this should be the current weather"></img>
            </p>
          </figure>
          <div className="media-content">
            <div className="field">
              <p className="">{weather.description}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default props => {
  const forecast = props.weeklyForecast;
  const forecasts = forecast && forecast.days ? forecast.days.map(renderDay) : [];

  return (
    <div className="tile is-child box weekly">
      <h6 className="title is-6">THIS WEEK</h6>
      {forecasts}
    </div>
  );
};
