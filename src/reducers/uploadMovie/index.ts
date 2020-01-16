import {Genre, Person} from '../../components/App/interfaces';
import {
    UPLOAD_MOVIE_SUCCEEDED,
    SHOW_UPLOAD_MOVIE_MODAL,
    HIDE_UPLOAD_MOVIE_MODAL,
    FETCH_MOVIE_CREATION_DATA,
    UPLOAD_MOVIE,
} from './constants';
import {
    FETCH_PERSONS_SUCCEEDED,
    FETCH_GENRES_SUCCEEDED,
} from '../constants';

export interface IUploadMovieStore {
    genres: Genre[]
    loading: boolean
    persons: Person[]
    uploadingMovie: boolean
    visible: boolean
}

export const defaultState: IUploadMovieStore = {
    genres: [],
    loading: false,
    persons: [],
    uploadingMovie: false,
    visible: false,
};

export default (state = defaultState, action: any): IUploadMovieStore => {
    switch(action.type) {
        case FETCH_MOVIE_CREATION_DATA:
            return {
                ...state,
                persons: [],
                genres: [],
                loading: true,
            };
        case FETCH_PERSONS_SUCCEEDED:
            return {
                ...state,
                persons: action.payload,
                loading: state.genres.length ? false : true,
            };
        case FETCH_GENRES_SUCCEEDED:
            return {
                ...state,
                genres: action.payload,
                loading: state.persons.length ? false : true,
            };
        case UPLOAD_MOVIE_SUCCEEDED:
            return {
                ...state,
                visible: false,
            };
        case SHOW_UPLOAD_MOVIE_MODAL:
            return {
                ...defaultState,
                visible: true,
            };
        case HIDE_UPLOAD_MOVIE_MODAL:
            return {
                ...state,
                visible: false,
            };
        case UPLOAD_MOVIE:
            return {
                ...state,
                uploadingMovie: true,
            };
        default:
            return state;
    }
};
