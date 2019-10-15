import { FETCH_UPLOADED_MOVIES, FETCH_UPLOADED_MOVIES_FAILED, FETCH_UPLOADED_MOVIES_SUCCEEDED } from './constants';
import { IMovieDetails } from "../../components/App/interfaces";

export interface IMoviesStore {
    movies: IMovieDetails[]
    loading: boolean
}

export const defaultState: IMoviesStore = {
    movies: [],
    loading: false,
};

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case FETCH_UPLOADED_MOVIES:
            return {
                ...state,
                loading: true,
            };
        case FETCH_UPLOADED_MOVIES_SUCCEEDED:
            return {
                ...state,
                movies: action.payload,
                loading: false,
            };
        case FETCH_UPLOADED_MOVIES_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
