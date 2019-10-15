import {FETCH_MOVIE_DETAILS, FETCH_MOVIE_DETAILS_FAILED, FETCH_MOVIE_DETAILS_SUCCEEDED} from './constants';
import { IMovieDetails } from '../../components/App/interfaces';

export interface IMovieDetailsStore {
  movieDetails: IMovieDetails | []
  loading: boolean
}

export const defaultState: IMovieDetailsStore = {
  movieDetails: [],
  loading: false,
};

export default (state = defaultState, action: any) => {
  switch(action.type) {
    case FETCH_MOVIE_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MOVIE_DETAILS_SUCCEEDED:
      return {
        ...state,
        movieDetails: action.payload,
        loading: false,
      };
    case FETCH_MOVIE_DETAILS_FAILED:
      return {
        ...state,
        movieDetails: [],
        loading: false,
      };
    default:
      return state;
  }
}