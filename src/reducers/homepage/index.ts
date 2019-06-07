export interface IHomepageStore {
    page: string,
}

export const defaultState: IHomepageStore = {
    page: 'Homepage',
};

export default (state: any = defaultState, action: any) => {
    switch(action.type) {
        default:
            return state;
    }
}
