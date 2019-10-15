import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import adminDashboard from './adminDashboard';
import campaigns from './campaigns';
import homepage from './homepage';
import login from './login';
import register from './register';
import movieDetails from './movieDetails';
import navbar from './navbar';
import uploadedMovies from './uploadedMovies';
import uploadMovie from './uploadMovie';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'login',
        'navbar',
    ]
};

export default (history: any) => persistReducer(persistConfig, combineReducers({
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
}));
