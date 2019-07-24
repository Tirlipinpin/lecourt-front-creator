import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import {
    CREATE_CAMPAIGN,
    CREATE_CAMPAIGN_FAILED,
    CREATE_CAMPAIGN_SUCCEEDED,
    FETCH_CAMPAIGNS,
    FETCH_CAMPAIGNS_FAILED,
    FETCH_CAMPAIGNS_SUCCEEDED,
    UPDATE_CAMPAIGN,
    UPDATE_CAMPAIGN_DONE,
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGN_SUCCEEDED,
    FETCH_CAMPAIGN,
    FETCH_CAMPAIGN_SUCCEEDED,
    FETCH_CAMPAIGN_FAILED,
} from '../reducers/campaigns/constantes';
import { MovieRelation } from "../components/App/interfaces";

function* fetchCampaigns(action: AnyAction): IterableIterator<Object | void> {
    try {
        const res = yield axios.get(`campaigns`);

        if (!res)
            throw new Error('Unable to fetch campaigns');

        const { data } = res;

        yield put({
            type: FETCH_CAMPAIGNS_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_CAMPAIGNS_FAILED,
        });
        yield notification['error']({
            message: 'Unable to fetch campaigns',
            description: e.message,
        });
    }
}

function* fetchCampaign(action: AnyAction): IterableIterator<Object | void> {
    try {
        const { payload } = action;
        const { id } = payload;
        const res = yield axios.get(`campaigns/${id}`);

        if (!res)
            throw new Error(`Unable to fetch campaign ${id}`);

        const { data } = res;

        yield put({
            type: FETCH_CAMPAIGN_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_CAMPAIGN_FAILED,
        });
        yield notification['error']({
            message: `Unable to fetch campaign`,
            description: e.message,
        });
    }
}

function* createCampaign(action: AnyAction): IterableIterator<Object | void> {
    try {
        const { payload } = action;
        const res = yield axios.post(`campaigns`, {
            ...payload,
        });

        if (!res)
            throw new Error('Unable to create campaigns');

        const { data } = res;

        yield put({
            type: CREATE_CAMPAIGN_SUCCEEDED,
            payload: data,
        });
        yield notification['success']({
            message: 'Campaign successfully created',
        });
    } catch (e) {
        yield put({
            type: CREATE_CAMPAIGN_FAILED,
        });
        yield notification['error']({
            message: 'Unable to create campaigns',
            description: e.message,
        });
    }
}

function* updateCampaign(action: AnyAction): IterableIterator<Object | void> {
    try {
        const { payload } = action;
        const { id } = payload;

        const res = yield axios.put(`campaigns/${id}`, {
            ...payload,
            movies: payload.movies.map((movie: MovieRelation) => movie.node.id),
        });

        if (!res)
            throw new Error('Unable to update campaign');

        const { data } = res;

        yield put({
            type: UPDATE_CAMPAIGN_DONE,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: UPDATE_CAMPAIGN_DONE,
        });
        yield notification['error']({
            message: 'Unable to update campaign',
            description: e.message,
        });
    }
}

function* deleteCampaign(action: AnyAction): IterableIterator<Object | void> {
    try {
        const { payload } = action;

        const res = yield axios.delete(`campaigns/${payload}`);

        if (!res)
            throw new Error('Unable to delete campaign');

        yield put({
            type: DELETE_CAMPAIGN_SUCCEEDED,
            payload: payload,
        });
    } catch (e) {
        yield notification['error']({
            message: 'Unable to delete campaign',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery(FETCH_CAMPAIGNS, fetchCampaigns);
    yield takeEvery(FETCH_CAMPAIGN, fetchCampaign);
    yield takeEvery(CREATE_CAMPAIGN, createCampaign);
    yield takeLatest(UPDATE_CAMPAIGN, updateCampaign);
    yield takeLatest(DELETE_CAMPAIGN, deleteCampaign);
}

export default saga;
