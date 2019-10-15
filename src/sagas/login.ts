import { put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED } from '../reducers/login/constants';

function* fetchToken(action: AnyAction): IterableIterator<Object | void> {
    try {
        const token = yield axios('https://sso.stg.lecourt.tv/users/auth/login', {
            method: 'POST',
            auth: {
                username: action.payload.email,
                password: action.payload.password,
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
