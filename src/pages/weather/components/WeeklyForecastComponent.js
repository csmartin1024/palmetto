import React from 'react';
import moment from 'moment';
import { v4 } from 'uuid';
const WEATHER_ICON_URL = 'https://www.accuweather.com/images/weathericons';

const renderDay = dailyForecast => {
  const { Date: forecastDate, Day, Temperature } = dailyForecast;
  const iconURL = `${WEATHER_ICON_URL}/${Day.Icon}.svg`;
  const { Minimum, Maximum } = Temperature || {};
  const formattedDate = moment(forecastDate).format('dddd');

  return (
    <article key={v4()} className="medi">
      <div className="columns">
        <div className="column is-half">
          <div className="media-content">
            <p>{formattedDate}</p>
            {Maximum.Value}° F / {Minimum.Value}° F
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
              <p className="">{Day.LongPhrase}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default props => {
  const forecast = props.weeklyForecast;
  const { DailyForecasts } = forecast;
  const forecasts = DailyForecasts ? DailyForecasts.map(renderDay) : [];

  return (
    <div className="tile is-child box weekly">
      <h6 className="title is-6">THIS WEEK</h6>
      {forecasts}
    </div>
  );
};
