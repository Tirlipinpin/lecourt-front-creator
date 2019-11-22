import { fork, all } from 'redux-saga/effects';

import auth from './auth';
import adminDashboard from './adminDashboard';
import campaigns from './campaigns';
import postMovie from './postMovie';
import uploadedMovies from './uploadedMovies';
import shared from './shared';

export default function* sagas() {
    yield all([
        fork(adminDashboard),
        fork(auth),
        fork(campaigns),
        fork(postMovie),
        fork(uploadedMovies),
        fork(shared),
    ]);
};
