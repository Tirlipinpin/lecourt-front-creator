import {
    CREATE_CAMPAIGN_SUCCEEDED,
    FETCH_CAMPAIGNS,
    FETCH_CAMPAIGNS_FAILED,
    FETCH_CAMPAIGNS_SUCCEEDED,
    UPDATE_CAMPAIGN_ENABLED,
    UPDATE_CAMPAIGN_ENABLED_DONE,
    SHOW_CAMPAIGN_CREATION_MODAL,
    HIDE_CAMPAIGN_CREATION_MODAL,
    DELETE_CAMPAIGN_SUCCEEDED,
} from './constantes';
import { ICampaigns } from '../../components/App/interfaces';

export interface ICampaignsStore {
    campaigns: ICampaigns[]
    updatingEnabled: boolean
    showCampaignCreationModal: boolean
}

export const defaultState: ICampaignsStore = {
    campaigns: [],
    updatingEnabled: false,
    showCampaignCreationModal: false,
};

export const mergeCampaigns = (campaigns: ICampaigns[], updatedCampaign: ICampaigns) => campaigns.map((campaign: ICampaigns) => {
    if (updatedCampaign && (campaign.id === updatedCampaign.id))
        return updatedCampaign;
    return campaign;
});

export const deleteCampaigns = (campaigns: ICampaigns[], id: string) => campaigns.filter((campaign: ICampaigns) => campaign.id !== id);

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
        case CREATE_CAMPAIGN_SUCCEEDED:
            return {
                ...state,
                campaigns: [ action.payload, ...state.campaigns ],
                showCampaignCreationModal: false,
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
        case SHOW_CAMPAIGN_CREATION_MODAL:
            return {
                ...state,
                showCampaignCreationModal: true,
            };
        case HIDE_CAMPAIGN_CREATION_MODAL:
            return {
                ...state,
                showCampaignCreationModal: false,
            };
        case DELETE_CAMPAIGN_SUCCEEDED:
            return {
              ...state,
              campaigns: deleteCampaigns(state.campaigns, action.payload),
            };
        default:
            return state;
    }
};
