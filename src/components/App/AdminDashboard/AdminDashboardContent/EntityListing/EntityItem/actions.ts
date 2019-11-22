import { DELETE_ENTITY } from 'reducers/adminDashboard/constants';

export const deleteEntity = (id: string, entityName: string) => ({
    type: DELETE_ENTITY,
    payload: {
        id,
        entityName,
    },
});
