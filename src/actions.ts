import { RESTORE_TOKEN } from 'reducers/login/constants';

export const restoreToken = (token: string) => ({
    type: RESTORE_TOKEN,
    payload: token,
});
