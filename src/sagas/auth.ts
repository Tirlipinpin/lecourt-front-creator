import { put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';
import { getLoginUrl, getRegisterUrl } from '../services/requestUrl';
import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED } from '../reducers/login/constants';
import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from '../reducers/register/constants';

function* fetchToken(action: AnyAction): IterableIterator<Object | void> {
    try {
        const token = yield axios(getLoginUrl(), {
            method: 'POST',
            auth: {
                username: action.payload.email,
                password: action.payload.password,
            },
            withCredentials: true,
        });

        if (!token)
            throw new Error('Network error');

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

function* registerUser(action: any): any {
    try {
        const token = yield axios.post(getRegisterUrl(), {
            auth: {
                username: 'user',
                password: 'password',
            },
        });

        yield put({
            type: REGISTER_USER_SUCCEEDED,
            payload: token,
        });
    } catch (e) {
        yield put({
            type: REGISTER_USER_FAILED,
        });
        yield notification['error']({
            message: 'An error occured',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeLatest(FETCH_TOKEN, fetchToken);
    yield takeLatest(REGISTER_USER, registerUser);
}

export default saga;
