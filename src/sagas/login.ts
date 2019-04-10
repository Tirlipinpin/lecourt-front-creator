import { put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED } from '../reducers/login/constantes';

function* fetchToken(action: AnyAction): IterableIterator<Object | void> {
    try {
        const token = yield axios('https://sso.stg.lecourt.tv/tokens/create', {
            method: 'POST',
            auth: {
                username: action.email,
                password: action.password,
            },
            withCredentials: true,
        });

        if (!token)
            throw new Error('Network error');

        const { data } = token;

        yield put({
            type: FETCH_TOKEN_SUCCEEDED,
            payload: token,
        });
    } catch (e) {
        yield put({
            type: FETCH_TOKEN_FAILED,
        });
        yield notification['error']({
            message: 'An error occured',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeLatest(FETCH_TOKEN, fetchToken);
}

export default saga;
