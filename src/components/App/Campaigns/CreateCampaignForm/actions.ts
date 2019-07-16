import { CREATE_CAMPAIGN } from '../../../../reducers/campaigns/constantes';

export const createCampaign = (form: any) => ({
    type: CREATE_CAMPAIGN,
    payload: form,
});