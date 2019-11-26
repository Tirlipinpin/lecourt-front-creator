import { combineReducers } from 'redux';
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
});
