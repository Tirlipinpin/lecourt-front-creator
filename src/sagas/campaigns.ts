import { put, takeEvery } from 'redux-saga/effects';
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
} from '../reducers/campaigns/constantes';


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

function* saga() {
    yield takeEvery(FETCH_CAMPAIGNS, fetchCampaigns);
    yield takeEvery(CREATE_CAMPAIGN, createCampaign);
}

export default saga;
