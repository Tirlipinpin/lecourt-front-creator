import {
    FETCH_MOVIE_DETAILS,
    FETCH_MOVIE_DETAILS_SUCCEEDED,
    FETCH_MOVIE_DETAILS_FAILED,
    UPDATE_MOVIE_DETAILS,
    UPDATE_MOVIE_DETAILS_SUCCEEDED,
    UPDATE_MOVIE_DETAILS_FAILED,
} from './constants';
import { IMovieDetails } from '../../components/App/interfaces';

export interface IMovieDetailsStore {
  movie?: IMovieDetails
  loading: boolean
  updatingMovie: boolean
}

export const defaultState: IMovieDetailsStore = {
    loading: false,
    updatingMovie: false,
};

export default (state = defaultState, action: any) => {
  switch(action.type) {
    case FETCH_MOVIE_DETAILS:
        return {
            ...defaultState,
            loading: true,
        };
    case FETCH_MOVIE_DETAILS_SUCCEEDED:
        return {
            ...state,
            movie: action.payload,
            loading: false,
        };
    case FETCH_MOVIE_DETAILS_FAILED:
        return {
            ...state,
            movie: undefined,
            loading: false,
        };
    case UPDATE_MOVIE_DETAILS:
        return {
            ...state,
            updatingMovie: true,
        };
    case UPDATE_MOVIE_DETAILS_SUCCEEDED:
    case UPDATE_MOVIE_DETAILS_FAILED:
        return {
            ...state,
            updatingMovie: false,
        };
    default:
      return state;
  }
};
