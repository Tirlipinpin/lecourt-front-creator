import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED, LOGOUT } from './constantes';

export interface LoginStore {
    loading: boolean
    token?: string | null
};

export const defaultState: LoginStore = {
    loading: false,
};

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case FETCH_TOKEN:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TOKEN_SUCCEEDED:
            return {
                ...state,
                loading: false,
                token: action.payload.data,
            }
        case FETCH_TOKEN_FAILED:
            return {
                ...state,
                loading: false,
            }
        case LOGOUT:
            return {
                ...state,
                token: null,
            }
        default:
            return state;
    };
}
