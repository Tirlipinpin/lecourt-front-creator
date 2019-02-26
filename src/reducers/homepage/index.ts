export const defaultState = {
    page: 'Homepage',
};

export default (state: any = defaultState, action: any) => {
    switch(action.type) {
        default:
            return state;
    }
}
