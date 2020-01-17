import { FETCH_MOVIE_DETAILS, UPDATE_MOVIE_DETAILS } from 'reducers/movieDetails/constants';
import { IMovieFormState } from '../../components/MovieForm';

export const fetchMovieDetails = (id: string) => ({ type: FETCH_MOVIE_DETAILS, payload: { id } });

export const updateMovieDetails = (id: string, movie: IMovieFormState) => ({ type: UPDATE_MOVIE_DETAILS, payload: { id, movie } });
