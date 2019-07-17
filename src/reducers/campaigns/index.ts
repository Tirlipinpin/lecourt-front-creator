import {
    FETCH_CAMPAIGNS,
    FETCH_CAMPAIGNS_FAILED,
    FETCH_CAMPAIGNS_SUCCEEDED,
    UPDATE_CAMPAIGN_ENABLED,
    UPDATE_CAMPAIGN_ENABLED_DONE,
} from './constantes';
import { ICampaigns } from '../../components/App/interfaces';

export interface ICampaignsStore {
    campaigns: ICampaigns[]
    updatingEnabled: boolean
}

export const defaultState: ICampaignsStore = {
    campaigns: [],
    updatingEnabled: false,
};

export const mergeCampaigns = (campaigns: ICampaigns[], updatedCampaign: ICampaigns) => campaigns.map((campaign: ICampaigns) => {
    if (updatedCampaign && (campaign.id === updatedCampaign.id))
        return updatedCampaign;
    return campaign;
});

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case FETCH_CAMPAIGNS:
            return {
                ...state,
            };
        case FETCH_CAMPAIGNS_SUCCEEDED:
            return {
                ...state,
                campaigns: action.payload,
            };
        case FETCH_CAMPAIGNS_FAILED:
            return {
                ...state,
            };
        case UPDATE_CAMPAIGN_ENABLED:
            return {
                ...state,
                updatingEnabled: true,
            };
        case UPDATE_CAMPAIGN_ENABLED_DONE:
            return {
                ...state,
                campaigns: mergeCampaigns(state.campaigns, action.payload || null),
                updatingEnabled: false,
            };
        default:
            return state;
    }
};
