import {Genre, Person} from '../../components/App/interfaces';
import {
    UPLOAD_MOVIE_SUCCEEDED,
    SHOW_UPLOAD_MOVIE_MODAL,
    HIDE_UPLOAD_MOVIE_MODAL,
} from './constants';
import {
    FETCH_PERSONS_SUCCEEDED,
    FETCH_GENRES_SUCCEEDED
} from '../constants';

export interface IUploadMovieStore {
    persons: Person[]
    genres: Genre[]
    visible: boolean
}

export const defaultState: IUploadMovieStore = {
    genres: [],
    persons: [],
    visible: false,
};

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case FETCH_PERSONS_SUCCEEDED:
            return {
                ...state,
                persons: action.payload,
            };
        case FETCH_GENRES_SUCCEEDED:
            return {
                ...state,
                genres: action.payload,
            };
        case UPLOAD_MOVIE_SUCCEEDED:
            return {
                ...state,
                visible: false,
            };
        case SHOW_UPLOAD_MOVIE_MODAL:
            return {
                ...state,
                visible: true,
            };
        case HIDE_UPLOAD_MOVIE_MODAL:
            return {
                ...state,
                visible: false,
            };
        default:
            return state;
    }
};
