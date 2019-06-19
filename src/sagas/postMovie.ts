import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

function* postMovie(action: AnyAction): IterableIterator<Object | void> {
    try {
        const { id } = action.payload;

        const res = yield axios.get(`movies/${id}`);

        if (!res)
            throw new Error('Unable to fetch movies');

        const { data } = res;

        yield put({
            type: 'oui',
            payload: data,
        });
    } catch (e) {
        yield put({
            type: 'non',
        });
        yield notification['error']({
            message: 'Unable to get details for this short',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery('poney', postMovie);
}

export default saga;
