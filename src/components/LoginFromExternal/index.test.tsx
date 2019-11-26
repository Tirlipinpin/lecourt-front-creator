import React from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';
import { History, Location } from 'history';
import { match } from 'react-router';
import LoginFromExternal from '.';

describe('LoginFromExternal', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        const location = {} as Location;
        const history = {} as History;
        const match = {} as match<{}>;

        wrapper = shallow(
            <LoginFromExternal
                location={location}
                history={history}
                match={match}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
