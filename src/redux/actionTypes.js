import { ActionType } from 'redux-promise-middleware';
const { Pending, Fulfilled, Rejected } = ActionType;

export const FETCH_CURRENT_CONDITIONS = 'FETCH_CURRENT_CONDITIONS';
export const FETCH_FORECAST = 'FETCH_FORECAST';
export const FETCH_LOCATION = 'FETCH_LOCATION';
export const SUCCESS = ACTION => `${ACTION}_${Fulfilled}`;
