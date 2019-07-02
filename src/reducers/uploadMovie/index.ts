import { Person } from '../../components/App/interfaces';
import { FETCH_PERSONS, FETCH_PERSONS_FAILED, FETCH_PERSONS_SUCCEEDED } from './constantes';

export interface IUploadMovieStore {
    persons: Person[]
    loading: boolean
}

export const defaultState: IUploadMovieStore = {
    persons: [],
    loading: false,
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
        default:
            return state;
    }
};
