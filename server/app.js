import express from 'express';
import bodyParser from 'body-parser';
import logger, { loggerMiddleware } from './logger';
import * as service from './service';
import { middleware as tracingMiddlware } from './tracing';
import { FORECAST_TYPE_DAILY, FORECAST_TYPE_HOURLY, FORECAST_TYPE_WEEKLY } from './constants';
const APP_PORT = process.env.APP_PORT | 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use(tracingMiddlware);

// TODO: Add some standard data/error handling logic

const queryLocationHandler = async (req, res) => {
  const city = req.query.city;
  const state = req.query.state;
  // TODO: Allow zip codes to be queried
  // TODO: Allow other countries
  const locations = await service.getLocationsByCityAndState({ city, state, tracer: req.tracer });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(locations));
};

const currentConditionsHandler = async (req, res) => {
  const location = req.query.location;
  res.setHeader('Content-Type', 'application/json');
  const currentConditions = await service.getCurrentConditions({ locationId: location, tracer: req.tracer });
  res.send(JSON.stringify(currentConditions));
};

// TODO: Add some validation for forecast type
const forecastHandler = async (req, res) => {
  const location = req.query.location;
  const forecastType = req.query.type;
  let forecast;
  if (forecastType === FORECAST_TYPE_DAILY) {
    forecast = await service.getDailyForecast({ locationId: location, tracer: req.tracer });
  } else if (forecastType === FORECAST_TYPE_HOURLY) {
    forecast = await service.getHourlyForecast({ locationId: location, tracer: req.tracer });
  } else if (forecastType === FORECAST_TYPE_WEEKLY) {
    forecast = await service.getWeeklyForecast({ locationId: location, tracer: req.tracer });
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(forecast));
};

app.get('/api/locations', queryLocationHandler);
app.get('/api/currentConditions', currentConditionsHandler);
app.get('/api/forecast', forecastHandler);

app.listen(APP_PORT, () => logger.info(`Express server is running on localhost:${APP_PORT}`));
