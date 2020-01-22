import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';
import { shallow } from 'enzyme';

import { Sidebar } from '..';

describe('The Sidebar component', () => {
    let wrapper;
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
        const path = `/route/:id`;
        const match: match<{ id: string }> = {
            isExact: false,
            path,
            url: path.replace(':id', '1'),
            params: { id: "1" }
        };

        const store = {
            subscribe: jest.fn(),
            dispatch,
            getState: jest.fn(),
            replaceReducer: jest.fn(),
        } as unknown;

        wrapper = shallow(
            <Provider store={store as Store}>
                <Sidebar
                    location={createLocation(match.url)}
                    history={createMemoryHistory()}
                    match={match}
                />
            </Provider>
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
