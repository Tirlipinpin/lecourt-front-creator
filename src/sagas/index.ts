import { fork, all } from 'redux-saga/effects';

import shared from './shared';
import auth from './auth';
import postMovie from './postMovie';
import uploadedMovies from './uploadedMovies';
import campaigns from './campaigns';

export default function* sagas() {
    yield all([
        fork(auth),
        fork(campaigns),
        fork(postMovie),
        fork(uploadedMovies),
        fork(shared),
    ]);
};
