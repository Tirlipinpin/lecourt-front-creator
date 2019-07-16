import { FETCH_CAMPAIGNS, FETCH_CAMPAIGNS_FAILED, FETCH_CAMPAIGNS_SUCCEEDED } from './constantes';
import { ICampaigns } from "../../components/App/interfaces";

export interface ICampaignsStore {
    campaigns: ICampaigns[]
    loading: boolean
}

export const defaultState: ICampaignsStore = {
    campaigns: [],
    loading: false,
};

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case FETCH_CAMPAIGNS:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CAMPAIGNS_SUCCEEDED:
            return {
                ...state,
                campaigns: action.payload,
                loading: false,
            };
        case FETCH_CAMPAIGNS_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
