import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import homepage from './homepage';
import login from './login';
import register from './register';
import navbar from './navbar';
import movieDetails from './movieDetails';

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
    homepage,
    login,
    register,
    navbar,
    movieDetails,
}));
