import httpClient from './httpClient';
const { ACCUWEATHER_API_KEY: API_KEY, ACCUWEATHER_URL: BASE_URL } = process.env;
const web = new httpClient({ baseURL: BASE_URL });

export const queryCitiesByNameAndStateAndCountry = async ({ city, state, country }) =>
  web.get(`/locations/v1/cities/${country}/${state}/search?apikey=${API_KEY}&q=${city}`);
//TODO: Modify the others so they can take state/counries
export const queryCitiesByPostalCode = async q => web.get(`locations/v1/cities/postalcodes/search?apikey=${API_KEY}&q=${q}`);
export const queryCitiesAutocomplete = async q => web.get(`locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${q}`);
export const getCurrentConditions = async locationId => web.get(`/currentconditions/v1/${locationId}?apikey=${API_KEY}`);
export const getDailyForecast = async locationId => web.get(`forecasts/v1/daily/1day/${locationId}?apikey=${API_KEY}&details=true`);
export const getHourlyForecast = async locationId => web.get(`forecasts/v1/hourly/12hour/${locationId}?apikey=${API_KEY}&details=true`);
export const getWeeklyForecast = async locationId => web.get(`forecasts/v1/daily/5day/${locationId}?apikey=${API_KEY}&details=true`);

export const locationMapper = location => ({
  id: location.Key,
  city: location.LocalizedName,
  state: location.AdministrativeArea.LocalizedName,
  country: location.Country.LocalizedName
});
