import React from 'react';
const WEATHER_ICON_URL = 'https://www.accuweather.com/images/weathericons';

export default props => {
  const { WeatherText, WeatherIcon, Temperature } = props.currentConditions;
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
};
