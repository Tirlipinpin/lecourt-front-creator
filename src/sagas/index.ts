import { fork, all } from 'redux-saga/effects';

import login from './login';
import register from './register';
import postMovie from './postMovie';
import uploadedMovies from './uploadedMovies';

export default function* sagas() {
    yield all([
        fork(login),
        fork(register),
        fork(postMovie),
        fork(uploadedMovies),
    ]);
};
