import {
  FETCH_TOKEN,
  FETCH_TOKEN_SUCCEEDED,
  FETCH_TOKEN_FAILED,
  RESTORE_TOKEN,
  LOGOUT,
} from './constants';

export interface ILoginStore {
    loading: boolean
    token?: string | null
}

export const defaultState: ILoginStore = {
    loading: false,
};

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case FETCH_TOKEN:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TOKEN_SUCCEEDED:
            return {
                ...state,
                loading: false,
                token: action.payload,
            };
        case FETCH_TOKEN_FAILED:
            return {
                ...state,
                loading: false,
            };
        case RESTORE_TOKEN:
          return {
              ...state,
              token: action.payload,
          };
        case LOGOUT:
            return {
                ...state,
                token: null,
            };
        default:
            return state;
    }
};
