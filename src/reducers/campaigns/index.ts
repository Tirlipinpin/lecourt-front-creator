import {
    CREATE_CAMPAIGN_SUCCEEDED,
    FETCH_CAMPAIGNS_SUCCEEDED,
    UPDATE_CAMPAIGN_SET_MODEL,
    UPDATE_CAMPAIGN,
    UPDATE_CAMPAIGN_DONE,
    SHOW_CAMPAIGN_CREATION_MODAL,
    HIDE_CAMPAIGN_CREATION_MODAL,
    DELETE_CAMPAIGN_SUCCEEDED,
    FETCH_CAMPAIGN_SUCCEEDED,
    FETCH_CAMPAIGN_FAILED,
    UPDATE_EDITING_CAMPAIGN,
} from './constantes';
import { ICampaign, MovieRelation } from '../../components/App/interfaces';

export interface ICampaignsStore {
    campaigns: ICampaign[]
    editingCampaign: ICampaign | null
    updatingEnabled: boolean
    showCampaignCreationModal: boolean
}

export const defaultState: ICampaignsStore = {
    campaigns: [],
    editingCampaign: null,
    updatingEnabled: false,
    showCampaignCreationModal: false,
};

export const mergeCampaigns = (campaigns: ICampaign[], updatedCampaign: ICampaign) => campaigns.map((campaign: ICampaign) => {
    if (updatedCampaign && (campaign.id === updatedCampaign.id))
        return updatedCampaign;
    return campaign;
});

export const deleteCampaigns = (campaigns: ICampaign[], id: string) => campaigns.filter((campaign: ICampaign) => campaign.id !== id);

export default (state = defaultState, action: any) => {
    switch(action.type) {
        case FETCH_CAMPAIGNS_SUCCEEDED:
            return {
                ...state,
                campaigns: action.payload,
            };
        case FETCH_CAMPAIGN_SUCCEEDED:
            return {
                ...state,
                editingCampaign: action.payload,
            };
        case FETCH_CAMPAIGN_FAILED:
            return {
                ...state,
                editingCampaign: null,
            };
        case UPDATE_EDITING_CAMPAIGN:
            return {
                ...state,
                editingCampaign: action.payload,
            };
        case CREATE_CAMPAIGN_SUCCEEDED:
            return {
                ...state,
                campaigns: [ action.payload, ...state.campaigns ],
                showCampaignCreationModal: false,
            };
        case UPDATE_CAMPAIGN_SET_MODEL:
            return {
                ...state,
                editingCampaign: action.payload,
            };
        case UPDATE_CAMPAIGN:
            return {
                ...state,
                updatingEnabled: true,
            };
        case UPDATE_CAMPAIGN_DONE:
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
