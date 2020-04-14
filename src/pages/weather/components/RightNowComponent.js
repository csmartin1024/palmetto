import React from 'react';
const WEATHER_ICON_URL = 'https://www.accuweather.com/images/weathericons';

export default props => {
  const { description, iconURL, temperature } = props.currentConditions;

  return (
    <div className="tile is-child box right-now">
      <div class="car">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96">
                <img src={iconURL} alt="this should be the current weather"></img>
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-3">
                {temperature.toFixed(0)} & {description}
              </p>
            </div>
          </div>

          <div class="content">
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a>@bulmaio</a>.<a href="#">#css</a>{' '}
            <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
          </div>
        </div>
      </div>
    </div>
  );
};
