import { combineReducers } from 'redux';
import location from './location';
import conditions from './conditions';
import forecast from './forecast';

export default combineReducers({ conditions, forecast, location });
