import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import {
    FETCH_GENRES,
    FETCH_GENRES_SUCCEEDED,
    FETCH_GENRES_FAILED,
    FETCH_PERSONS,
    FETCH_PERSONS_SUCCEEDED,
    FETCH_PERSONS_FAILED,
} from '../reducers/constants';
import {
    FETCH_MOVIE_CREATION_DATA,
} from '../reducers/uploadMovie/constants';

function* fetchPersons(): IterableIterator<Object | void> {
    try {
        const res = yield axios.get(`persons?limit=200`);

        if (!res)
            throw new Error('Unable to fetch persons to add to your short');

        const { data } = res;

        yield put({
            type: FETCH_PERSONS_SUCCEEDED,
            payload: {
                data,
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_PERSONS_FAILED,
        });
        yield notification['error']({
            message: 'Unable to fetch persons to add to your short',
            description: e.message,
        });
    }
}

function* fetchGenres(): IterableIterator<Object | void> {
    try {
        const res = yield axios.get(`genres?limit=200`);

        if (!res)
            throw new Error('Unable to fetch genres');

        const { data } = res;

        yield put({
            type: FETCH_GENRES_SUCCEEDED,
            payload: {
                data,
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_GENRES_FAILED,
        });
        yield notification['error']({
            message: 'Unable to fetch genres',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery(FETCH_GENRES, fetchGenres);
    yield takeEvery(FETCH_PERSONS, fetchPersons);
    yield takeEvery(FETCH_MOVIE_CREATION_DATA, fetchPersons);
    yield takeEvery(FETCH_MOVIE_CREATION_DATA, fetchGenres);

}

export default saga;