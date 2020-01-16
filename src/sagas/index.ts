import { fork, all } from 'redux-saga/effects';

import adminDashboard from './adminDashboard';
import auth from './auth';
import campaigns from './campaigns';
import movieDetails from './movieDetails';
import postMovie from './postMovie';
import uploadedMovies from './uploadedMovies';
import shared from './shared';

export default function* sagas() {
    yield all([
        fork(adminDashboard),
        fork(auth),
        fork(campaigns),
        fork(movieDetails),
        fork(postMovie),
        fork(uploadedMovies),
        fork(shared),
    ]);
};
