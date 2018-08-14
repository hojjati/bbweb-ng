import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        error: null,
        user: null
      };
    }
    case ActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload.error
      };
    }
    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        user: action.payload.user
      };
    }
    case ActionTypes.LOGOUT_REQUEST: {
      return state;
    }
    case ActionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        error: action.payload.error
      };
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        error: null,
        user: null
      };
    }
    default: {
      return state;
    }
  }
}