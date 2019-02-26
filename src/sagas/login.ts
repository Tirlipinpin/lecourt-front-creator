import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';

import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED } from '../reducers/login/constantes';

function* fetchToken(action: any): any {
    try {
        const token = yield axios('tokens/create', {
            method: 'POST',
            auth: {
                username: action.email,
                password: action.password,
            },
            withCredentials: true,
        });

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
