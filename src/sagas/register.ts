import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';

import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from '../reducers/register/constantes';

function* registerUser(action: any): any {
    try {
        const token = yield axios.post('tokens/create', {
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
    yield takeLatest(REGISTER_USER, registerUser);
}

export default saga;
