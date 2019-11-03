import { put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { notification } from 'antd';
import { getLoginUrl, getRegisterUrl } from '../services/requestUrl';
import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED } from '../reducers/login/constants';
import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from '../reducers/register/constants';

function* fetchToken(action: AnyAction): IterableIterator<Object | void> {
    try {
        const res: any = yield axios.post(getLoginUrl(), {
            username: action.payload.email,
            password: action.payload.password,
        });

        if (!res.data)
          throw new Error(res.message);

        const { data: { access_token } } = res as AxiosResponse;

        if (!access_token)
            throw new Error('Bad Credentials');

        yield put({
            type: FETCH_TOKEN_SUCCEEDED,
            payload: access_token,
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
        const res = yield axios.post(getRegisterUrl(), {
            auth: {
                username: 'user',
                password: 'password',
            },
        });

        const { data: { access_token } } = res as AxiosResponse;

        yield put({
            type: REGISTER_USER_SUCCEEDED,
            payload: access_token,
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
