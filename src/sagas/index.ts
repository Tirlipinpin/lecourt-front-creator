import { fork, all } from 'redux-saga/effects';

import login from './login';
import register from './register';
import postMovie from './postMovie';
import uploadedMovies from './uploadedMovies';
import campaigns from './campaigns';

export default function* sagas() {
    yield all([
        fork(login),
        fork(register),
        fork(postMovie),
        fork(uploadedMovies),
        fork(campaigns),
    ]);
};
