import { History } from 'history';
import { AnyAction } from 'redux';
import { PersistState } from 'redux-persist';

import rootReducer from './rootReducer';
import { IAdminDashboardStore } from './adminDashboard';
import { ICampaignsStore } from './campaigns';
import { IMovieDetailsStore } from './movieDetails';
import { IMoviesStore } from './uploadedMovies';
import { IUploadMovieStore } from './uploadMovie';
import { RouterState } from 'connected-react-router';
import { NavbarStore } from './navbar';
import { IHomepageStore } from './homepage';
import { LoginStore } from './login';
import { RegisterStore } from './register';

describe('rootReducer', () => {
    test('should return every reducers and rooter', () => {
        const history: History = {} as History;

        const reducers = rootReducer(history)({
            router: {} as RouterState,
            adminDashboard: {} as IAdminDashboardStore,
            campaigns: {} as ICampaignsStore,
            homepage: {} as IHomepageStore,
            login: {} as LoginStore,
            register: {} as RegisterStore,
            movieDetails: {} as IMovieDetailsStore,
            navbar: {} as NavbarStore,
            uploadedMovies: {} as IMoviesStore,
            uploadMovie: {} as IUploadMovieStore,
            _persist: {} as PersistState,
        }, {} as AnyAction);

        expect(reducers).toEqual({
            _persist: {},
            adminDashboard: {},
            campaigns: {},
            homepage: {},
            login: {},
            register: {},
            router: {},
            movieDetails: {},
            navbar: {},
            uploadedMovies: {},
            uploadMovie: {},
        });
    })
});
