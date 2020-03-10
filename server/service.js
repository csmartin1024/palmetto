// This file is a "service" layer, so basically the controllers call a "service"
// that will read from db, storage, api calls and then returns results
// Its an attempt to abstract the underlying apis away from the controller code

import * as accuweather from './accuweather';
import * as loggerModule from './logger';
const logger = loggerModule.default;

// TODO: Eventually standardize this
const formatServiceResponse = ({ data, error, tracer }) => ({ data, error, tracer });

// TODO: add a cache? locations dont change that much?
// TODO: Daily forecast expires after an hour?
// TODO: Weekly after a day?
// TOOD: refactor these: DRY!

export const getLocationsByCityAndState = async ({ city, state, tracer }) => {
  const response = {};
  try {
    const locations = await accuweather.queryCitiesByNameAndStateAndCountry({ city, state, country: 'US' });
    response.data = { locations: locations.map(accuweather.locationMapper) };
    // const locations = [{ id: '350473', city: 'Portland', state: 'Oregon', country: 'United States' }];
    // response.data = { locations };
    logger.info(`Retrieved locations from accuweather by city (${city}) and state (${state})`, tracer);
  } catch (error) {
    logger.error(`There was an error querying locations from accuweather city (${city}) and state (${state})`, error, tracer);
    response.error = 'An error occurred querying locations from the server';
  }
  return formatServiceResponse({ ...response, tracer });
};

// export const getLocationsByPostalCode = async ({ postalCode, tracer }) => {
//   const response = {};
//   try {
//     const locations = await accuweather.queryCitiesByPostalCode(postalCode);
//     response.data = { locations: locations.map(accuweather.locationMapper) };
//     logger.info(`Retrieved locations from accuweather by postal code (postalCode: ${postalCode})`, tracer);
//   } catch (error) {
//     logger.error(`There was an error querying locations by postal code from accuweather (postalCode: ${postalCode})`, error, tracer);
//     response.error = 'An error occurred querying locations from the server';
//   }
//   return formatServiceResponse({ ...response, tracer });
// };

export const getCurrentConditions = async ({ locationId, tracer }) => {
  const response = {};
  try {
    const currentConditions = await accuweather.getCurrentConditions(locationId);
    response.data = { currentConditions };
    logger.info(`Retrieved current conditions from accuweather (locationId: ${locationId})`, tracer);
  } catch (error) {
    logger.error(`There was an error getting current conditions from accuweather (locationId: ${locationId})`, error, tracer);
    response.error = 'An error occurred querying locations from the server';
  }
  return formatServiceResponse({ ...response, tracer });
};

export const getHourlyForecast = async ({ locationId, tracer }) => {
  const response = {};
  try {
    const forecast = await accuweather.getHourlyForecast(locationId);
    response.data = { forecast };
    logger.info(`Retrieved hourly forecast from accuweather (locationId: ${locationId})`, tracer);
  } catch (error) {
    logger.error(`There was an error getting hourly forecast from accuweather (locationId: ${locationId})`, error, tracer);
    response.error = 'An error occurred getting hourly forecast from the server';
  }
  return formatServiceResponse({ ...response, tracer });
};

export const getDailyForecast = async ({ locationId, tracer }) => {
  const response = {};
  try {
    const forecast = await accuweather.getDailyForecast(locationId);
    response.data = { forecast };
    logger.info(`Retrieved daily forecast from accuweather (locationId: ${locationId})`, tracer);
  } catch (error) {
    logger.error(`There was an error getting daily forecast from accuweather (locationId: ${locationId})`, error, tracer);
    response.error = 'An error occurred getting daily forecast from the server';
  }
  return formatServiceResponse({ ...response, tracer });
};

export const getWeeklyForecast = async ({ locationId, tracer }) => {
  const response = {};
  try {
    const forecast = await accuweather.getWeeklyForecast(locationId);
    response.data = { forecast };
    logger.info(`Retrieved weekly forecast from accuweather (locationId: ${locationId})`, tracer);
  } catch (error) {
    logger.error(`There was an error getting weekly forecast from accuweather (locationId: ${locationId})`, error, tracer);
    response.error = 'An error occurred getting weekly forecast from the server';
  }
  return formatServiceResponse({ ...response, tracer });
};

// TODO: Fallback/ Other APIS?
// https://darksky.net/dev/docs
// https://openweathermap.org/current
// https://www.weather.gov/documentation/services-web-api
