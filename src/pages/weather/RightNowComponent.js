import React from 'react';
const WEATHER_ICON_URL = 'https://www.accuweather.com/images/weathericons';

export default props => {
  const { WeatherText, WeatherIcon, Temperature } = props.currentConditions;
  const currentTemperature = Temperature ? Temperature.Imperial.Value : '';
  const iconURL = `${WEATHER_ICON_URL}/${WeatherIcon}.svg`;
  return (
    <div className="tile is-child box right-now">
      <div className="car">
        <div className="card-conten">
          <div className="content">
            <h6 className="subtitle is-6">RIGHT NOW</h6>
            <h6 className="title is-3">
              {currentTemperature} & {WeatherText}
            </h6>
          </div>
        </div>
        <div className="card-imag">
          <figure className="image is-2by1">
            <img src={iconURL}></img>
          </figure>
        </div>
      </div>
    </div>
  );
};
