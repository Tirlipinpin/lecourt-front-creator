import { collapseNavbar } from '../actions';

test('collapseNavbar should dispatch its payload', () => {
    expect(collapseNavbar(true)).toEqual({
        type: 'COLLAPSE_NAVBAR',
        payload: true,
    });
});