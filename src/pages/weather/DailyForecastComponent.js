import React from 'react';

export default props => {
  const { Headline, DailyForecasts } = props.dailyForecast;
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
};
