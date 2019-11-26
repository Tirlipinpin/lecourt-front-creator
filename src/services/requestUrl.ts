const ServerURL = process.env.REACT_APP_SERVER_URL;
const FrontURL = process.env.REACT_APP_FRONT_URL;

export const getLoginUrl = (): string => `${ServerURL}/auth/login`;
export const getRegisterUrl = (): string => `${ServerURL}/auth/register`;
export const getManagementUrl = (): string => `${ServerURL}/management`;
export const getUploadUrl = (): string => 'https://api.stg.lecourt.tv/upload';
export const getGoogleLoginUrl = (): string => `${ServerURL}/auth/login/google?redirectTo=${FrontURL}/loginFromExternal`;
export const getFacebookLoginUrl = (): string => `${ServerURL}/auth/login/facebook?redirectTo=${FrontURL}/loginFromExternal`;
