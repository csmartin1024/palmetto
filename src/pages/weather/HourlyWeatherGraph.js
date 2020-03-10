import React, { Component, Fragment } from 'react';
import CanvasJSReact from '../../lib/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class HourlyWeatherGraph extends Component {
  constructor(props) {
    super(props);
    const hourlyForecast = props.hourlyForecast || [];
    this.state = { hourlyForecast };
  }
  render() {
    const dataPoints = this.state.hourlyForecast.map((forecastItem, index) => {
      return {
        x: forecastItem.EpochDateTime * 1000,
        y: forecastItem.Temperature.Value
      };
    });
    const options = {
      animationEnabled: true,
      axisY: {
        viewportMinimum: 0,
        viewportMaximum: 100,
        gridThickness: 0
      },
      height: 150,
      data: [
        {
          color: 'rgba(206, 108, 100, 0.31)',
          type: 'area',
          xValueFormatString: '',
          xValueType: 'dateTime',
          yValueFormatString: '#° F',
          dataPoints
        }
      ]
    };
    return (
      <Fragment>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
      </Fragment>
    );
  }
}
