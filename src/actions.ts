import { LOGOUT, RESTORE_TOKEN } from 'reducers/login/constants';

export const restoreToken = (token: string) => ({
    type: RESTORE_TOKEN,
    payload: token,
});

export const logout = () => ({ type: LOGOUT });
