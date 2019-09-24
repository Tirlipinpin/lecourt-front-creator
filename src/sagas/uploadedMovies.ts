import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import {
    FETCH_UPLOADED_MOVIES,
    FETCH_UPLOADED_MOVIES_FAILED,
    FETCH_UPLOADED_MOVIES_SUCCEEDED,
} from '../reducers/uploadedMovies/constantes';


function* fetchUploadedMovies(action: AnyAction): IterableIterator<Object | void> {
    try {
        const res = yield axios.get(`movies?limit=100`);

        if (!res)
            throw new Error('Unable to fetch uploaded movies');

        const { data } = res;

        yield put({
            type: FETCH_UPLOADED_MOVIES_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_UPLOADED_MOVIES_FAILED,
        });
        yield notification['error']({
            message: 'Unable to get details for this short',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery(FETCH_UPLOADED_MOVIES, fetchUploadedMovies);
}

export default saga;
