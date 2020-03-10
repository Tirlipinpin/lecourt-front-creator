import { DELETE_ENTITY, SET_EDIT_ENTITY } from 'reducers/adminDashboard/constants';

export const deleteEntity = (id: string, entityName: string) => ({
    type: DELETE_ENTITY,
    payload: {
        id,
        entityName,
    },
});

export const editEntity = (item: any) => ({
    type: SET_EDIT_ENTITY,
    payload: item,
});
