import { Person } from '../../components/App/interfaces';
import {
    FETCH_PERSONS,
    FETCH_PERSONS_FAILED,
    FETCH_PERSONS_SUCCEEDED,
    UPLOAD_MOVIE_SUCCEEDED,
    SHOW_UPLOAD_MOVIE_MODAL,
    HIDE_UPLOAD_MOVIE_MODAL,
} from './constantes';

export interface IUploadMovieStore {
    persons: Person[]
    loading: boolean
    visible: boolean
}

export const defaultState: IUploadMovieStore = {
    persons: [],
    loading: false,
    visible: false,
};

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case FETCH_PERSONS:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PERSONS_FAILED:
            return {
                ...state,
                loading: false,
            };
        case FETCH_PERSONS_SUCCEEDED:
            const { data } = action.payload;

            return {
                ...state,
                loading: false,
                persons: data,
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
