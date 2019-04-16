import { collapseNavbar } from '../actions';

it('collapseNavbar should dispatch its payload', () => {
    expect(collapseNavbar(true)).toEqual({
        type: 'COLLAPSE_NAVBAR',
        payload: true,
    });
});