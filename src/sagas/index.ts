import login from './login';
import register from './register';
import { fork, all } from 'redux-saga/effects';

export default function* sagas() {
    yield all([
        fork(login),
        fork(register)
    ]);
};
