import { FETCH_FORECAST, SUCCESS } from '../actionTypes';

const initialState = {
  forecast: {
    hourly: null,
    weekly: null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case `${SUCCESS(FETCH_FORECAST)}`: {
      const forecast = action.payload.data.data.forecast;
      const hourly = forecast.hourly;
      const weekly = forecast.weekly;
      return {
        ...state,
        forecast: {
          hourly,
          weekly
        }
      };
    }
    default:
      return state;
  }
}
