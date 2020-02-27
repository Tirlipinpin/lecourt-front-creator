import { AnyAction, combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import adminDashboard from './adminDashboard';
import campaigns from './campaigns';
import homepage from './homepage';
import login from './login';
import register from './register';
import movieDetails from './movieDetails';
import navbar from './navbar';
import uploadedMovies from './uploadedMovies';
import uploadMovie from './uploadMovie';
import { FETCH_USER_INIT_APP, FETCH_USER_INIT_APP_SUCCEEDED } from './constants';

export interface IUserStore {
    avatarUrl: string
    firstName: string
    role: string
    isReady: boolean
}

export const userDefaultState: IUserStore = {
    avatarUrl: '',
    firstName: '',
    role: '',
    isReady: false,
};

const user: Reducer<IUserStore, AnyAction> = (state: IUserStore = userDefaultState, action: AnyAction): IUserStore => {
    switch(action.type) {
        case FETCH_USER_INIT_APP:
            return userDefaultState;
        case FETCH_USER_INIT_APP_SUCCEEDED:
            return {
                ...state,
                role: action.payload.role,
                firstName: action.payload.profile.first_name,
                avatarUrl: action.payload.profile.avatar,
                isReady: true,
            };
        default:
            return state;
    }
};


export default (history: any) => combineReducers({
    router: connectRouter(history),
    adminDashboard,
    campaigns,
    homepage,
    login,
    register,
    movieDetails,
    navbar,
    uploadedMovies,
    uploadMovie,
    user,
});
