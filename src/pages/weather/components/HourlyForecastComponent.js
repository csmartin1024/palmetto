import React from 'react';
import HourlyWeatherGraph from './HourlyWeatherGraph';

export default props => {
  return (
    <div className="tile is-child box hourly">
      <h6 className="title is-6">OVER THE NEXT 12 HOURS</h6>
      {props.hourlyForecast && <HourlyWeatherGraph hourlyForecast={props.hourlyForecast} />}
    </div>
  );
};
