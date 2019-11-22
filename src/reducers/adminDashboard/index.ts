import { Person, Genre, Country } from '../../components/App/interfaces';
import {
    FETCH_PERSONS,
    FETCH_PERSONS_SUCCEEDED,
    FETCH_PERSONS_FAILED,
    FETCH_GENRES,
    FETCH_GENRES_SUCCEEDED,
    FETCH_GENRES_FAILED,
    FETCH_COUNTRIES,
    FETCH_COUNTRIES_SUCCEEDED,
    FETCH_COUNTRIES_FAILED,
} from '../constants';
import { DELETE_ENTITY_SUCCEEDED } from './constants';

export interface IAdminDashboardStore {
    list: (Person | Genre | Country)[]
}

const defaultState: IAdminDashboardStore = {
    list: [],
};

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case FETCH_PERSONS:
        case FETCH_GENRES:
        case FETCH_COUNTRIES:
            return {
                ...state,
                list: [],
                loading: true,
            };
        case FETCH_PERSONS_SUCCEEDED:
        case FETCH_GENRES_SUCCEEDED:
        case FETCH_COUNTRIES_SUCCEEDED:
            return {
                ...state,
                list: action.payload,
                loading: false,
            };
        case FETCH_PERSONS_FAILED:
        case FETCH_GENRES_FAILED:
        case FETCH_COUNTRIES_FAILED:
            return {
                ...state,
                loading: false,
            }
        case DELETE_ENTITY_SUCCEEDED:
            
            return {
                ...state,
                list: state.list.filter(entity => entity.id !== action.payload.id),
            };
        default:
            return state;
    };
};