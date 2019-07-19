import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { shallow, ShallowWrapper } from 'enzyme';
import { History } from 'history';

import Campaigns from '.';

describe('Campaigns component', () => {
    const dispatch = jest.fn();
    let wrapper: ShallowWrapper<any>;

    beforeEach(() => {
        const history: History = {} as History;
        const store = {
            subscribe: jest.fn(),
            dispatch,
            getState: jest.fn(),
            replaceReducer: jest.fn(),
        } as unknown;

        wrapper = shallow(
          <Provider store={store as Store}>
            <Campaigns history={history} />
          </Provider>
        );
    });

    test('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});