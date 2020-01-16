import React from 'react';
import { Provider } from 'react-redux';
import { History } from 'history';
import { shallow, ShallowWrapper } from 'enzyme';
import { Store } from 'redux';

import Movies from '.';

describe('The Campaign component', () => {
    let wrapper: ShallowWrapper<any>;
    const history = {} as unknown;

    beforeEach(() => {
        const store = {
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            replaceReducer: jest.fn(),
            getState: jest.fn(),
        } as unknown;

        wrapper = shallow(
          <Provider store={store as Store}>
            <Movies history={history as History} />
          </Provider>
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});