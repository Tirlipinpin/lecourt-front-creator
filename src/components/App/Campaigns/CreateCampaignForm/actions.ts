import { CREATE_CAMPAIGN } from '../../../../reducers/campaigns/constants';

export const createCampaign = (form: any) => ({
    type: CREATE_CAMPAIGN,
    payload: form,
});