import axios from 'axios';
import { notification } from 'antd';
import { put, takeEvery } from 'redux-saga/effects';
import {
    DELETE_ENTITY,
    DELETE_ENTITY_SUCCEEDED,
    DELETE_ENTITY_FAILED,
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

function* saga() {
    yield takeEvery(DELETE_ENTITY, deleteEntity);
}

export default saga;