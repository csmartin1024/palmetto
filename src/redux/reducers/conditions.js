import { FETCH_CURRENT_CONDITIONS, SUCCESS } from '../actionTypes';

const initialState = {
  currentConditions: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS(FETCH_CURRENT_CONDITIONS): {
      const currentConditions = action.payload.data.data.currentConditions;
      return {
        ...state,
        currentConditions
      };
    }
    default:
      return state;
  }
}
