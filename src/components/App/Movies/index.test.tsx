import React from 'react';
import { History } from 'history';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieDetails from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The Campaign component', () => {
    let wrapper: ShallowWrapper<any>;
    const history = {} as unknown;

    beforeEach(() => {
        wrapper = shallow(
            <MovieDetails history={history as History} />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});