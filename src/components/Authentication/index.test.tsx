import React from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';
import { match } from 'react-router';

import { History, Location } from 'history';

import { Authentication } from '.';
import { ILoginStore } from '../../reducers/login';

describe('The App component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        const match: match = {} as match;
        const history: History = {} as History;
        const location: Location = {} as Location;
        const login: ILoginStore = {
            token: 'poney',
            loading: false,
            rememberMe: false,
        };

        wrapper = shallow(
            <Authentication
                match={match}
                history={history}
                location={location}
                login={login}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
