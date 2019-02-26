import { UPDATE_SEARCH_TERM } from './constantes';

export interface NavbarStore {
    searchTerm: string,
};

export const defaultState = {
    searchTerm: '',
};

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case UPDATE_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
            }
        default:
            return state;
    };
};
