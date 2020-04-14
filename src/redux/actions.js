import axios from 'axios';
import { FETCH_CURRENT_CONDITIONS, FETCH_FORECAST, FETCH_LOCATION } from './actionTypes';

export const getCurrentConditions = (city, state, country) => {
  return {
    type: FETCH_CURRENT_CONDITIONS,
    payload: axios.get(`/api/currentConditions?&city=${encodeURIComponent(city)}&state=${state}&country=${country}`)
  };
};

export const getForecast = (latitude, longitude) => {
  return {
    type: FETCH_FORECAST,
    payload: axios.get(`/api/forecast?&latitude=${latitude}&longitude=${longitude}`)
  };
};

export const getLocation = (city, state) => {
  return {
    type: FETCH_LOCATION,
    payload: axios.get(`/api/locations?&city=${encodeURIComponent(city)}&state=${state}`)
  };
};
