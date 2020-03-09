import axios, { AxiosResponse } from 'axios';
import { notification } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    DELETE_ENTITY,
    DELETE_ENTITY_SUCCEEDED,
    DELETE_ENTITY_FAILED,
    CREATE_ENTITY,
    CREATE_ENTITY_SUCCEEDED,
    CREATE_ENTITY_FAILED,
    EDIT_ENTITY,
    EDIT_ENTITY_SUCCEEDED,
} from '../reducers/adminDashboard/constants';
import { AnyAction } from 'redux';

function* deleteEntity(action: AnyAction): IterableIterator<Object | void> {
    try {
        const {
            id,
            entityName,
        } = action.payload;

        const res = yield axios.delete(`${entityName}/${id}`);

        if (!res)
            throw new Error(`Unable to delete ${entityName}`);

        yield put({
            type: DELETE_ENTITY_SUCCEEDED,
            payload: { id },
        });
    } catch (e) {
        yield put({
            type: DELETE_ENTITY_FAILED,
        });
        yield notification['error']({
            message: `Unable to delete ${action.entityName}`,
            description: e.message,
        });
    }
}

function* createEntity(action: AnyAction): IterableIterator<any> {
    try {
        const { body, entityName } = action.payload;

        const res = yield axios.post(`${entityName}`, body);
        if (!res || (res as AxiosResponse).status !== 200) {
            throw new Error(`Unable to create ${entityName}`);
        }

        yield put({
            type: CREATE_ENTITY_SUCCEEDED,
            payload: (res as AxiosResponse).data,
        });
    } catch (e) {
        yield put({
            type: CREATE_ENTITY_FAILED,
        });
    }
}

function* editEntity(action: AnyAction): IterableIterator<any> {
    try {
        const { body, entityName } = action.payload;

        const res = yield axios.put(`${entityName}/${body.id}`, body);
        if (!res || (res as AxiosResponse).status !== 200) {
            throw new Error(`Unable to update ${entityName}`);
        }

        yield put({
            type: EDIT_ENTITY_SUCCEEDED,
            payload: body,
        });
    } catch (e) {
        yield put({
            type: CREATE_ENTITY_FAILED,
        });
    }
}

function* saga() {
    yield takeEvery(DELETE_ENTITY, deleteEntity);
    yield takeLatest(CREATE_ENTITY, createEntity);
    yield takeLatest(EDIT_ENTITY, editEntity);
}

export default saga;