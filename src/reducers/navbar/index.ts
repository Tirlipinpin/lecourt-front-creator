import { COLLAPSE_NAVBAR } from './constants';

export interface NavbarStore {
    collapsed: boolean
};

export const defaultState: NavbarStore = {
    collapsed: false
};

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case COLLAPSE_NAVBAR:
            return {
                ...state,
                collapsed: action.payload,
            };
        default:
            return state;
    };
};
