import { FETCH_MOVIE_DETAILS } from './constantes';
import { IMovieDetails } from '../../components/App/interfaces';

export interface IMovieDetailsStore {
  movieDetails: IMovieDetails | []
}

export const defaultState: IMovieDetailsStore = {
  movieDetails: [],
};

export default (state = defaultState, action: any) => {
  switch(action.type) {
    case FETCH_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload,
      };
    default:
      return state;
  }
}