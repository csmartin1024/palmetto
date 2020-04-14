import { FETCH_LOCATION, SUCCESS } from '../actionTypes';

const initialState = {
  location: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case `${SUCCESS(FETCH_LOCATION)}`: {
      const locations = action.payload.data;
      return {
        ...state,
        location: locations[0]
      };
    }
    default:
      return state;
  }
}
