import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
const middleware = applyMiddleware(promiseMiddleware, thunk, logger);
const debugState = {};
export default createStore(reducers, debugState, middleware);
