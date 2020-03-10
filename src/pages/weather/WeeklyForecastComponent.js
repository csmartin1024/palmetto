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
};

export default props => {
  const forecast = props.weeklyForecast;
  const { DailyForecasts } = forecast;
  const forecasts = DailyForecasts ? DailyForecasts.map(renderDay) : [];

  return (
    <div class="tile is-child box weekly">
      <h6 class="title is-6">THIS WEEK</h6>
      {forecasts}
    </div>
  );
};
