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
import { DELETE_ENTITY_SUCCEEDED, CREATE_ENTITY_FAILED, CREATE_ENTITY_SUCCEEDED, SET_EDIT_ENTITY, EDIT_ENTITY_SUCCEEDED } from './constants';
import { Reducer, AnyAction } from 'redux';

export interface IAdminDashboardStore {
    list: (Person | Genre | Country)[]
    loading: boolean
    entityFormVisible: boolean
    entityFormEditing: any
}

export const adminDashboardDefaultState: IAdminDashboardStore = {
    list: [],
    loading: true,
    entityFormVisible: false,
    entityFormEditing: null,
};

const adminDashboardReducer: Reducer<IAdminDashboardStore, AnyAction> = (state = adminDashboardDefaultState, action) => {
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
            };
        case DELETE_ENTITY_SUCCEEDED:
            return {
                ...state,
                list: state.list.filter(entity => entity.id !== action.payload.id),
            };
        case CREATE_ENTITY_FAILED:
            return {
                ...state,
            };
        case CREATE_ENTITY_SUCCEEDED:
            return {
                ...state,
                entityFormVisible: false,
                list: [...state.list, action.payload],
            };
        case SET_EDIT_ENTITY:
            return {
                ...state,
                entityFormVisible: action.payload !== null,
                entityFormEditing: action.payload,
            };
        case EDIT_ENTITY_SUCCEEDED:
            const i = state.list.findIndex(entity => entity.id === action.payload.id);
            if (i >= 0) {
                state.list[i] = action.payload;
            }

            return {
                ...state,
                entityFormVisible: false,
                entityFormEditing: null,
            };
        default:
            return state;
    };
};

export default adminDashboardReducer;
