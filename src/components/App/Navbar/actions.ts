import { COLLAPSE_NAVBAR } from "../../../reducers/navbar/constantes";

export const collapseNavbar = (collapsed: boolean) => ({ type: COLLAPSE_NAVBAR, payload: collapsed });
