import express from 'express';
import bodyParser from 'body-parser';
import logger, { loggerMiddleware } from './logger';
import * as service from './service';
import { middleware as tracingMiddlware } from './tracing';
const APP_PORT = process.env.APP_PORT | 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use(tracingMiddlware);

// TODO: Add some standard data/error handling logic

const conditionsHandler = async (req, res) => {
  const city = req.query.city;
  const state = req.query.state;
  const conditions = await service.getCurrentConditions({ city, state, tracer: req.tracer });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(conditions));
};

// TODO: Add some validation for forecast type
const forecastHandler = async (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;

  const forecast = await service.getForecast({ latitude, longitude, tracer: req.tracer });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(forecast));
};

app.get('/api/currentConditions', conditionsHandler);
app.get('/api/forecast', forecastHandler);

app.listen(APP_PORT, () => logger.info(`Express server is running on localhost:${APP_PORT}`));
