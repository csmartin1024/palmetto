import httpClient from './httpClient';
const { OPENWEATHER_API_KEY: API_KEY, OPENWEATHER_URL: BASE_URL } = process.env;
const web = new httpClient({ baseURL: BASE_URL });

export const getUSCurrentConditions = async ({ city, state, country }) =>
  web.get(`weather?q=${city},${state},${country}&units=imperial&appid=${API_KEY}`);
export const getInternationalCurrentConditions = async ({ city, country }) =>
  web.get(`weather?q=${city},${country}&units=imperial&appid=${API_KEY}`);
export const getForecast = async ({ longitude, latitude }) =>
  web.get(`onecall?lon=${longitude}&lat=${latitude}&units=imperial&appid=${API_KEY}`);

export const conditionMapper = conditions => ({
  coordinates: {
    latitude: conditions.coord.lat,
    longitude: conditions.coord.lon
  },
  description: conditions.weather[0].description,
  temperature: conditions.main.temp,
  iconURL: `https://openweathermap.org/img/wn/${conditions.weather[0].icon}@2x.png`
});

export const forecastMapper = forecast => {
  const hourly = forecast.hourly;
  const daily = forecast.daily;

  const days = daily.map(day => ({
    timestamp: day.dt,
    temperature: {
      high: day.temp.max,
      low: day.temp.min
    },
    weather: {
      description: day.weather[0].description,
      iconURL: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
    }
  }));

  const hours = hourly.map(hour => ({
    timestamp: hour.dt,
    temperature: hour.temp,
    weather: {
      description: hour.weather[0].description,
      iconURL: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`
    }
  }));

  return {
    hourly: {
      hours
    },
    weekly: {
      days
    }
  };
};
