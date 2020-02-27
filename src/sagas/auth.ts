import { put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { getLoginUrl, getRegisterUrl, getUserUrl } from 'services/requestUrl';
import { FETCH_USER_INIT_APP, FETCH_USER_INIT_APP_FAILED, FETCH_USER_INIT_APP_SUCCEEDED } from 'reducers/constants';
import {
    FETCH_TOKEN,
    FETCH_TOKEN_FAILED,
    FETCH_TOKEN_SUCCEEDED,
} from 'reducers/login/constants';
import {
    REGISTER_USER,
    REGISTER_USER_SUCCEEDED,
    REGISTER_USER_FAILED,
} from 'reducers/register/constants';

export interface IFetchTokenAction {
    type: string
    payload: {
        email: string
        password: string
        rememberMe: boolean
    }
}

function* fetchToken(action: IFetchTokenAction): IterableIterator<Object | void> {
    try {
        const { payload: { email, password, rememberMe } } = action;

        const res: unknown = yield axios.post(getLoginUrl(), {
            username: email,
            password: password,
        }, {
            withCredentials: true,
        });

        const { data: { access_token, expires_in } } = res as AxiosResponse;

        if (!access_token)
            throw new Error('Network error');


        yield put({
            type: FETCH_TOKEN_SUCCEEDED,
        });

        if (rememberMe) {
            Cookies.set('user_authorization', access_token, {
                expires: new Date(Date.now() + expires_in),
                domain: process.env.REACT_APP_DOMAIN_URL,
              });
        } else {
            Cookies.set('user_authorization', access_token, {
              domain: process.env.REACT_APP_DOMAIN_URL,
            });
        }
        window.location.href = process.env.REACT_APP_FRONT_URL!;

    } catch (e) {
        yield put({
            type: FETCH_TOKEN_FAILED,
        });
        yield notification['error']({
            message: 'An error occurred',
            description: e.message,
        });
    }
}

export interface IRegisterUserAction {
    type: string
    payload: {
        displayName: string
        email: string
        password: string
        passwordConfirmation: string
    }
}

function* registerUser(action: IRegisterUserAction): IterableIterator<Object | void> {
    try {
        const {
            payload: {
                displayName,
                email,
                password,
                passwordConfirmation
            }
        } = action;

        const res: unknown = yield axios.post(getRegisterUrl(), {
            display_name: displayName,
            email: email,
            password: password,
            password_confirm: passwordConfirmation,
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
            message: 'An error occurred',
            description: e.message,
        });
    }
}

export interface IFetchUserProfileAction {
    type: string
}

function* fetchUserInitApp(action: IFetchUserProfileAction): IterableIterator<Object | void> {
    try {
        const res: unknown = yield axios.get(getUserUrl());

        if (!res)
            throw new Error('Unable to fetch your profile information');

        const { data } = res as AxiosResponse;

        yield put({
            type: FETCH_USER_INIT_APP_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_USER_INIT_APP_FAILED,
        });
        yield notification['error']({
            message: 'An error occurred',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeLatest(FETCH_TOKEN, fetchToken);
    yield takeLatest(REGISTER_USER, registerUser);
    yield takeLatest(FETCH_USER_INIT_APP, fetchUserInitApp);
}

export default saga;
