import { COLLAPSE_NAVBAR } from "../../../reducers/navbar/constants";

export const collapseNavbar = (collapsed: boolean) => ({ type: COLLAPSE_NAVBAR, payload: collapsed });
