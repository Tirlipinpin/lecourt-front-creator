import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import RoleSelect from './index';

describe('The RoleSelect component', () => {
    let wrapper: ShallowWrapper<any>;

    beforeEach(() => {
        wrapper = shallow(
          <RoleSelect
            id="42"
            visible={true}
            handleHideModal={jest.fn()}
            addPerson={jest.fn()}
          />
        );
    });

    test('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});
