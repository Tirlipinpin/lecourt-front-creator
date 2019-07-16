import React from 'react';
import { Provider } from 'react-redux';
import { History } from 'history';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieDetails from '.';
import {Store} from "redux";

Enzyme.configure({ adapter: new Adapter() });

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
            <MovieDetails history={history as History} />
          </Provider>
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});