import { CREATE_ENTITY } from 'reducers/adminDashboard/constants';

export const createEntity = (entityName: string, body: any) => ({
    type: CREATE_ENTITY,
    payload: {
        entityName,
        body,
    },
});
